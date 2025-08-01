'use client';

import { updateUser } from '@/repositories/user-repository';
import { useToast } from '@/shared/hooks/use-toast';
import FormGroup from '@/shared/ui/forms/form-group';
import { toastError } from '@/utils/errors';
import { Cross1Icon } from '@radix-ui/react-icons';
import { AlertDialog, Button, Flex, TextField } from '@radix-ui/themes';
import { FC, ReactNode, useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';

interface DialogProps {
  trigger: ReactNode;
  userId: number;
}

interface UserPassword {
  password: string;
  confirmPassword: string;
}

export const DialogResetPassword: FC<DialogProps> = ({ trigger, userId }) => {
  const [open, setOpen] = useState(false);
  const [loading, startTransition] = useTransition();
  const toast = useToast();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<UserPassword>();

  const handleOnSubmit = (data: UserPassword) => {
    startTransition(async () => {
      try {
        await updateUser(userId, { password: data.password });
        startTransition(() => {
          setOpen(false);
          toast.showToast('Password reset successfully');
        });
      } catch (error) {
        toastError(error, toast);
      }
    });
  };

  const password = watch('password');

  return (
    <AlertDialog.Root open={open} onOpenChange={setOpen}>
      <AlertDialog.Trigger>{trigger}</AlertDialog.Trigger>
      <AlertDialog.Content maxWidth={'600px'}>
        <div>
          <Flex justify={'between'}>
            <AlertDialog.Title>Reset Password</AlertDialog.Title>
            <AlertDialog.Cancel>
              <Button variant="ghost">
                <Cross1Icon />
              </Button>
            </AlertDialog.Cancel>
          </Flex>
          <AlertDialog.Description size={'2'}>
            You can change user&#39;s password here. Please note that you need to enter the current password to change
            the password.
          </AlertDialog.Description>
          <form onSubmit={handleSubmit(handleOnSubmit)}>
            <FormGroup error={errors.password?.message}>
              <label htmlFor="password">Password</label>
              <TextField.Root
                {...register('password', { required: 'Password is required' })}
                id="password"
                type="password"
              ></TextField.Root>
            </FormGroup>
            <FormGroup error={errors.confirmPassword?.message}>
              <label htmlFor="confirmPassword">Confirm Password</label>
              <TextField.Root
                {...register('confirmPassword', {
                  required: 'Confirm password is required',
                  validate: (value) => value === password || "Password doesn't match",
                })}
                id="confirmPassword"
                type="password"
              ></TextField.Root>
            </FormGroup>
            <Flex justify={'between'}>
              <AlertDialog.Cancel>
                <Button variant="outline">Cancel</Button>
              </AlertDialog.Cancel>
              <Button variant="classic" type="submit" loading={loading}>
                Reset Password
              </Button>
            </Flex>
          </form>
        </div>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
};
