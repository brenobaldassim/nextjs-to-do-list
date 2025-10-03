import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { trpc } from "@/app/api/trpc/client";
import { tarefaSchema, TarefaFormData } from "../validation";
import toast from "react-hot-toast";

/*
 * @param tarefaId - the id of the tarefa
 * @param isEditMode - if the form is in edit mode
 */
interface UseTarefaFormProps {
  tarefaId?: string;
  isEditMode: boolean;
}

/**
 * As requested in the pdf ive cronstructed the edit form and create form together
 * but I would recommend to split them into two different forms since they share different concepts
 * and this break SOLID principles and could also lead to some bugs in the code
 */
export const useTarefaForm = ({ tarefaId, isEditMode }: UseTarefaFormProps) => {
  const router = useRouter();
  const utils = trpc.useUtils();

  const [formData, setFormData] = useState<TarefaFormData>({
    titulo: "",
    descricao: "",
  });

  const [errors, setErrors] = useState<
    Partial<Record<keyof TarefaFormData, string>>
  >({});

  const {
    data: tarefa,
    isLoading,
    error,
  } = trpc.tarefa.byId.useQuery({ id: tarefaId! }, { enabled: isEditMode });

  const createTarefa = trpc.tarefa.add.useMutation({
    onSuccess: async (data) => {
      toast.success(`Tarefa criada com sucesso: ${data.titulo}`);
      await utils.tarefa.all.invalidate();
      await utils.tarefa.infinite.invalidate();
      router.push("/");
      router.refresh();
    },
    onError: (error) => {
      toast.error(`Erro ao criar tarefa: ${error.message}`);
    },
  });

  const updateTarefa = trpc.tarefa.edit.useMutation({
    onSuccess: async () => {
      toast.success("Tarefa atualizada com sucesso!");
      await utils.tarefa.all.invalidate();
      await utils.tarefa.infinite.invalidate();
      router.push("/");
      router.refresh();
    },
    onError: (error) => {
      toast.error(`Erro ao atualizar tarefa: ${error.message}`);
    },
  });

  useEffect(() => {
    if (tarefa && isEditMode) {
      setFormData({
        titulo: tarefa.titulo,
        descricao: tarefa.descricao,
      });
    }
  }, [tarefa, isEditMode]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name as keyof TarefaFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const result = tarefaSchema.safeParse(formData);

    if (!result.success) {
      const formattedErrors: Partial<Record<keyof TarefaFormData, string>> = {};
      result.error.issues.forEach((err) => {
        if (err.path[0]) {
          formattedErrors[err.path[0] as keyof TarefaFormData] = err.message;
        }
      });
      setErrors(formattedErrors);
      return;
    }

    const { titulo, descricao } = result.data;

    if (isEditMode) {
      updateTarefa.mutate({
        id: tarefaId!,
        data: {
          titulo,
          descricao,
        },
      });
    } else {
      createTarefa.mutate({
        titulo,
        descricao,
      });
    }
  };

  const isPending = isEditMode
    ? updateTarefa.isPending
    : createTarefa.isPending;

  return {
    formData,
    errors,
    tarefa,
    isLoading,
    error,
    isPending,
    handleChange,
    handleSubmit,
  };
};
