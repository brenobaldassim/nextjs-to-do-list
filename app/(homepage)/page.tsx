import Link from "next/link";
import { Plus } from "lucide-react";
import { TarefaList } from "./components/TarefaList";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default function Home() {
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
        <TarefaList />
      </div>
    </div>
  );
}
