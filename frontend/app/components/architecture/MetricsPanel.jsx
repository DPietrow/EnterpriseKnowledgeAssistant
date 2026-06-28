const metrics = [
  { label: "End-to-End Latency", value: "310ms", delta: "-18%" },
  { label: "Retrieval Time", value: "78ms", delta: "-22%" },
  { label: "LLM Inference", value: "210ms", delta: "-10%" },
  { label: "Token Throughput", value: "42 tok/s", delta: "+15%" },
  { label: "Cache Hit Rate", value: "94%", delta: "+6%" },
  { label: "Cost per Query", value: "$0.0003", delta: "-40%" }
];

export default function MetricsPanel() {
  return (
    <div className="grid grid-cols-3 gap-6">

      {metrics.map((m) => (
        <div
          key={m.label}
          className="
            bg-slate-900
            border border-slate-800
            rounded-2xl
            p-5
            hover:border-blue-500/40
            transition-all
          "
        >

          <div className="text-sm text-slate-400">
            {m.label}
          </div>

          <div className="text-2xl font-bold text-white mt-2">
            {m.value}
          </div>

          <div className="text-xs text-green-400 mt-2">
            {m.delta}
          </div>

        </div>
      ))}

    </div>
  );
}