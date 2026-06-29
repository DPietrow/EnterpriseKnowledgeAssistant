export default function RequestLifecycleIndicator({ stage }) {

  const labelMap = {
    idle: "",
    retrieval_start: "Searching documents...",
    retrieval_done: "Documents found",
    prompt_ready: "Preparing context...",
    generating: "Generating answer..."
  };

  if (!stage || stage === "idle") return null;

  return (
    <div className="text-xs text-slate-400 px-4 py-2 border-b border-slate-800">
      {labelMap[stage] || stage}
    </div>
  );
}