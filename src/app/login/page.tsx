'use client';

import { Login } from '@/repositories/auth-repository';
import { EnvelopeClosedIcon, EyeClosedIcon, EyeOpenIcon, LockClosedIcon } from '@radix-ui/react-icons';
import { Button, Card, Container, Heading, TextField } from '@radix-ui/themes';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useToast } from '@/shared/ui/providers/global-toast';
import { toastError } from '@/utils/errors';

interface Inputs {
  email: string;
  password: string;
}

export default function Auth() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { handleSubmit, register } = useForm<Inputs>();
  const router = useRouter();
  const toast = useToast();

  const submit = async (data: Inputs) => {
    try {
      await Login(data.email, data.password);
      toast.showToast('Login berhasil', 'success');
      router.push('/');
    } catch (error) {
      toastError(error, toast);
    }
  };

  return (
    <Container size={'1'} className="h-full flex-col items-center justify-center">
      <Card>
        <form onSubmit={handleSubmit(submit)} autoComplete="on">
          <Heading as="h1" className="text-center">
            Login
          </Heading>
          <div className="mt-6 flex flex-col gap-2 justify-start">
            <TextField.Root
              {...register('email')}
              placeholder="john@email.com"
              type="email"
              required
              autoComplete="username"
              name="email"
            >
              <TextField.Slot>
                <EnvelopeClosedIcon />
              </TextField.Slot>
            </TextField.Root>
            <TextField.Root
              {...register('password')}
              placeholder="password"
              type={showPassword ? 'text' : 'password'}
              required
              autoComplete="current-password"
              name="password"
            >
              <TextField.Slot>
                <LockClosedIcon />
              </TextField.Slot>
              <TextField.Slot>
                <Button
                  variant="ghost"
                  type="button"
                  onClick={() => {
                    setShowPassword(!showPassword);
                  }}
                >
                  {showPassword ? <EyeClosedIcon /> : <EyeOpenIcon />}
                </Button>
              </TextField.Slot>
            </TextField.Root>
            <Button variant="classic" type="submit">
              Login
            </Button>
          </div>
        </form>
      </Card>
    </Container>
  );
}
