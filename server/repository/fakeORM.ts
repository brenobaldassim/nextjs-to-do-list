import type {
  Tarefa,
  TarefaService,
  CreateTarefaInput,
  FindManyTarefaInput,
} from "./types";

class FakeORM {
  private tarefas: Tarefa[] = [];

  public tarefa: TarefaService = {
    create: async (tarefa: CreateTarefaInput) => {
      const newTarefa = {
        ...tarefa,
        id: crypto.randomUUID(),
        dataCriacao: new Date(),
        descricao: tarefa.descricao || "",
      };
      this.tarefas.push(newTarefa);
      return Promise.resolve(newTarefa);
    },
    findMany: async ({ orderBy, cursor, limit }: FindManyTarefaInput) => {
      const sorted = this.tarefas.sort((a, b) =>
        orderBy.dataCriacao === "asc"
          ? a.dataCriacao.getTime() - b.dataCriacao.getTime()
          : b.dataCriacao.getTime() - a.dataCriacao.getTime()
      );

      // If no cursor or limit, return all (for backward compatibility)
      if (!cursor && !limit) {
        return Promise.resolve(sorted);
      }

      // Find cursor position
      let startIndex = 0;
      if (cursor) {
        const cursorIndex = sorted.findIndex((t) => t.id === cursor);
        startIndex = cursorIndex >= 0 ? cursorIndex + 1 : 0;
      }

      // Apply limit
      const result = limit
        ? sorted.slice(startIndex, startIndex + limit)
        : sorted.slice(startIndex);

      return Promise.resolve(result);
    },
    findById: async (id: string) => {
      return Promise.resolve(this.tarefas.find((tarefa) => tarefa.id === id));
    },
    update: async (updatedTarefa: Tarefa) => {
      this.tarefas = this.tarefas.map((tarefa) =>
        tarefa.id === updatedTarefa.id ? updatedTarefa : tarefa
      );
      return Promise.resolve(updatedTarefa);
    },
    delete: async (tarefa: Tarefa) => {
      this.tarefas = this.tarefas.filter((t) => t.id !== tarefa.id);
      return Promise.resolve(tarefa);
    },
    deleteMany: async () => {
      this.tarefas = [];
      return Promise.resolve(this.tarefas);
    },
  };
}

// Use globalThis to ensure a single instance across HMR and different contexts
const globalForORM = globalThis as unknown as {
  fakeORM: FakeORM | undefined;
};

const fakeORM = globalForORM.fakeORM ?? new FakeORM();

if (process.env.NODE_ENV !== "production") {
  globalForORM.fakeORM = fakeORM;
}

export default fakeORM;
