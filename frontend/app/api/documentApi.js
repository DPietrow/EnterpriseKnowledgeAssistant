export const uploadDocument = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  return fetch("/api/documents/upload", {
    method: "POST",
    body: formData
  }).then(r => r.json());
};

export const askQuestion = async (query) => {
  return fetch("/api/documents/ask", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query })
  }).then(r => r.json());
};

const BASE_URL = "http://127.0.0.1:5000/api/documents";

export async function uploadDocument(file) {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch(`${BASE_URL}/upload`, {
    method: "POST",
    body: formData,
  });

  return res.json();
}

export async function askQuestion(query) {
  const res = await fetch(`${BASE_URL}/ask`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query }),
  });

  return res.json();
}