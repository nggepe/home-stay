'use client';

import { TrashIcon } from '@radix-ui/react-icons';
import { Button } from '@radix-ui/themes';
import { AlertDialogOptions, useAlertDialog } from './global-dialog';

interface ButtonDeleteProps {
  dialog: AlertDialogOptions;
}

export const ButtonDelete = ({ dialog }: ButtonDeleteProps) => {
  const alert = useAlertDialog();
  const handleOnclick = () => {
    alert.open(dialog);
  };
  return (
    <Button variant="surface" color="red" onClick={handleOnclick}>
      <TrashIcon />
    </Button>
  );
};
