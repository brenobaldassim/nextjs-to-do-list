import { z } from "zod";
import fakeORM from "../repository/fakeORM";
import { publicProcedure, router } from "../trpc";

export const tarefaRouter = router({
  all: publicProcedure.query(async () => {
    return await fakeORM.tarefa.findMany({
      orderBy: {
        dataCriacao: "asc",
      },
    });
  }),
  byId: publicProcedure
    .input(z.object({ id: z.string().min(1) }))
    .query(async ({ input }) => {
      return await fakeORM.tarefa.findById(input.id);
    }),
  add: publicProcedure
    .input(
      z.object({
        titulo: z.string().min(3),
        descricao: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const todo = await fakeORM.tarefa.create({ ...input });
      return todo;
    }),
  edit: publicProcedure
    .input(
      z.object({
        id: z.string(),
        data: z.object({
          descricao: z.string().min(1).optional(),
          titulo: z.string().min(3).optional(),
        }),
      })
    )
    .mutation(async ({ input }) => {
      const { id, data } = input;

      const todo = await fakeORM.tarefa.update(id, data);
      return todo;
    }),
  delete: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input }) => {
      const { id } = input;
      await fakeORM.tarefa.delete({ where: { id } });
      return id;
    }),
});
