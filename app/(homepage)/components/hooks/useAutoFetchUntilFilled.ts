import { useEffect } from "react";

interface UseAutoFetchUntilFilledOptions {
  onFetch: () => void;
  hasMore: boolean;
  isFetching: boolean;
  isLoading: boolean;
  data: unknown;
}

/**
 * Custom hook that automatically fetches more data until the screen has a scrollbar
 */
export function useAutoFetchUntilFilled({
  onFetch,
  hasMore,
  isFetching,
  isLoading,
  data,
}: UseAutoFetchUntilFilledOptions) {
  useEffect(() => {
    if (isLoading || isFetching || !hasMore) return;

    const checkIfNeedsMoreContent = () => {
      const hasVerticalScrollbar =
        document.documentElement.scrollHeight > window.innerHeight;

      if (!hasVerticalScrollbar && hasMore && !isFetching) {
        onFetch();
      }
    };

    checkIfNeedsMoreContent();

    const timeoutId = setTimeout(checkIfNeedsMoreContent, 100);

    return () => clearTimeout(timeoutId);
  }, [data, hasMore, isFetching, onFetch, isLoading]);
}
