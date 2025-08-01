'use client';

import { routes } from '@/configs/routes';
import { updateCustomer } from '@/repositories/customer-repository';
import { Customer } from '@/shared/types/customer-types';
import FormGroup from '@/shared/ui/forms/form-group';
import { useToast } from '@/shared/ui/providers/global-toast';
import { Box, Button, Card, Grid, TextField } from '@radix-ui/themes';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

interface UpdateCustomerFormProps {
  id: number;
  defaultValue: Pick<Customer, 'name' | 'phone'>;
}

export const UpdateCustomerForm = ({ id, defaultValue }: UpdateCustomerFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { showToast } = useToast();
  const router = useRouter();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<Pick<Customer, 'name' | 'phone'>>({ defaultValues: defaultValue });

  const handleOnSubmit = async (data: Pick<Customer, 'name' | 'phone'>) => {
    setIsSubmitting(true);
    await updateCustomer(id, {
      name: data.name,
      phone: data.phone,
    });
    setIsSubmitting(false);
    showToast('Customer created successfully', 'success');
    router.push(routes.customers.entry());
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
            <FormGroup error={errors.phone?.message}>
              <label htmlFor="phone">Phone</label>
              <TextField.Root
                color={errors.phone ? 'red' : 'green'}
                {...register('phone', { required: 'Phone is required' })}
                id="phone"
                type="text"
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
