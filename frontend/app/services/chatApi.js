import API_BASE from "./api";

export async function openChatStream(question) {
    return fetch(`${API_BASE}/api/documents/ask`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            query: question
        })
    });
}