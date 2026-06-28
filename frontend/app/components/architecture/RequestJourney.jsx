import { useState } from "react";

const steps = [
  "User Input",
  "Flask API",
  "Retrieval (MiniLM + pgvector)",
  "Prompt Construction",
  "Phi-4 Inference",
  "Streaming Response"
];

export default function RequestJourney() {
  const [activeStep, setActiveStep] = useState(steps.length - 1);

  return (
    <div className="space-y-6">

      <div className="flex justify-between items-center">

        <div className="text-sm text-slate-400">
          Click a step to inspect system state
        </div>

        <div className="text-xs text-slate-500">
          Step {activeStep + 1} / {steps.length}
        </div>

      </div>

      <div className="relative">

        <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-slate-800" />

        <div className="flex justify-between relative">

          {steps.map((step, i) => {

            const active = i <= activeStep;

            return (
              <div
                key={step}
                onClick={() => setActiveStep(i)}
                className={`
                  z-10 cursor-pointer text-center
                  transition-all duration-300
                  ${active ? "text-blue-400" : "text-slate-600"}
                `}
              >

                <div
                  className={`
                    w-4 h-4 mx-auto mb-2 rounded-full
                    transition-all duration-300

                    ${active
                      ? "bg-blue-500 scale-125 shadow-lg shadow-blue-500/30"
                      : "bg-slate-700"
                    }
                  `}
                />

                <div className="text-xs w-24">
                  {step}
                </div>

              </div>
            );

          })}

        </div>

      </div>

    </div>
  );
}