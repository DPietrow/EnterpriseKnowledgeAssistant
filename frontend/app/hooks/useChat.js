import { useState, useRef, useCallback, useEffect} from "react";
import StreamBatcher from "./streamBatcher";

export default function useChat() {
  const [messages, setMessages] = useState([]);
  const [lifecycle, setLifecycle] = useState({ stage: "idle" });
  const lifecycleTimeoutRef = useRef(null);
  const batcherRef = useRef(null);
  const assistantIdRef = useRef(null);

  // NEW: tracks backend truth
  const finalStageRef = useRef("idle");
  const safeSetStage = useCallback((stage) => {
  setLifecycle({ stage });

  // reset timeout on every update
  if (lifecycleTimeoutRef.current) {
    clearTimeout(lifecycleTimeoutRef.current);
  }

  // auto-recover if backend stops streaming
  if (stage !== "complete") {
    lifecycleTimeoutRef.current = setTimeout(() => {
      setLifecycle({ stage: "complete" });
    }, 30000); // 30s fallback
   }
  }, []);

  const send = async (question) => {
    const assistantId = Date.now();
    assistantIdRef.current = assistantId;

    let pendingText = "";

    setMessages((prev) => [
      ...prev,
      { role: "user", content: question },
      {
        id: assistantId,
        role: "assistant",
        content: "",
        citations: [],
        status: "thinking"
      }
    ]);

    safeSetStage("thinking");

    batcherRef.current = new StreamBatcher((chunk) => {
      pendingText += chunk;

      setMessages((prev) =>
        prev.map((m) =>
          m.id === assistantId
            ? { ...m, content: pendingText, status: "streaming" }
            : m
        )
      );
    }, 50);

    safeSetStage("retrieving");

    const res = await fetch(
      "https://enterpriseknowledgeassistant.onrender.com/api/documents/ask-stream",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: question })
      }
    );

    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    let buffer = "";

    while (true) {
      const { value, done } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });

      const events = buffer.split("\n\n");
      buffer = events.pop();

      for (const event of events) {
        const jsonStr = event.replace(/^data:\s*/gm, "").trim();
        if (!jsonStr || jsonStr === "[DONE]") continue;

        let parsed;
        try {
          parsed = JSON.parse(jsonStr);
        } catch {
          continue;
        }

        if (parsed.type === "lifecycle") {
          safeSetStage(parsed.stage);
          continue;
        }

        if (parsed.type === "citations") {
          setMessages((prev) =>
            prev.map((m) =>
              m.id === assistantId
                ? { ...m, citations: parsed.data }
                : m
            )
          );
          continue;
        }

        if (parsed.type === "token") {
          safeSetStage("generating");

          batcherRef.current.push(parsed.value);
        }
      }
    }

    // flush batcher
    batcherRef.current?.reset?.();

    // IMPORTANT: don't assume completion instantly
    const waitForFinalStage = async () => {
      const start = Date.now();

      while (
        finalStageRef.current !== "complete" &&
        Date.now() - start < 1500
      ) {
        await new Promise((r) => setTimeout(r, 50));
      }
    };

    await waitForFinalStage();

    setMessages((prev) =>
      prev.map((m) =>
        m.id === assistantId ? { ...m, status: "done" } : m
      )
    );

    safeSetStage("completed");
  };
  useEffect(() => {
  return () => {
    if (lifecycleTimeoutRef.current) {
      clearTimeout(lifecycleTimeoutRef.current);
    }
  };
}, []);
  return { messages, send, lifecycle };
}