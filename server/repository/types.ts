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

export type UpdateTarefaInput = Partial<Tarefa>;

export type DeleteTarefaInput = {
  where: {
    id: string;
  };
};

export type FindManyTarefaInput = {
  orderBy: {
    dataCriacao: "asc" | "desc";
  };
};

export type TarefaService = {
  create: (tarefa: CreateTarefaInput) => Promise<Tarefa>;
  findMany: (findManyTarefaInput: FindManyTarefaInput) => Promise<Tarefa[]>;
  findById: (id: string) => Promise<Tarefa | undefined>;
  update: (id: string, tarefa: UpdateTarefaInput) => Promise<Tarefa>;
  delete: (tarefa: DeleteTarefaInput) => Promise<Tarefa>;
  deleteMany: () => Promise<Tarefa[]>;
};
