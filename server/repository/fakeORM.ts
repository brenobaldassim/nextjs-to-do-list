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
    findMany: async ({ orderBy }: FindManyTarefaInput) => {
      return Promise.resolve(
        this.tarefas.sort((a, b) =>
          orderBy.dataCriacao === "asc"
            ? a.dataCriacao.getTime() - b.dataCriacao.getTime()
            : b.dataCriacao.getTime() - a.dataCriacao.getTime()
        )
      );
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
