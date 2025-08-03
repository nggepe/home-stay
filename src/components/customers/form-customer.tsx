'use client';

import { Customer } from '@/shared/types/customer-types';
import FormGroup from '@/shared/ui/forms/form-group';
import { Box, Button, Grid, TextField } from '@radix-ui/themes';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';

interface FormCustomerProps {
  defaultValue?: Pick<Customer, 'name' | 'phone'>;
  submit: (data: Pick<Customer, 'name' | 'phone'>) => Promise<void>;
}

export const FormCustomer = ({ defaultValue, submit }: FormCustomerProps) => {
  const [isSubmitting, startTransition] = useTransition();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<Pick<Customer, 'name' | 'phone'>>({ defaultValues: defaultValue });

  const handleOnSubmit = async (data: Pick<Customer, 'name' | 'phone'>) => {
    startTransition(async () => {
      await submit(data);
    });
  };

  return (
    <form onSubmit={handleSubmit(handleOnSubmit)}>
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
    </form>
  );
};
