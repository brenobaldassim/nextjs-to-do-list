"use client";

import { useParams, useRouter } from "next/navigation";
import { useTarefaForm } from "../hooks/useTarefaForm";
import { LoadingState } from "../components/LoadingState";
import { ErrorState } from "../components/ErrorState";
import { TarefaForm } from "../components/TarefaForm";
import { ArrowLeft } from "lucide-react";

const TarefaPage: React.FC = () => {
  const router = useRouter();
  const { id } = useParams();

  const tarefaId = id?.[0];
  const isEditMode = !!tarefaId;

  const {
    formData,
    errors,
    tarefa,
    isLoading,
    error,
    isPending,
    handleChange,
    handleSubmit,
  } = useTarefaForm({ tarefaId, isEditMode });

  if (isEditMode && isLoading) {
    return <LoadingState />;
  }

  if (isEditMode && (error || !tarefa)) {
    return (
      <ErrorState
        message={error?.message || "Tarefa não encontrada"}
        onBack={() => router.push("/")}
      />
    );
  }

  return (
    <div className="font-sans min-h-screen p-8 bg-dark-primary">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <button
            onClick={() => router.push("/")}
            className="text-light-secondary hover:text-dark-primary font-medium flex items-center gap-2 transition-colors bg-dark-secondary hover:bg-light-secondary rounded-lg cursor-pointer"
          >
            <div className="p-2 flex items-center gap-2">
              <ArrowLeft size={16} /> Voltar
            </div>
          </button>
        </div>

        <div className="bg-dark-secondary p-8 rounded-lg shadow-lg border-2 border-light-secondary/20">
          <h1 className="text-3xl font-bold mb-6 text-light-primary">
            {isEditMode ? "Editar Tarefa" : "Nova Tarefa"}
          </h1>

          <TarefaForm
            formData={formData}
            errors={errors}
            isPending={isPending}
            isEditMode={isEditMode}
            onSubmit={handleSubmit}
            onChange={handleChange}
            onCancel={() => router.push("/")}
          />
        </div>
      </div>
    </div>
  );
};

export default TarefaPage;
