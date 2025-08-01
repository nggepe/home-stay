'use client';

import { Box, Grid } from '@radix-ui/themes';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { AutocompleteCustomers } from '../products/autocomplete-customers';

interface FormSalesProps {
  onSubmit: (data: FormInput) => void;
}

interface FormInput {
  customerId: string;
}

const FormSales: FC<FormSalesProps> = ({ onSubmit }) => {
  const { handleSubmit } = useForm<FormInput>();
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid columns={{ lg: '2', md: '1', sm: '1', xs: '1', xl: '3' }}>
        <Box>
          <AutocompleteCustomers />
        </Box>
      </Grid>
    </form>
  );
};

export default FormSales;
