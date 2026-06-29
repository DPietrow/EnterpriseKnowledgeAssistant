export async function streamChat(
    question,
    onToken,
    onCitation,
    onDone,
    onLifecycle
) {
    const res = await openChatStream(question);

    if (!res.body) throw new Error("No stream body");

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

            const cleaned = event.trim();
            if (!cleaned.startsWith("data:")) continue;

            const jsonStr = cleaned.replace(/^data:\s*/, "").trim();

            if (!jsonStr) continue;

            // DONE handler
            if (jsonStr === "[DONE]") {
                onDone?.();
                continue;
            }

            // ALWAYS JSON parse first (no catch-based token logic)
            let msg;
            try {
                msg = JSON.parse(jsonStr);
            } catch (e) {
                console.warn("Bad SSE JSON:", jsonStr);
                continue;
            }

            // lifecycle events
            if (msg.type === "lifecycle") {
                onLifecycle?.(msg.stage);
                continue;
            }

            // token events
            if (msg.type === "token") {
                onToken?.(msg.value);
                continue;
            }

            // citation events
            if (msg.type === "citations") {
                onCitation?.(msg.data);
                continue;
            }

            // done event object
            if (msg.type === "done") {
                onDone?.();
                continue;
            }
        }
    }

    onDone?.();
}