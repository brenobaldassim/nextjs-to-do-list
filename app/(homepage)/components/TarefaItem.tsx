import { Tarefa } from "@/server/repository/types";
import Link from "next/link";
import { DeleteTarefaButton } from "./DeleteTarefaButton";

interface TarefaItemProps {
  tarefa: Tarefa;
}

export const TarefaItem: React.FC<TarefaItemProps> = ({ tarefa }) => {
  return (
    <div
      key={tarefa.id}
      className="bg-dark-secondary p-4 border-2 rounded-lg shadow-lg border border-light-secondary/20"
    >
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h2 className="text-xl font-semibold text-light-primary">
            {tarefa.titulo}
          </h2>
          <p className="text-light-secondary mt-1">{tarefa.descricao}</p>
          <p className="text-sm text-light-secondary/60 mt-2">
            {new Date(tarefa.dataCriacao).toISOString().split("T")[0]}
          </p>
        </div>
        <div className="flex gap-2 ml-4">
          <Link
            href={`/tarefa/${tarefa.id}`}
            className="text-light-secondary hover:text-light-primary font-medium text-sm transition-colors"
          >
            Editar
          </Link>
          <DeleteTarefaButton tarefaId={tarefa.id} />
        </div>
      </div>
    </div>
  );
};
