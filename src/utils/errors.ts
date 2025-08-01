import { ToastContextProps } from '@/shared/ui/providers/global-toast';

export class AppError extends Error {
  constructor(message: string, public code: string = 'APP_ERROR') {
    super(message);
    this.name = 'AppError';
    this.code = code;
    Object.setPrototypeOf(this, new.target.prototype); //
  }

  toJSON() {
    return {
      name: this.name,
      message: this.message,
      code: this.code,
    };
  }
}

interface SerializedAppError {
  name?: string;
  message?: string;
  code?: string;
}

function isSerializedAppError(e: unknown): e is SerializedAppError {
  if (typeof e !== 'object' || e === null) return false;

  const hasMessage = 'message' in e && typeof (e as { message: unknown }).message === 'string';
  if (!hasMessage) return false;

  const nameMatches = 'name' in e && (e as { name: unknown }).name === 'AppError';
  const codeMatches = 'code' in e && (e as { code: unknown }).code === 'APP_ERROR';

  return nameMatches || codeMatches;
}

export const toastError = (error: unknown, toast: ToastContextProps) => {
  if (error instanceof AppError) {
    toast.showToast(error.message, 'error');
    return;
  }

  if (isSerializedAppError(error)) {
    const message = (error as SerializedAppError).message!;
    toast.showToast(message, 'error');
    return;
  }

  console.error(error);
  toast.showToast('Something went wrong', 'error');
};
