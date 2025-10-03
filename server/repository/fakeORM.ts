import type {
  Tarefa,
  TarefaService,
  CreateTarefaInput,
  FindManyTarefaInput,
} from "./types";

/**
 * FakeORM is a fake implementation of the ORM for the tarefas
 * Tryied to make it as close as possible to a real ORM
 * But at the same time keep it simple and easy to understand work with
 */
class FakeORM {
  private tarefas: Tarefa[] = [];

  public tarefa: TarefaService = {
    create: async (tarefa: CreateTarefaInput) => {
      // generate a random id and a new date
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

      // if no cursor or limit, return all (for backward compatibility)
      // return case for when we are not using infinite scroll
      if (!cursor && !limit) {
        return Promise.resolve(sorted);
      }

      // find cursor position
      let startIndex = 0;
      if (cursor) {
        const cursorIndex = sorted.findIndex((t) => t.id === cursor);
        startIndex = cursorIndex >= 0 ? cursorIndex + 1 : 0;
      }

      // just so we dont fill entire screen with tarefas if we dont want to
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

// we are using globalThis to ensure a single instance across HMR and different contexts
const globalForORM = globalThis as unknown as {
  fakeORM: FakeORM | undefined;
};

const fakeORM = globalForORM.fakeORM ?? new FakeORM();

if (process.env.NODE_ENV !== "production") {
  globalForORM.fakeORM = fakeORM;
}

export default fakeORM;
