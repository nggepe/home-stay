'use client';

import { Login } from '@/repositories/auth-repository';
import { EnvelopeClosedIcon, EyeClosedIcon, EyeOpenIcon, LockClosedIcon } from '@radix-ui/react-icons';
import { Button, Card, Checkbox, Container, Heading, TextField } from '@radix-ui/themes';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useToast } from '@/shared/ui/providers/global-toast';
import { toastError } from '@/utils/errors';
import FormGroup from '@/shared/ui/forms/form-group';

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
          <div className="mt-6">
            <FormGroup>
              <label htmlFor="email">Email</label>
              <TextField.Root
                {...register('email')}
                placeholder="john@email.com"
                type="email"
                required
                autoComplete="email"
                name="email"
                id="email"
              >
                <TextField.Slot>
                  <EnvelopeClosedIcon />
                </TextField.Slot>
              </TextField.Root>
            </FormGroup>
            <label htmlFor="password">Password</label>
            <FormGroup>
              <TextField.Root
                {...register('password')}
                placeholder="password"
                type={showPassword ? 'text' : 'password'}
                required
                autoComplete="current-password"
                name="password"
                id="password"
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
            </FormGroup>
            <FormGroup>
              <div className="flex justify-start align-middle items-center gap-4">
                <Checkbox checked id="remember"></Checkbox>
                <label htmlFor="remember">Remember me</label>
              </div>
            </FormGroup>
            <Button style={{ width: '100%' }} variant="classic" type="submit" className="w-full">
              Login
            </Button>
          </div>
        </form>
      </Card>
    </Container>
  );
}
