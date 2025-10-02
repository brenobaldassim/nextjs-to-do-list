import { trpc } from "@/server/trpc/server";
import Link from "next/link";
import { Plus } from "lucide-react";
import { TarefaItem } from "./components/TarefaItem";

export default async function Home() {
  const tarefas = await trpc.tarefa.all();

  return (
    <div className="font-sans min-h-screen p-8 bg-dark-primary">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-light-primary">
            Lista de Tarefas
          </h1>
          <Link
            href="/tarefa"
            className="bg-dark-secondary text-light-primary px-4 py-2 rounded-lg hover:bg-light-secondary hover:text-dark-primary font-medium flex items-center gap-2 transition-colors"
          >
            <Plus size={16} /> Nova Tarefa
          </Link>
        </div>
        <div className="space-y-3">
          {tarefas.map((tarefa) => (
            <TarefaItem key={tarefa.id} tarefa={tarefa} />
          ))}
        </div>
      </div>
    </div>
  );
}
