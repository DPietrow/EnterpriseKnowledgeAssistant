import { useEffect, useState } from "react";

export default function ArchitectureDiagram({
  hovered,
  setHovered
}) {
  const nodes = [
    { id: "user", title: "React UI", subtitle: "Streaming Chat", color: "bg-blue-500", latency: 12 },
    { id: "api", title: "Flask API", subtitle: "REST + SSE", color: "bg-violet-500", latency: 34 },
    { id: "retrieval", title: "Retrieval Layer", subtitle: "MiniLM + pgvector", color: "bg-emerald-500", latency: 78 },
    { id: "prompt", title: "Prompt Builder", subtitle: "Context Assembly", color: "bg-cyan-500", latency: 21 },
    { id: "llm", title: "Phi-4 Mini", subtitle: "Local Inference", color: "bg-orange-500", latency: 210 },
    { id: "streaming", title: "Token Streaming", subtitle: "Server-Sent Events", color: "bg-rose-500", latency: 8 }
  ];

  const indexMap = new Map(nodes.map((n, i) => [n.id, i]));

  const [flowIndex, setFlowIndex] = useState(0);
  const [frozen, setFrozen] = useState(false);
  const [tokenPreview, setTokenPreview] = useState("");

  // -----------------------------
  // AUTO FLOW (unless frozen)
  // -----------------------------
  useEffect(() => {
    if (frozen) return;

    const interval = setInterval(() => {
      setFlowIndex((prev) => (prev + 1) % nodes.length);
    }, 1000);

    return () => clearInterval(interval);
  }, [frozen]);

  // -----------------------------
  // SIMULATED LLM TOKENS
  // -----------------------------
  useEffect(() => {
    const llmNode = nodes[4].id;
    if (flowIndex === indexMap.get(llmNode)) {
      const words = [
        "Generating",
        "response",
        "from",
        "Phi-4",
        "Mini",
        "model..."
      ];

      let i = 0;

      const interval = setInterval(() => {
        setTokenPreview((prev) => prev + " " + (words[i] || ""));
        i++;

        if (i >= words.length) clearInterval(interval);
      }, 250);

      return () => clearInterval(interval);
    }
  }, [flowIndex]);

  const activeIndex =
    hovered && indexMap.has(hovered)
      ? indexMap.get(hovered)
      : flowIndex;

  const isActive = (i) => i <= activeIndex;

  return (
    <div className="overflow-x-auto py-10">
      <div className="flex min-w-[1250px] items-center">

        {nodes.map((node, index) => {
          const active = isActive(index);
          const isLLM = node.id === "llm";

          return (
            <div key={node.id} className="flex items-center">

              {/* NODE */}
              <div
                onClick={() => setFrozen(!frozen)}
                onMouseEnter={() => setHovered(node.id)}
                onMouseLeave={() => setHovered(null)}
                className={`
                  w-48 h-44 rounded-3xl bg-slate-900 border p-6 cursor-pointer
                  flex flex-col justify-between transition-all duration-300 relative

                  ${active
                    ? "border-blue-500 shadow-2xl shadow-blue-500/20 scale-105 opacity-100"
                    : "border-slate-800 opacity-30 scale-95"
                  }
                `}
              >

                {/* NODE HEADER */}
                <div className="flex justify-between items-start">
                  <div className={`h-3 w-3 rounded-full ${node.color}`} />

                  {/* latency badge */}
                  <div className="text-xs text-slate-400 bg-slate-800 px-2 py-1 rounded">
                    {node.latency}ms
                  </div>
                </div>

                <div>
                  <div className="text-lg font-semibold text-white">
                    {node.title}
                  </div>

                  <div className="mt-2 text-sm text-slate-400">
                    {node.subtitle}
                  </div>
                </div>

                {/* -----------------------------
                    LLM TOKEN STREAM OVERLAY
                ----------------------------- */}
                {isLLM && tokenPreview && (
                  <div className="mt-3 text-xs text-green-400 animate-pulse">
                    {tokenPreview.slice(-60)}
                  </div>
                )}

                {/* CLICK HINT */}
                <div className="text-[10px] text-slate-500 mt-2">
                  click to {frozen ? "resume" : "freeze"}
                </div>
              </div>

              {/* ARROW */}
              {index < nodes.length - 1 && (
                <div
                  className={`
                    w-20 flex justify-center text-3xl transition-all duration-300
                    ${index < activeIndex ? "text-blue-400" : "text-slate-700"}
                  `}
                >
                  <span className={index < activeIndex ? "animate-pulse" : ""}>
                    →
                  </span>
                </div>
              )}

            </div>
          );
        })}

      </div>

      {/* -----------------------------
          RETRIEVAL INSPECTOR STRIP
      ----------------------------- */}
      {hovered === "retrieval" && (
        <div className="mt-6 p-4 bg-slate-900 border border-slate-800 rounded-xl">
          <div className="text-sm text-slate-300 mb-2">
            Top-K Retrieved Chunks
          </div>

          <div className="space-y-2 text-xs text-slate-400">
            <div>• “RAG improves grounding by injecting context…”</div>
            <div>• “Vector similarity search retrieves embeddings…”</div>
            <div>• “pgvector stores dense semantic vectors…”</div>
          </div>
        </div>
      )}

      {/* -----------------------------
          GLOBAL STATUS STRIP
      ----------------------------- */}
      <div className="mt-6 text-xs text-slate-500">
        {frozen
          ? "🔒 execution frozen (click any node to resume)"
          : "⚡ live system execution"}
      </div>
    </div>
  );
}