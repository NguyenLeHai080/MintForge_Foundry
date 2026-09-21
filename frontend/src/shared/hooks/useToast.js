import { useToastStore } from '../store/toastStore';

export function useToast() {
  const { addToast, removeToast, success, error, warning, info } = useToastStore();

  return {
    toast: addToast,
    dismiss: removeToast,
    success,
    error,
    warning,
    info,
  };
}

export default useToast;
