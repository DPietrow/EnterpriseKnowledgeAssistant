import useUploadPipeline from "../hooks/useUploadPipeline";
import { heroTypography } from "../styles/heroTypography";
import UploadTrace from "../components/upload/UploadTrace";

export default function UploadPage() {
  const {
    stage,
    fileName,
    activeIndex,
    pipeline,
    upload,
  } = useUploadPipeline();

  return (
    <div className="min-h-screen bg-slate-950 text-white p-10">
      <div className="max-w-3xl mx-auto space-y-8">

        <div>
          <h1 className={heroTypography.h1}>
            Document Ingestion Observability
          </h1>

          <p className={heroTypography.subtitle}>
            Real-time visibility into parsing, chunking, embedding, and indexing
          </p>
        </div>

        {/* UPLOAD */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

          <input
            type="file"
            accept="application/pdf"
            className="text-white"
            onChange={(e) => upload(e.target.files[0])}
          />

          {fileName && (
            stage === "completed" || stage === "complete" ? (
              <div className="mt-3 text-emerald-400 text-sm">
                Complete ✓ {fileName}
              </div>
            ) : (
              <div className="mt-3 text-slate-400 text-sm">
                Processing: {fileName}
              </div>
            )
          )}
          <div className="mt-2 text-xs text-slate-500">
            Stage: {stage}
          </div>
        </div>

        {/* PIPELINE VISUALIZATION */}
        <UploadTrace
          steps={pipeline}
          activeIndex={activeIndex}
          stage={stage}
        />

      </div>
    </div>
  );
}