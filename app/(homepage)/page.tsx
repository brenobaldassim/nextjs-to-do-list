import { trpc } from "@/server/trpc/server";
import Link from "next/link";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function Home() {
  const tarefas = await trpc.tarefa.all();

  return (
    <div className="font-sans min-h-screen p-8 bg-gray-50">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Tasks</h1>
          <Link
            href="/tarefa"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 font-medium"
          >
            + Nova Tarefa
          </Link>
        </div>
        <div className="space-y-3">
          {tarefas.map((tarefa) => (
            <div key={tarefa.id} className="bg-white p-4 rounded-lg shadow">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h2 className="text-xl font-semibold text-gray-900">
                    {tarefa.titulo}
                  </h2>
                  <p className="text-gray-600 mt-1">{tarefa.descricao}</p>
                  <p className="text-sm text-gray-400 mt-2">
                    {new Date(tarefa.dataCriacao).toISOString().split("T")[0]}
                  </p>
                </div>
                <Link
                  href={`/tarefa/${tarefa.id}`}
                  className="ml-4 text-blue-600 hover:text-blue-800 font-medium text-sm"
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
