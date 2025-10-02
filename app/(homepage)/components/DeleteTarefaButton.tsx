"use client";

import { Trash2 } from "lucide-react";
import { trpc } from "@/app/api/trpc/client";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface DeleteTarefaButtonProps {
  tarefaId: string;
}

export const DeleteTarefaButton: React.FC<DeleteTarefaButtonProps> = ({
  tarefaId,
}) => {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const deleteMutation = trpc.tarefa.delete.useMutation({
    onSuccess: () => {
      router.refresh();
      setIsDeleting(false);
    },
    onError: (error) => {
      console.error("Error deleting tarefa:", error);
      alert("Erro ao excluir tarefa");
      setIsDeleting(false);
    },
  });

  const handleDelete = async () => {
    if (window.confirm("Tem certeza que deseja excluir esta tarefa?")) {
      setIsDeleting(true);
      deleteMutation.mutate({ id: tarefaId });
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isDeleting}
      className="text-red-400 hover:text-red-300 font-medium text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
      title="Excluir tarefa"
    >
      <Trash2 size={16} />
      {isDeleting ? "Excluindo..." : "Excluir"}
    </button>
  );
};
