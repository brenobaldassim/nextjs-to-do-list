import { TarefaFormData } from "../validation";

/*
 * @param formData - the form data
 * @param errors - the errors
 * @param isPending - if the form is pending
 * @param isEditMode - if the form is in edit mode
 * @param onSubmit - the function to run when the form is submitted
 * @param onChange - the function to run when the form is changed
 * @param onCancel - the function to run when the form is cancelled
 */
interface TarefaFormProps {
  formData: TarefaFormData;
  errors: Partial<Record<keyof TarefaFormData, string>>;
  isPending: boolean;
  isEditMode: boolean;
  onSubmit: (e: React.FormEvent) => void;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onCancel: () => void;
}

/**
 * As requested in the pdf ive cronstructed the edit form and create form together
 * but I would recommend to split them into two different forms since they share different concepts
 * and this break SOLID principles and could also lead to some bugs in the code
 */
export const TarefaForm: React.FC<TarefaFormProps> = ({
  formData,
  errors,
  isPending,
  isEditMode,
  onSubmit,
  onChange,
  onCancel,
}) => {
  const buttonText = isPending
    ? isEditMode
      ? "Atualizando..."
      : "Criando..."
    : isEditMode
    ? "Atualizar Tarefa"
    : "Criar Tarefa";

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div>
        <label
          htmlFor="titulo"
          className="block text-sm font-medium text-light-secondary mb-2"
        >
          Título <span className="text-red-400">*</span>
        </label>
        <input
          type="text"
          id="titulo"
          name="titulo"
          value={formData.titulo}
          onChange={onChange}
          className={`text-light-primary bg-dark-secondary w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-light-secondary focus:border-transparent ${
            errors.titulo ? "border-red-400" : "border-light-secondary/30"
          }`}
          placeholder="Digite o título da tarefa"
        />
        {errors.titulo && (
          <p className="mt-1 text-sm text-red-400">{errors.titulo}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="descricao"
          className="block text-sm font-medium text-light-secondary mb-2"
        >
          Descrição
        </label>
        <textarea
          id="descricao"
          name="descricao"
          value={formData.descricao}
          onChange={onChange}
          rows={4}
          className="text-light-primary bg-dark-secondary w-full px-4 py-2 border border-light-secondary/30 rounded-lg focus:ring-2 focus:ring-light-secondary focus:border-transparent resize-none"
          placeholder="Digite a descrição da tarefa (opcional)"
        />
      </div>

      <div className="flex gap-3 pt-4">
        <button
          type="submit"
          disabled={isPending}
          className="flex-1 cursor-pointer bg-dark-secondary text-light-primary py-2 px-4 rounded-lg hover:bg-light-secondary hover:text-dark-primary focus:ring-2 focus:ring-light-secondary focus:ring-offset-2 focus:ring-offset-dark-subtle disabled:opacity-50 disabled:cursor-not-allowed font-medium transition-colors"
        >
          {buttonText}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 cursor-pointer bg-dark-secondary border border-light-secondary/30 text-light-secondary py-2 px-4 rounded-lg hover:bg-dark-primary hover:text-light-primary focus:ring-2 focus:ring-light-secondary/50 focus:ring-offset-2 focus:ring-offset-dark-subtle font-medium transition-colors"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
};
