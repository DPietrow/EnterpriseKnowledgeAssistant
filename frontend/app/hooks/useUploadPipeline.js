import { useState } from "react";

const PIPELINE = [
  "queued",
  "extracting",
  "chunking",
  "embedding",
  "storing",
  "completed",
];

export default function useUploadPipeline() {
  const [stage, setStage] = useState("idle");
  const [fileName, setFileName] = useState("");
  const [activeIndex, setActiveIndex] = useState(-1);
  const [documentId, setDocumentId] = useState(null);

  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

  const upload = async (file) => {
    if (!file) return;

    setFileName(file.name);
    setStage("uploading");
    setActiveIndex(0);

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch(
      "https://enterpriseknowledgeassistant.onrender.com/api/documents/upload",
      {
        method: "POST",
        body: formData,
      }
    );

    if (!res.ok) {
      setStage("failed");
      return;
    }

    const result = await res.json();
    const id = result.id;

    if (!id) {
      setStage("failed");
      return;
    }

    setDocumentId(id);

    let keepPolling = true;
    let lastIndex = -1;

    while (keepPolling) {
      const statusRes = await fetch(
        `https://enterpriseknowledgeassistant.onrender.com/api/documents/${id}/status`
      );

      const status = await statusRes.json();

      const normalizedStage = status.stage || status.status;

      setStage(status.status);

      const index = PIPELINE.indexOf(normalizedStage);

      // only update if stage changed
      if (index !== -1 && index !== lastIndex) {
        setActiveIndex(index);
        lastIndex = index;
      }

      if (
        status.status === "completed" ||
        status.status === "failed"
      ) {
        keepPolling = false;
      }

      await sleep(500);
    }

    setStage("completed");
    setActiveIndex(PIPELINE.length - 1);
  };

  return {
    stage,
    fileName,
    documentId,
    activeIndex,
    pipeline: PIPELINE,
    upload,
  };
}