'use client';

import { AlertDialog, Button } from '@radix-ui/themes';
import * as React from 'react';

export type AlertDialogOptions = {
  title: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  disableAction?: boolean;
  form?: React.ReactNode;
};

type ContextType = {
  open: (options: AlertDialogOptions) => void;
  close: () => void;
};

const AlertDialogContext = React.createContext<ContextType | null>(null);

export const AlertDialogProvider = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [options, setOptions] = React.useState<AlertDialogOptions | null>(null);
  const [loading, setLoading] = React.useState(false);

  const open = (opts: AlertDialogOptions) => {
    setOptions(opts);
    setIsOpen(true);
  };

  const close = () => {
    setIsOpen(false);
  };

  const handleConfirm = async () => {
    setLoading(true);
    await options?.onConfirm?.();
    setLoading(false);
    close();
  };

  return (
    <AlertDialogContext.Provider value={{ open, close }}>
      {children}
      <AlertDialog.Root open={isOpen} onOpenChange={setIsOpen}>
        <AlertDialog.Content>
          <AlertDialog.Title className="text-lg font-bold">{options?.title}</AlertDialog.Title>
          {options?.description && (
            <AlertDialog.Description className="mt-2 text-sm">{options.description}</AlertDialog.Description>
          )}
          {options?.form}
          {!options?.disableAction && (
            <div className="mt-4 flex justify-end gap-2">
              <AlertDialog.Cancel>
                <Button variant="surface" onClick={close}>
                  {options?.cancelText || 'Cancel'}
                </Button>
              </AlertDialog.Cancel>

              <Button variant="surface" color="red" onClick={handleConfirm} loading={loading}>
                {options?.confirmText || 'Confirm'}
              </Button>
            </div>
          )}
        </AlertDialog.Content>
      </AlertDialog.Root>
    </AlertDialogContext.Provider>
  );
};

export const useAlertDialog = () => {
  const context = React.useContext(AlertDialogContext);
  if (!context) throw new Error('useAlertDialog must be used within AlertDialogProvider');
  return context;
};
