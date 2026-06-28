export default function UploadTrace({
  steps = [],
  activeIndex = -1,
  stage = "",
}) {
  if (!Array.isArray(steps) || steps.length === 0) {
    return null;
  }

  const isCompleted = stage === "completed";

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
      <h2 className="text-white font-semibold mb-4">
        Ingestion Pipeline Trace
      </h2>

      <div className="space-y-2">
        {steps.map((step, idx) => {
          const isLast = idx === steps.length - 1;

          // ACTIVE = currently running step (only when not finished)
          const isActive =
            idx === activeIndex && !isCompleted;

          // DONE = anything before active OR any step when completed
          const isDone =
            idx < activeIndex || (isCompleted && idx <= activeIndex);

          return (
            <div
              key={`${step}-${idx}`}
              className="flex items-center gap-3"
            >
              {/* DOT */}
              <div
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  isDone
                    ? "bg-emerald-500"
                    : isActive
                    ? "bg-blue-400 animate-pulse"
                    : "bg-slate-600"
                }`}
              />

              {/* LABEL */}
              <div
                className={`text-sm transition-all duration-300 ${
                  isDone
                    ? "text-emerald-400"
                    : isActive
                    ? "text-blue-300"
                    : "text-slate-500"
                }`}
              >
                {step}
              </div>
            </div>
          );
        })}
      </div>

      {/* DEBUG (optional) */}
      <div className="mt-4 text-xs text-slate-500">
        Stage index: {activeIndex} | Status: {stage}
      </div>
    </div>
  );
}