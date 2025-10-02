import type {
  Tarefa,
  TarefaService,
  CreateTarefaInput,
  UpdateTarefaInput,
  DeleteTarefaInput,
  FindManyTarefaInput,
} from "./types";

class fakeORM {
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
    update: async (id: string, updatedTarefa: UpdateTarefaInput) => {
      const tarefa = this.tarefas.find((tarefa) => tarefa.id === id);

      if (!tarefa) {
        throw new Error("Tarefa não encontrada");
      }

      const newTarefa = { ...tarefa, ...updatedTarefa };

      this.tarefas = this.tarefas.map((tarefa) =>
        tarefa.id === id ? newTarefa : tarefa
      );
      return Promise.resolve(newTarefa);
    },
    delete: async ({ where }: DeleteTarefaInput) => {
      const { id } = where;
      const tarefa = this.tarefas.find((tarefa) => tarefa.id === id);
      if (!tarefa) {
        throw new Error("Tarefa não encontrada");
      }
      this.tarefas = this.tarefas.filter((tarefa) => tarefa.id !== id);
      return Promise.resolve(tarefa);
    },
    deleteMany: async () => {
      this.tarefas = [];
      return Promise.resolve(this.tarefas);
    },
  };
}

export default new fakeORM();
