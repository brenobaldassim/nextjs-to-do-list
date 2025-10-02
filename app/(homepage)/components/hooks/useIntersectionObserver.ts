import { useEffect, useRef } from "react";

interface UseIntersectionObserverOptions {
  onIntersect: () => void;
  enabled: boolean;
  threshold?: number;
}

/**
 * Custom hook that handles intersection observer logic for infinite scroll
 */
export function useIntersectionObserver({
  onIntersect,
  enabled,
  threshold = 0.1,
}: UseIntersectionObserverOptions) {
  const targetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!targetRef.current || !enabled) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          onIntersect();
        }
      },
      { threshold }
    );

    observer.observe(targetRef.current);

    return () => {
      observer.disconnect();
    };
  }, [enabled, onIntersect, threshold]);

  return targetRef;
}
