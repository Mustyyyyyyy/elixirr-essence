import { useRef, useCallback } from "react";

export function useSwipe(
  onSwipeLeft?: () => void,
  onSwipeRight?: () => void
) {
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  }, []);

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      const diffX = touchStartX.current - e.changedTouches[0].clientX;
      const diffY = touchStartY.current - e.changedTouches[0].clientY;
      if (Math.abs(diffX) > Math.abs(diffY)) {
        if (diffX > 50 && onSwipeLeft) onSwipeLeft();
        if (diffX < -50 && onSwipeRight) onSwipeRight();
      }
    },
    [onSwipeLeft, onSwipeRight]
  );

  return { handleTouchStart, handleTouchEnd };
}
