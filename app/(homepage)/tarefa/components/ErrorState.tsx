/*
 * @param message - the message to display
 * @param onBack - the function to run when the button is clicked
 */
interface ErrorStateProps {
  message: string;
  onBack: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({ message, onBack }) => {
  return (
    <div className="font-sans min-h-screen p-8 bg-dark-primary">
      <div className="max-w-2xl mx-auto">
        <div className="bg-dark-subtle p-8 rounded-lg shadow-lg border border-light-secondary/20">
          <p className="text-red-400">Erro ao carregar tarefa: {message}</p>
          <button
            onClick={onBack}
            className="mt-4 text-light-secondary hover:text-light-primary font-medium transition-colors"
          >
            ← Voltar
          </button>
        </div>
      </div>
    </div>
  );
};
