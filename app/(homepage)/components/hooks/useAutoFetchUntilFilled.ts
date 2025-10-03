import { useEffect } from "react";

/*
 * @param onFetch - function to fetch more data
 * @param hasMore - if there is more data to fetch
 * @param isFetching - if the data is being fetched
 * @param isLoading - if the data is being loaded
 * @param data - the data to check if there is more content
 */
interface UseAutoFetchUntilFilledOptions {
  onFetch: () => void;
  hasMore: boolean;
  isFetching: boolean;
  isLoading: boolean;
  data: unknown;
}

/**
 * Custom hook that automatically fetches more data until the screen has a scrollbar
 * With that we can avoid the infinite scroll to be triggered when the user is not scrolling
 */
export const useAutoFetchUntilFilled = ({
  onFetch,
  hasMore,
  isFetching,
  isLoading,
  data,
}: UseAutoFetchUntilFilledOptions) => {
  useEffect(() => {
    if (isLoading || isFetching || !hasMore) {
      return;
    }

    const checkIfNeedsMoreContent = () => {
      // if have scrollbar means that with have full content
      const hasVerticalScrollbar =
        document.documentElement.scrollHeight > window.innerHeight;

      if (!hasVerticalScrollbar && hasMore && !isFetching) {
        onFetch();
      }
    };

    checkIfNeedsMoreContent();

    // simulate a delay to check if we need more content
    const timeoutId = setTimeout(checkIfNeedsMoreContent, 100);

    return () => clearTimeout(timeoutId);
  }, [data, hasMore, isFetching, onFetch, isLoading]);
};
