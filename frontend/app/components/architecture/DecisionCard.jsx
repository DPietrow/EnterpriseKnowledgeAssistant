export default function DecisionCard({ decision }) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8 shadow-xl">

      <div className="mb-4">

        <p className="text-xs uppercase tracking-widest text-blue-400">
          Architecture Decision
        </p>

        <h2 className="mt-2 text-2xl font-bold">
          {decision.title}
        </h2>

      </div>

      <div className="space-y-6">

        <section>

          <h3 className="font-semibold text-slate-200">
            Problem
          </h3>

          <p className="mt-2 text-slate-400">
            {decision.question}
          </p>

        </section>

        <section>

          <h3 className="font-semibold text-slate-200">
            Decision
          </h3>

          <div className="mt-2 inline-flex rounded-lg bg-blue-600 px-3 py-1 font-semibold">
            {decision.decision}
          </div>

        </section>

        <section>

          <h3 className="font-semibold text-slate-200">
            Alternatives Considered
          </h3>

          <div className="mt-3 space-y-3">

            {decision.alternatives.map((alt) => (

              <div
                key={alt.name}
                className="rounded-lg bg-slate-800 p-3"
              >

                <div className="font-medium">

                  {alt.name}

                </div>

                <div className="text-sm text-slate-400">

                  {alt.reason}

                </div>

              </div>

            ))}

          </div>

        </section>

        <div className="grid gap-6 md:grid-cols-2">

          <section>

            <h3 className="font-semibold text-green-400">
              Why This Choice
            </h3>

            <ul className="mt-3 space-y-2">

              {decision.why.map((item) => (

                <li key={item}>

                  ✓ {item}

                </li>

              ))}

            </ul>

          </section>

          <section>

            <h3 className="font-semibold text-red-400">
              Tradeoffs
            </h3>

            <ul className="mt-3 space-y-2">

              {decision.tradeoffs.map((item) => (

                <li key={item}>

                  • {item}

                </li>

              ))}

            </ul>

          </section>

        </div>

        <section>

          <h3 className="font-semibold text-slate-200">
            Future Evolution
          </h3>

          <p className="mt-2 text-slate-400">

            {decision.future}

          </p>

        </section>

      </div>

    </div>
  );
}