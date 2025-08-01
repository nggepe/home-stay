'use client';

import { routes } from '@/configs/routes';
import { updateUser } from '@/repositories/user-repository';
import FormGroup from '@/shared/ui/forms/form-group';
import { useToast } from '@/shared/ui/providers/global-toast';
import { Box, Button, Card, Grid, TextField } from '@radix-ui/themes';
import { useRouter } from 'next/navigation';
import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
type UpdateUserFormData = {
  name: string;
  email: string;
};

interface UpdateUserFormProps {
  id: number;
  defaultValues: UpdateUserFormData;
}

export const UpdateUserForm: FC<UpdateUserFormProps> = ({ id, defaultValues }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { showToast } = useToast();
  const router = useRouter();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<UpdateUserFormData>({ defaultValues: defaultValues });

  const handleOnSubmit = async (data: UpdateUserFormData) => {
    setIsSubmitting(true);
    await updateUser(id, data);
    setIsSubmitting(false);
    showToast('User updated successfully', 'success');
    router.push(routes.users.entry());
  };

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
