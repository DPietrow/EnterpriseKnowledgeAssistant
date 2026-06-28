import { useState } from "react";

import ArchitectureHero from "../components/architecture/ArchitectureHero";
import ArchitectureDiagram from "../components/architecture/ArchitectureDiagram";
import TechnologyStack from "../components/architecture/TechnologyStack";
import MetricsPanel from "../components/architecture/MetricsPanel";
import RequestJourney from "../components/architecture/RequestJourney";
import PageSection from "../components/architecture/PageSection";
import Roadmap from "../components/architecture/Roadmap";
import DecisionMatrix from "../components/architecture/DecisionMatrix";

export default function ArchitecturePage() {
  const [hovered, setHovered] = useState(null);
  console.log("ARCH PAGE STATE:", hovered, setHovered);
  return (
    <div className="bg-slate-950 text-white">

        <ArchitectureHero />

        <PageSection
          title="System Architecture"
          subtitle="An overview of the end-to-end Retrieval-Augmented Generation pipeline."
        >
        
          <ArchitectureDiagram 
              hovered={hovered}
              setHovered={setHovered}
          />

        </PageSection>

        <PageSection
          dark
          title="Technology Stack"
          subtitle="The core technologies that power each layer of the Retrieval-Augmented Generation pipeline."
        >
            <TechnologyStack 
              hovered={hovered}
              setHovered={setHovered}
            />
        </PageSection>

        <PageSection
          title="System Metrics"
          subtitle="Key implementation characteristics and operational goals."
        >
        
          <MetricsPanel />

        </PageSection>

        <PageSection
          dark
          title="Request Journey"
          subtitle="Follow a user question through every stage of the pipeline."
        >
            <RequestJourney />
        </PageSection>

        <PageSection
          title="Engineering Tradeoffs"
          subtitle="Each major architectural decision balances performance, cost, deployment complexity, privacy, and maintainability."
        >
            <DecisionMatrix 
              hovered={hovered}
              setHovered={setHovered}
            />
        </PageSection>

        <PageSection
          title="Future Roadmap"
        >
        
          <Roadmap />

        </PageSection>


    </div>
  );
}