"use client";

import { trpc } from "@/app/api/trpc/client";
import { TarefaItem } from "./TarefaItem";
import { useIntersectionObserver } from "./hooks/useIntersectionObserver";
import { useAutoFetchUntilFilled } from "./hooks/useAutoFetchUntilFilled";
import { LoadingState } from "./states/LoadingState";
import { ErrorState } from "./states/ErrorState";
import { EmptyState } from "./states/EmptyState";
import { LoadMoreIndicator } from "./states/LoadMoreIndicator";

/**
 * TarefaList component responsible for displaying an infinite scrolling list of tarefas.
 * - Auto-fetch logic
 */
export function TarefaList() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = trpc.tarefa.infinite.useInfiniteQuery(
    {
      limit: 6,
    },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    }
  );

  // Auto-fetch until screen is filled
  useAutoFetchUntilFilled({
    onFetch: fetchNextPage,
    hasMore: hasNextPage ?? false,
    isFetching: isFetchingNextPage,
    isLoading,
    data,
  });

  // Set up intersection observer for infinite scroll
  const loadMoreRef = useIntersectionObserver({
    onIntersect: fetchNextPage,
    enabled: (hasNextPage ?? false) && !isFetchingNextPage,
  });

  if (isLoading) {
    return <LoadingState />;
  }

  if (isError) {
    return <ErrorState />;
  }

  const tarefas = data?.pages.flatMap((page) => page.items) ?? [];
  if (tarefas.length === 0) {
    return <EmptyState />;
  }

  return (
    <>
      <div className="space-y-3">
        {tarefas.map((tarefa) => (
          <TarefaItem key={tarefa.id} tarefa={tarefa} />
        ))}
      </div>

      <div ref={loadMoreRef} className="py-4">
        <LoadMoreIndicator
          isFetching={isFetchingNextPage}
          hasMore={hasNextPage ?? false}
          itemCount={tarefas.length}
        />
      </div>
    </>
  );
}
