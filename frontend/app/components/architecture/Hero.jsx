export default function Hero() {
  return (
    <section className="relative overflow-hidden">

      {/* Background */}

      <div className="absolute inset-0">

        <div className="absolute left-1/3 top-0 h-96 w-96 rounded-full bg-blue-600/20 blur-[120px]" />

        <div className="absolute right-1/3 bottom-0 h-96 w-96 rounded-full bg-cyan-500/10 blur-[150px]" />

      </div>

      <div className="relative max-w-6xl mx-auto px-8 py-48">

        <div className="inline-flex rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-sm text-blue-300">

          Enterprise AI Platform

        </div>

        <h1 className="mt-8 text-7xl md:text-7xl font-black tracking-tight">

          Enterprise
          <br />

          Knowledge Assistant

        </h1>

        <p className="mt-8 max-w-3xl text-xl leading-9 text-slate-400">

          A production-oriented Retrieval-Augmented Generation platform built
          with React, Flask, Sentence Transformers, and Microsoft's Phi-4 model
          to enable fast, explainable enterprise knowledge retrieval.

        </p>

        <div className="mt-12 flex flex-wrap gap-3">

          {[
            "React",
            "Flask",
            "Tailwind",
            "Sentence Transformers",
            "Phi-4",
            "Streaming",
            "RAG",
          ].map((item) => (
            <span
              key={item}
              className="rounded-full border border-slate-700 bg-[radial-gradient(circle_at_top,#172554_0%,#020617_55%)] px-4 py-2 text-sm text-slate-300"
            >
              {item}
            </span>
          ))}

        </div>

      </div>

    </section>
  );
}