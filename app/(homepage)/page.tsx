import { trpc } from "@/server/trpc/server";
import Link from "next/link";
import { Plus } from "lucide-react";

export const dynamic = "force-dynamic";
export const revalidate = 0;

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
            <div
              key={tarefa.id}
              className="bg-dark-secondary p-4 rounded-lg shadow-lg border border-light-secondary/20"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h2 className="text-xl font-semibold text-light-primary">
                    {tarefa.titulo}
                  </h2>
                  <p className="text-light-secondary mt-1">
                    {tarefa.descricao}
                  </p>
                  <p className="text-sm text-light-secondary/60 mt-2">
                    {new Date(tarefa.dataCriacao).toISOString().split("T")[0]}
                  </p>
                </div>
                <Link
                  href={`/tarefa/${tarefa.id}`}
                  className="ml-4 text-light-secondary hover:text-light-primary font-medium text-sm transition-colors"
                >
                  Editar
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
