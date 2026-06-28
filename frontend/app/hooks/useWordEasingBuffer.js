import { useRef } from "react";

export default function useWordEasingBuffer(updateText, delay = 35) {
  const bufferRef = useRef("");
  const timeoutRef = useRef(null);

  const flush = () => {
    if (!bufferRef.current) return;

    updateText(bufferRef.current);
    bufferRef.current = "";
  };

  const push = (token) => {
    bufferRef.current += token;

    // debounce flush
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(flush, delay);
  };

  const reset = () => {
    clearTimeout(timeoutRef.current);
    bufferRef.current = "";
  };

  return { push, reset };
}