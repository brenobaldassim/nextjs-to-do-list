import { TRPCError } from "@trpc/server";
import { z } from "zod";
import fakeORM from "../repository/fakeORM";
import { publicProcedure, router } from "../trpc";

export const tarefaRouter = router({
  all: publicProcedure.query(async () => {
    const tarefas = await fakeORM.tarefa.findMany({
      orderBy: {
        dataCriacao: "asc",
      },
    });

    if (!tarefas) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Tarefas não encontradas",
      });
    }
    return tarefas;
  }),
  infinite: publicProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).default(10),
        cursor: z.string().optional(),
      })
    )
    .query(async ({ input }) => {
      const { cursor, limit } = input;
      const tarefas = await fakeORM.tarefa.findMany({
        orderBy: {
          dataCriacao: "asc",
        },
        cursor,
        limit: limit + 1, // Fetch one extra to determine if there's a next page
      });

      let nextCursor: string | undefined = undefined;
      if (tarefas.length > limit) {
        const nextItem = tarefas.pop(); // Remove the extra item
        nextCursor = nextItem?.id;
      }

      return {
        items: tarefas,
        nextCursor,
      };
    }),
  byId: publicProcedure
    .input(z.object({ id: z.string().min(1) }))
    .query(async ({ input }) => {
      const tarefa = await fakeORM.tarefa.findById(input.id);
      if (!tarefa) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Tarefa não encontrada",
        });
      }
      return tarefa;
    }),
  add: publicProcedure
    .input(
      z.object({
        titulo: z.string().min(3),
        descricao: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const todo = await fakeORM.tarefa.create(input);
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

      let tarefa = await fakeORM.tarefa.findById(id);

      if (!tarefa) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Tarefa não encontrada",
        });
      }

      tarefa = { ...tarefa, ...data };

      const todo = await fakeORM.tarefa.update(tarefa);
      return todo;
    }),
  delete: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input }) => {
      const { id } = input;
      const tarefa = await fakeORM.tarefa.findById(id);

      if (!tarefa) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Tarefa não encontrada",
        });
      }
      await fakeORM.tarefa.delete(tarefa);
      return id;
    }),
});
