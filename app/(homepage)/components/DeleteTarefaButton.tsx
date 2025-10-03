"use client";

import { Trash2 } from "lucide-react";
import { trpc } from "@/app/api/trpc/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { ToastConfirm } from "./ToastConfirm";

/*
 * @param tarefaId - the id of the tarefa to delete
 */
interface DeleteTarefaButtonProps {
  tarefaId: string;
}

export const DeleteTarefaButton: React.FC<DeleteTarefaButtonProps> = ({
  tarefaId,
}) => {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const utils = trpc.useUtils();
  const deleteMutation = trpc.tarefa.delete.useMutation({
    onSuccess: async () => {
      toast.success("Tarefa excluída com sucesso!");
      // invalidate the infinite query to fetch the new data
      await utils.tarefa.infinite.invalidate();
      router.refresh();
      setIsDeleting(false);
    },
    onError: (error) => {
      console.error("Error deleting tarefa:", error);
      toast.error("Erro ao excluir tarefa");
      setIsDeleting(false);
    },
  });

  const handleDelete = async () => {
    toast(
      (t) => (
        <ToastConfirm
          onDelete={() => {
            toast.dismiss(t.id);
            setIsDeleting(true);
            deleteMutation.mutate({ id: tarefaId });
          }}
          onDismiss={() => {
            toast.dismiss(t.id);
          }}
          message="Tem certeza que deseja excluir esta tarefa?"
        />
      ),
      {
        duration: Infinity,
        style: {
          maxWidth: "400px",
        },
      }
    );
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isDeleting}
      className="text-red-400 hover:text-red-300 font-medium text-sm transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
      title="Excluir tarefa"
    >
      <Trash2 size={14} />
      {isDeleting ? "Excluindo..." : "Excluir"}
    </button>
  );
};
