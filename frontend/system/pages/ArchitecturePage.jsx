import TradeoffCard from "../components/TradeoffCard";

export default function ArchitecturePage() {
  return (
    <div className="p-8 space-y-8">
      <h1 className="text-2xl font-bold">System Architecture</h1>

      <div className="grid grid-cols-2 gap-4">
        <TradeoffCard
          title="Vector Store"
          decision="PostgreSQL + pgvector"
          tradeoff="Simplifies deployment, but lower performance than Pinecone at scale"
        />

        <TradeoffCard
          title="Embedding Model"
          decision="all-MiniLM-L6-v2"
          tradeoff="Fast and lightweight but lower semantic accuracy"
        />

        <TradeoffCard
          title="LLM"
          decision="Local Phi-4 mini-instruct"
          tradeoff="No API cost, but heavy local compute requirements"
        />

        <TradeoffCard
          title="Chunking Strategy"
          decision="Fixed-size overlapping chunks"
          tradeoff="Simple and deterministic but not semantic-aware"
        />
      </div>

      <div className="mt-10 bg-gray-900 p-4 rounded">
        <h2 className="font-bold mb-2">Retrieval Pipeline</h2>
        <pre className="text-sm text-gray-300">
Query → Embedding → Vector Search → Top-K Chunks → Prompt → LLM → Citations
        </pre>
      </div>
    </div>
  );
}