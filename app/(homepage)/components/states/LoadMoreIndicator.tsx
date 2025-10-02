import { Loader2 } from "lucide-react";

interface LoadMoreIndicatorProps {
  isFetching: boolean;
  hasMore: boolean;
  itemCount: number;
}

export function LoadMoreIndicator({
  isFetching,
  hasMore,
  itemCount,
}: LoadMoreIndicatorProps) {
  if (isFetching) {
    return (
      <div className="flex justify-center items-center">
        <Loader2 className="w-6 h-6 animate-spin text-light-secondary" />
        <span className="ml-2 text-light-secondary">
          Carregando mais tarefas...
        </span>
      </div>
    );
  }

  if (!hasMore && itemCount > 0) {
    return (
      <div className="text-center text-light-secondary text-sm">
        Todas as tarefas foram carregadas
      </div>
    );
  }

  return null;
}
