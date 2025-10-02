import { trpc } from "@/server/trpc/server";

export default async function Home() {
  const tarefas = await trpc.tarefa.all();

  return (
    <div className="font-sans min-h-screen p-8 bg-gray-50">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Tasks</h1>
        <div className="space-y-3">
          {tarefas.map((tarefa) => (
            <div key={tarefa.id} className="bg-white p-4 rounded-lg shadow">
              <h2 className="text-xl font-semibold text-gray-900">
                {tarefa.titulo}
              </h2>
              <p className="text-gray-600 mt-1">{tarefa.descricao}</p>
              <p className="text-sm text-gray-400 mt-2">
                {new Date(tarefa.dataCriacao).toISOString().split("T")[0]}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
