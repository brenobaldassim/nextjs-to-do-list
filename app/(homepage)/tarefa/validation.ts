import { z } from "zod";

export const tarefaSchema = z.object({
  titulo: z
    .string()
    .min(1, "Título é obrigatório")
    .min(3, "Título deve ter pelo menos 3 caracteres"),
  descricao: z
    .string()
    .transform((val) => (val === "" ? undefined : val))
    .optional(),
});

export type TarefaFormData = z.infer<typeof tarefaSchema>;
