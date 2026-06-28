import { useState } from "react";

export default function useRequestLifecycle() {
  const [stage, setStage] = useState("idle");

  const update = (event) => {
    if (event?.type === "lifecycle") {
      setStage(event.stage);
    }
  };

  return { stage, update };
}