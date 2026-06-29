import { useState, useRef, useCallback, useEffect } from "react";

export default function useChat() {
  const [messages, setMessages] = useState([]);
  const [lifecycle, setLifecycle] = useState({ stage: "idle" });

  const lifecycleTimeoutRef = useRef(null);
  const assistantIdRef = useRef(null);

  const safeSetStage = useCallback((stage) => {
    setLifecycle({ stage });

    if (lifecycleTimeoutRef.current) {
      clearTimeout(lifecycleTimeoutRef.current);
    }

    if (stage !== "completed") {
      lifecycleTimeoutRef.current = setTimeout(() => {
        setLifecycle({ stage: "completed" });
      }, 30000);
    }
  }, []);

  const send = async (question) => {
    const assistantId = Date.now();
    assistantIdRef.current = assistantId;

    let fullText = "";

    setMessages((prev) => [
      ...prev,
      { role: "user", content: question },
      {
        id: assistantId,
        role: "assistant",
        content: "",
        citations: [],
        status: "streaming"
      }
    ]);

    safeSetStage("thinking");

    const res = await fetch(
      "https://enterpriseknowledgeassistant.onrender.com/api/documents/ask-stream",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: question })
      }
    );

    if (!res.body) throw new Error("No stream available");

    const reader = res.body.getReader();
    const decoder = new TextDecoder();

    safeSetStage("streaming");

    let buffer = "";

    let buffer = "";

    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
    
      buffer += decoder.decode(value, { stream: true });
    
      // SSE messages are separated by double newline
      const events = buffer.split("\n\n");
      buffer = events.pop(); // keep incomplete chunk
    
      for (const event of events) {
        const line = event.trim();
    
        if (!line.startsWith("data:")) continue;
    
        const jsonStr = line.replace(/^data:\s*/, "").trim();
    
        if (!jsonStr) continue;
    
        if (jsonStr === "[DONE]") {
          safeSetStage("completed");
          continue;
        }
    
        let parsed;
        try {
          parsed = JSON.parse(jsonStr);
        } catch (e) {
          continue;
        }
    
        // lifecycle updates
        if (parsed.type === "lifecycle") {
          safeSetStage(parsed.stage);
          continue;
        }
    
        // token streaming
        if (parsed.type === "token") {
          fullText += parsed.value;
        
          setMessages((prev) =>
            prev.map((m) =>
              m.id === assistantId
                ? { ...m, content: fullText }
                : m
            )
          );
          continue;
        }
    
        // citations
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
      }
    }

    setMessages((prev) =>
      prev.map((m) =>
        m.id === assistantId
          ? { ...m, status: "done" }
          : m
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