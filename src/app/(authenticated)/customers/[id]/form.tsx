'use client';

import { FormCustomer } from '@/components/customers/form-customer';
import { routes } from '@/configs/routes';
import { updateCustomer } from '@/repositories/customer-repository';
import { Customer } from '@/shared/types/customer-types';
import { useToast } from '@/shared/ui/providers/global-toast';
import { toastError } from '@/utils/errors';
import { useRouter } from 'next/navigation';

interface UpdateCustomerFormProps {
  id: number;
  defaultValue: Pick<Customer, 'name' | 'phone'>;
}

export const UpdateCustomerForm = ({ id, defaultValue }: UpdateCustomerFormProps) => {
  const toast = useToast();
  const router = useRouter();

  const handleOnSubmit = async (data: Pick<Customer, 'name' | 'phone'>) => {
    try {
      await updateCustomer(id, {
        name: data.name,
        phone: data.phone,
      });
      toast.showToast('Customer updated successfully', 'success');
      router.push(routes.customers.entry());
    } catch (error) {
      toastError(error, toast);
    }
  };

  return <FormCustomer defaultValue={defaultValue} submit={handleOnSubmit} />;
};
