import { useEffect, useRef } from "react";

/*
 * @param onIntersect - run when element is visible
 * @param enabled - if the observer should be enabled
 * @param threshold - percentage of the element that must be visible to trigger the callback
 */
interface UseIntersectionObserverOptions {
  onIntersect: () => void;
  enabled: boolean;
  threshold?: number;
}

/**
 * Custom hook that handles intersection observer logic for infinite scroll
 * When the element is visible and it is within the threshold, the callback is triggered
 */
export const useIntersectionObserver = ({
  onIntersect,
  enabled,
  threshold = 0.1,
}: UseIntersectionObserverOptions) => {
  // reference to the element that will be observed
  const targetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!targetRef.current || !enabled) {
      return;
    }

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
};
