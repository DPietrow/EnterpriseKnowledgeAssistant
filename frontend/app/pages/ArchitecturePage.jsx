import Hero from "../components/architecture/Hero";
import SectionTitle from "../components/architecture/SectionTitle";
import DiagramNode from "../components/architecture/DiagramNode";
import ArchitectureDiagram from "../components/architecture/ArchitectureDiagram";

export default function ArchitecturePage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">

      {/* Hero */}
      <Hero />

      {/* System Diagram */}
      <section className="max-w-7xl mx-auto px-8 py-24">

        <SectionTitle
          eyebrow="SYSTEM"
          title="Enterprise Architecture"
          subtitle="A modern Retrieval-Augmented Generation platform designed for enterprise knowledge discovery."
        />

        <ArchitectureDiagram />

          <DiagramNode
            title="React Frontend"
            subtitle="Streaming Chat UI"
            color="blue"
          />

          <div className="text-slate-500 text-3xl">↓</div>

          <DiagramNode
            title="Flask API"
            subtitle="Streaming SSE Endpoint"
            color="green"
          />

          <div className="text-slate-500 text-3xl">↓</div>

          <DiagramNode
            title="Retrieval Pipeline"
            subtitle="Semantic Search"
            color="purple"
          />

          <div className="text-slate-500 text-3xl">↓</div>

          <DiagramNode
            title="Prompt Builder"
            subtitle="Context Assembly"
            color="orange"
          />

          <div className="text-slate-500 text-3xl">↓</div>

          <DiagramNode
            title="Phi-4-mini"
            subtitle="Streaming Generation"
            color="red"
          />

        

      </section>

      {/* Placeholder */}

    </div>
  );
}