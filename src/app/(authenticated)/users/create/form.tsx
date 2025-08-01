'use client';

import { routes } from '@/configs/routes';
import { createUser } from '@/repositories/user-repository';
import FormGroup from '@/shared/ui/forms/form-group';
import { useToast } from '@/shared/ui/providers/global-toast';
import { Box, Button, Card, Grid, TextField } from '@radix-ui/themes';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
type CreateUserFormData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export const CreateUserForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { showToast } = useToast();
  const router = useRouter();

  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm<CreateUserFormData>();

  const handleOnSubmit = async (data: CreateUserFormData) => {
    setIsSubmitting(true);
    await createUser(data);
    setIsSubmitting(false);
    showToast('User created successfully', 'success');
    router.push(routes.users.entry());
  };

  const password = watch('password');

  return (
    <form onSubmit={handleSubmit(handleOnSubmit)}>
      <Card>
        <Grid columns={{ xs: '1', sm: '1', md: '2', lg: '2', xl: '2' }} gap={'3'}>
          <Box>
            <FormGroup error={errors.name?.message}>
              <label htmlFor="name">Name</label>
              <TextField.Root
                color={errors.name ? 'red' : 'green'}
                {...register('name', { required: 'Name is required' })}
                id="name"
              ></TextField.Root>
            </FormGroup>
          </Box>
          <Box>
            <FormGroup error={errors.email?.message}>
              <label htmlFor="email">Email</label>
              <TextField.Root
                color={errors.email ? 'red' : 'green'}
                {...register('email', { required: 'Email is required' })}
                id="email"
                type="email"
              ></TextField.Root>
            </FormGroup>
          </Box>
          <Box>
            <FormGroup error={errors.password?.message}>
              <label htmlFor="password">Password</label>
              <TextField.Root
                color={errors.password ? 'red' : 'green'}
                {...register('password', { required: 'Password is required' })}
                id="password"
                type="password"
              ></TextField.Root>
            </FormGroup>
          </Box>
          <Box>
            <FormGroup error={errors.confirmPassword?.message}>
              <label htmlFor="confirmPassword">Confirm Password</label>
              <TextField.Root
                color={errors.confirmPassword ? 'red' : 'green'}
                {...register('confirmPassword', {
                  required: 'Confirm Password is required',
                  validate: (value) => value === password || 'Passwords do not match',
                })}
                id="confirmPassword"
                type="password"
              ></TextField.Root>
            </FormGroup>
          </Box>
        </Grid>
        <div className="text-end">
          <Button type="submit" loading={isSubmitting}>
            Save
          </Button>
        </div>
      </Card>
    </form>
  );
};
