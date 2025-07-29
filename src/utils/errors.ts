import { ToastContextProps } from '@/shared/ui/providers/global-toast';

export class AppError extends Error {
  constructor(message: string, public code?: string) {
    super(message);
    this.name = 'AppError';
  }
}

export const toastError = (error: unknown, toast: ToastContextProps) => {
  if (error instanceof AppError) {
    toast.showToast(error.message, 'error');
    return;
  }
  console.error(error);
  toast.showToast('Something went wrong', 'error');
};
