import { useState } from "react";

export default function useUpload() {
  const [state, setState] = useState({
    fileName: null,
    documentId: null,
    trace: [],
    status: "idle",
  });

  const upload = async (file) => {
    if (!file) return;

    setState({
      fileName: file.name,
      documentId: null,
      trace: [],
      status: "uploading",
    });

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch(
      "http://127.0.0.1:5000/api/documents/upload",
      {
        method: "POST",
        body: formData,
      }
    );

    if (!res.ok) {
      setState((prev) => ({
        ...prev,
        status: "failed",
      }));
      return;
    }

    const result = await res.json();

    const documentId = result.id;
    console.log("UPLOAD RESPONSE:", result);
    console.log("DOCUMENT ID:", documentId);

    if (!documentId) {
      console.error("Missing document_id:", result);
      setState((prev) => ({ ...prev, status: "failed" }));
      return;
    }

    setState((prev) => ({
      ...prev,
      documentId,
    }));

    let lastStatus = null;
    let keepPolling = true;

    while (keepPolling) {
      const statusRes = await fetch(
        `http://127.0.0.1:5000/api/documents/${documentId}/status`
      );

      const status = await statusRes.json();

      const normalizedStage = status.stage || status.status;

      setState((prev) => {
        if (normalizedStage === lastStatus) {
          return {
            ...prev,
            status: status.status,
          };
        }

        lastStatus = normalizedStage;

        return {
          ...prev,
          status: status.status,
          trace: [
            ...prev.trace,
            {
              stage: normalizedStage,
              timestamp: Date.now(),
            },
          ],
        };
      });

      if (
        status.status === "completed" ||
        status.status === "failed"
      ) {
        keepPolling = false;
      }

      await new Promise((r) => setTimeout(r, 500));
    }

    setState((prev) => ({
      ...prev,
      status: "complete",
    }));
  };

  return { state, upload };
}