import { publicProcedure, router } from "../trpc";
import { tarefaRouter } from "./tarefa";

// only one router since we are only working with tarefas
export const appRouter = router({
  tarefa: tarefaRouter,
});

export type AppRouter = typeof appRouter;
