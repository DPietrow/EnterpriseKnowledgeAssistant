import { openChatStream } from "../services/chatApi";

export async function streamChat(
    question,
    onToken,
    onCitation,
    onDone
) {

    const res = await openChatStream(question);

    const reader = res.body.getReader();

    const decoder = new TextDecoder();

    let buffer = "";

    while (true) {

        const { value, done } = await reader.read();

        if (done) break;

        buffer += decoder.decode(value, {
            stream: true
        });

        const events = buffer.split("\n\n");

        buffer = events.pop();

        for (const event of events) {

            const line = event.replace(/^data:\s?/, "");

            if (!line)
                continue;

            if (line === "[DONE]") {

                onDone();

                return;
            }

            try {

                const json = JSON.parse(line);

                if (json.type === "citations") {

                    onCitation(json.data);

                    continue;

                }

            }

            catch {

                onToken(line);

            }

        }

    }

}