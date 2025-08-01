'use client';

import FormSales from '@/components/sales/form-sales';

type FormSalesProps = React.ComponentProps<typeof FormSales>;
type FormInput = Parameters<NonNullable<FormSalesProps['onSubmit']>>[0];

export const CreateSalesForm = () => {
  const onSubmit = (data: FormInput) => {
    console.log(data);
  };
  return <FormSales onSubmit={onSubmit} />;
};
