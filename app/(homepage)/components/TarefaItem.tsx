import { Tarefa } from "@/server/repository/types";
import Link from "next/link";
import { DeleteTarefaButton } from "./DeleteTarefaButton";

/*
 * @param tarefa - the tarefa to display
 */
interface TarefaItemProps {
  tarefa: Tarefa;
}

export const TarefaItem: React.FC<TarefaItemProps> = ({ tarefa }) => {
  return (
    <div
      key={tarefa.id}
      className="relative bg-dark-secondary p-4 border-2 rounded-lg shadow-lg border border-light-secondary/20"
    >
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h2 className="text-xl font-semibold text-light-primary truncate max-w-[200px]">
            {tarefa.titulo}
          </h2>
          <p className="text-light-secondary mt-1 truncate max-w-[200px] md:max-w-[400px] lg:max-w-[500px]">
            {tarefa.descricao}
          </p>
          <p className="text-sm text-light-secondary/60 mt-2  ">
            {new Date(tarefa.dataCriacao).toISOString().split("T")[0]}
          </p>
        </div>
        <div className="absolute right-4 top-4 flex gap-4">
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
