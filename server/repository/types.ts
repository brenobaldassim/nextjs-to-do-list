export type Tarefa = {
  id: string;
  titulo: string;
  descricao: string;
  dataCriacao: Date;
};

export type CreateTarefaInput = Omit<
  Tarefa,
  "id" | "dataCriacao" | "descricao"
> & {
  descricao?: string;
};

export type FindManyTarefaInput = {
  orderBy: {
    dataCriacao: "asc" | "desc";
  };
  cursor?: string;
  limit?: number;
};

export type TarefaService = {
  create: (tarefa: CreateTarefaInput) => Promise<Tarefa>;
  findMany: (findManyTarefaInput: FindManyTarefaInput) => Promise<Tarefa[]>;
  findById: (id: string) => Promise<Tarefa | undefined>;
  update: (tarefa: Tarefa) => Promise<Tarefa>;
  delete: (tarefa: Tarefa) => Promise<Tarefa>;
  deleteMany: () => Promise<Tarefa[]>;
};
