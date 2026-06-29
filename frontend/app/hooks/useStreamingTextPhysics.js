import { useRef, useState, useCallback } from "react";

/**
 * Buffers raw streaming tokens into smooth, readable chunks.
 * Improves perceived latency dramatically.
 */
export default function useStreamingTextPhysics(speed = 60) {
  const bufferRef = useRef("");
  const [text, setText] = useState("");

  const timerRef = useRef(null);

  const flush = useCallback(() => {
    if (!bufferRef.current) return;

    const chunk = bufferRef.current;
    bufferRef.current = "";

    setText((prev) => prev + chunk);
  }, []);

  const pushToken = useCallback(
    (token) => {
      bufferRef.current += token;

      // flush on timer (creates "typing feel")
      if (!timerRef.current) {
        timerRef.current = setTimeout(() => {
          flush();
          timerRef.current = null;
        }, speed);
      }
    },
    [flush, speed]
  );

  const reset = useCallback(() => {
    bufferRef.current = "";
    setText("");
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = null;
  }, []);

  return {
    text,
    pushToken,
    reset
  };
}