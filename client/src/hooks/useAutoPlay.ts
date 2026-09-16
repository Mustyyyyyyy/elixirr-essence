import { useState, useEffect, useRef, useCallback } from "react";

export function useAutoPlay(
  count: number,
  interval = 5000
): {
  current: number;
  goTo: (index: number) => void;
  next: () => void;
  prev: () => void;
  resetTimer: () => void;
} {
  const [current, setCurrent] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const resetTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % count);
    }, interval);
  }, [count, interval]);

  useEffect(() => {
    if (count <= 1) return;
    resetTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [count, interval, resetTimer]);

  const goTo = useCallback(
    (index: number) => {
      setCurrent(index);
      resetTimer();
    },
    [resetTimer]
  );

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % count);
    resetTimer();
  }, [count, resetTimer]);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + count) % count);
    resetTimer();
  }, [count, resetTimer]);

  return { current, goTo, next, prev, resetTimer };
}
