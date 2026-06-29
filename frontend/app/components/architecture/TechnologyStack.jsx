import { architectureDecisions } from "../../data/architectureDecisions";

import DecisionCard from "./DecisionCard";

export default function TechnologyStack() {

  return (

    <section className="mx-auto mt-24 max-w-7xl px-8">

      <div className="mb-12">

        <h2 className="text-4xl font-bold">

          Engineering Decisions

        </h2>

        <p className="mt-4 max-w-3xl text-slate-400">

          Every production system is a collection of tradeoffs.
          Rather than optimizing for benchmark scores alone,
          this project prioritizes maintainability, deployment flexibility,
          enterprise privacy, explainability, and developer experience.

        </p>

      </div>

      <div className="space-y-10">

        {architectureDecisions.map((decision) => (

          <DecisionCard

            key={decision.id}

            decision={decision}

          />

        ))}

      </div>

    </section>

  );

}