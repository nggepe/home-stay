'use client';

import { FormCustomer } from '@/components/customers/form-customer';
import { routes } from '@/configs/routes';
import { createCustomer } from '@/repositories/customer-repository';
import { Customer } from '@/shared/types/customer-types';
import { useToast } from '@/shared/ui/providers/global-toast';
import { toastError } from '@/utils/errors';
import { Card } from '@radix-ui/themes';
import { useRouter } from 'next/navigation';

export const CreateCustomerForm = () => {
  const toast = useToast();
  const router = useRouter();

  const handleOnSubmit = async (data: Pick<Customer, 'name' | 'phone'>) => {
    try {
      await createCustomer({
        name: data.name,
        phone: data.phone,
      });

      toast.showToast('Customer created successfully', 'success');
      router.push(routes.customers.entry());
    } catch (error) {
      toastError(error, toast);
    }
  };

  return (
    <Card>
      <FormCustomer submit={handleOnSubmit} />
    </Card>
  );
};
