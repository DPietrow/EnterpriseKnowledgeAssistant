const decisions = [
  {
    id:"user",

    title: "React UI",

    chosen: "React",

    alternatives: [
      "Angular",
      "Vue",
      "Astro"
    ],

    rationale: [
      "Component-Based Architecture",
      "Virtual DOM",
      "Massive Ecosystem",
      "Predictable latency"
    ],

    tradeoffs: [
      "Not a Full Framework",
      "Frequent Changes most likely required"
    ]
  },
  {
    id:"api",

    title: "Flask API",

    chosen: "Flask",

    alternatives: [
      "GPT-4.1",
      "Claude",
      "Llama 3"
    ],

    rationale: [
      "Runs completely locally",
      "No API cost",
      "Mature Ecosystem",
      "Low operational cost"
    ],

    tradeoffs: [
      "Lack of Async Support",
      "Local GPU/CPU resources required"
    ]
  },
  {
    id:"llm",

    title: "LLM Selection",

    chosen: "Phi-4 Mini",

    alternatives: [
      "GPT-4.1",
      "Claude",
      "Llama 3"
    ],

    rationale: [
      "Runs completely locally",
      "No API cost",
      "Enterprise privacy",
      "Predictable latency"
    ],

    tradeoffs: [
      "Lower reasoning ceiling than GPT-4",
      "Local GPU/CPU resources required"
    ]
  },

  {
    id:"embedding",

    title: "Embedding Strategy",

    chosen: "MiniLM",

    alternatives: [
      "OpenAI text-embedding-3-large",
      "BGE Large",
      "E5"
    ],

    rationale: [
      "Free",
      "Fast inference",
      "Runs offline",
      "Excellent retrieval quality"
    ],

    tradeoffs: [
      "Slightly lower semantic accuracy",
      "Smaller embedding dimension"
    ]
  },

  {
    id:"vector",

    title: "Vector Storage",

    chosen: "PostgreSQL + pgvector",

    alternatives: [
      "Pinecone",
      "Weaviate",
      "Qdrant"
    ],

    rationale: [
      "Single datastore",
      "Simple deployment",
      "No external service"
    ],

    tradeoffs: [
      "Less elastic scaling",
      "Manual tuning"
    ]
  },

  {
    id:"streaming",

    title: "Streaming",

    chosen: "Server Sent Events",

    alternatives: [
      "WebSockets"
    ],

    rationale: [
      "Simple implementation",
      "Native browser support",
      "Ideal for one-way token streaming"
    ],

    tradeoffs: [
      "No bidirectional messaging"
    ]
  }
];

export default function DecisionMatrix({
  hovered,
  setHovered
}) {
  return (
    <div className="space-y-8">

      {decisions.map((decision) => (

        <div
          key={decision.title}
          onMouseEnter={() => setHovered(decision.id)}
          onMouseLeave={() => setHovered(null)}
          className={`
              rounded-3xl
              transition-all
              duration-300
              border
          
              ${
                  hovered === decision.id
                      ? "border-blue-400 shadow-2xl shadow-blue-500/20 scale-[1.02]"
                      : "border-slate-800"
              }
          
              bg-slate-900
              p-8
          `}
        >

          <div className="flex items-center justify-between">

            <div>

              <h3 className="text-2xl font-bold text-white">
                {decision.title}
              </h3>

              <div className="mt-2 text-blue-400 font-semibold">
                ✓ Selected: {decision.chosen}
              </div>

            </div>

          </div>

          <div className="grid grid-cols-3 gap-10 mt-8">

            <div>

              <h4 className="font-semibold text-white mb-3">
                Alternatives
              </h4>

              <ul className="space-y-2 text-slate-400">

                {decision.alternatives.map(a => (
                  <li key={a}>• {a}</li>
                ))}

              </ul>

            </div>

            <div>

              <h4 className="font-semibold text-green-400 mb-3">
                Why this decision
              </h4>

              <ul className="space-y-2 text-slate-300">

                {decision.rationale.map(r => (
                  <li key={r}>✓ {r}</li>
                ))}

              </ul>

            </div>

            <div>

              <h4 className="font-semibold text-orange-400 mb-3">
                Tradeoffs
              </h4>

              <ul className="space-y-2 text-slate-300">

                {decision.tradeoffs.map(t => (
                  <li key={t}>⚠ {t}</li>
                ))}

              </ul>

            </div>

          </div>

        </div>

      ))}

    </div>
  );
}