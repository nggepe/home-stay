'use client';

import * as Toast from '@radix-ui/react-toast';
import { FC, useState, useContext, createContext, ReactNode } from 'react';

export type ToastVariant = 'success' | 'error';

export interface ToastContextProps {
  showToast: (message: string, variant?: ToastVariant) => void;
}

export const ToastContext = createContext<ToastContextProps | undefined>(undefined);

export const useToast = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within a GlobalToast');
  return ctx;
};

export const ToastProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [variant, setVariant] = useState<ToastVariant>('success');

  const showToast = (msg: string, type: ToastVariant = 'success') => {
    setMessage(msg);
    setVariant(type);
    setOpen(true);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      <Toast.Provider duration={3000} swipeDirection="right">
        {children}
        <Toast.Root
          open={open}
          onOpenChange={setOpen}
          className={`rounded px-4 py-2 text-white shadow-md ${variant === 'success' ? 'bg-green-600' : 'bg-red-400'}`}
        >
          <Toast.Description>{message}</Toast.Description>
        </Toast.Root>
        <Toast.Viewport className="fixed bottom-4 right-4 z-50" />
      </Toast.Provider>
    </ToastContext.Provider>
  );
};
