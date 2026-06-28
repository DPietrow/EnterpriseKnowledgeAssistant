const roadmap = [
  {
    phase: "Phase 1",
    title: "Improve Retrieval Quality",
    reason: "Observed latency spikes in pgvector queries",
    impact: "Better chunk ranking + hybrid search"
  },
  {
    phase: "Phase 2",
    title: "Introduce Caching Layer",
    reason: "Repeated queries detected in trace logs",
    impact: "Reduced cost + faster response time"
  },
  {
    phase: "Phase 3",
    title: "Streaming Optimization",
    reason: "Token latency jitter in SSE pipeline",
    impact: "Smoother UX + reduced UI blocking"
  },
  {
    phase: "Phase 4",
    title: "Model Upgrade Path",
    reason: "Phi-4 reasoning ceiling bottlenecks identified",
    impact: "Optional OpenAI fallback for complex queries"
  }
];

export default function Roadmap() {
  return (
    <div className="space-y-6">

      {roadmap.map((r) => (
        <div
          key={r.phase}
          className="
            bg-slate-900
            border border-slate-800
            rounded-2xl
            p-6
            hover:border-blue-500/40
            transition-all
          "
        >

          <div className="text-xs text-blue-400">
            {r.phase}
          </div>

          <div className="text-xl font-semibold text-white mt-1">
            {r.title}
          </div>

          <div className="text-sm text-slate-400 mt-2">
            {r.reason}
          </div>

          <div className="text-sm text-emerald-400 mt-3">
            → {r.impact}
          </div>

        </div>
      ))}

    </div>
  );
}