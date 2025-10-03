/**
 * @param onDelete - the function to run when the delete button is clicked
 * @param onDismiss - the function to run when the dismiss button is clicked
 * @param message - the message to display in the toast
 */
interface ToastConfirmProps {
  onDelete: () => void;
  onDismiss: () => void;
  message: string;
}

export const ToastConfirm = ({
  onDelete,
  onDismiss,
  message,
}: ToastConfirmProps) => {
  return (
    <div className="flex flex-col gap-3">
      <p className="font-medium">{message}</p>
      <div className="flex gap-2 justify-end">
        <button
          onClick={() => {
            onDismiss();
          }}
          className="px-3 py-1.5 text-sm cursor-pointer bg-dark-secondary hover:bg-light-secondary text-light-primary rounded transition-colors"
        >
          Cancelar
        </button>
        <button
          onClick={() => {
            onDelete();
          }}
          className="px-3 py-1.5 text-sm cursor-pointer hover:text-red-300 text-white bg-red-400 hover:bg-red-300 rounded transition-colors"
        >
          Excluir
        </button>
      </div>
    </div>
  );
};
