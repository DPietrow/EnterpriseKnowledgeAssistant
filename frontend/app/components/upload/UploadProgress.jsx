const stageMap = {
  upload_start: "Uploading file",
  text_extraction: "Extracting text",
  chunking: "Chunking document",
  embedding: "Generating embeddings",
  vector_storage: "Storing in pgvector",
  complete: "Complete"
};

export default function UploadProgress({ stage, fileName }) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

      <div className="flex justify-between">
        <div className="text-white font-medium">
          {fileName}
        </div>

        <div className="text-blue-400 text-sm">
          {stage}
        </div>
      </div>

      <div className="mt-4 text-sm text-slate-400">
        {stageMap[stage] || stage}
      </div>

      <div className="mt-3 h-2 bg-slate-800 rounded-full overflow-hidden">
        <div
          className="h-full bg-blue-500 animate-pulse"
          style={{
            width:
              stage === "upload_start" ? "20%" :
              stage === "text_extraction" ? "40%" :
              stage === "chunking" ? "60%" :
              stage === "embedding" ? "80%" :
              stage === "vector_storage" ? "95%" :
              "100%"
          }}
        />
      </div>

    </div>
  );
}