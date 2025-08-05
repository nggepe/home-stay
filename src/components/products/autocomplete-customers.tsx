'use client';

import { createCustomer, getCustomers } from '@/repositories/customer-repository';
import { Customer } from '@/shared/types/customer-types';
import { Autocomplete, AutocompleteProps } from '@/shared/ui/autocomplete/autocomplete';
import { Button, Dialog } from '@radix-ui/themes';
import { FormCustomer } from '../customers/form-customer';
import { useToast } from '@/shared/hooks/use-toast';
import { toastError } from '@/utils/errors';
import { FC, useState } from 'react';

type AutocompleteData = Customer & { display: string };

export type AutocompleteCustomersProps = Omit<
  AutocompleteProps<AutocompleteData>,
  'onSearch' | 'onLoadMore' | 'renderItem' | 'actions'
>;

export const AutocompleteCustomers: FC<AutocompleteCustomersProps> = ({
  errorMessage,
  inputProps,
  onSelectedItem,
  placeholder,
  removable,
  onRemoveItem,
  ...props
}) => {
  const [openCreate, setOpenCreate] = useState<boolean>(false);
  const toast = useToast();
  const search = async (query: string, page?: number) => {
    const { data } = await getCustomers({ search: query, page: page?.toString() });
    return data.map((e) => ({
      ...e,
      display: `${e.name} (${e.phone})`,
    }));
  };

  const handleCreateCustomer = async (data: Pick<Customer, 'name' | 'phone'>) => {
    try {
      await createCustomer(data);
      toast.showToast('Customer created successfully');

      setOpenCreate(false);
    } catch (error) {
      toastError(error, toast);
    }
  };

  return (
    <Autocomplete<AutocompleteData>
      {...props}
      onSearch={search}
      renderItem={(item) => item.display}
      onLoadMore={search}
      actions={
        <Dialog.Root open={openCreate} onOpenChange={setOpenCreate}>
          <Dialog.Trigger>
            <Button variant="soft" size={'1'}>
              New Customer
            </Button>
          </Dialog.Trigger>
          <Dialog.Content>
            <Dialog.Title>Create New Customer</Dialog.Title>
            <Dialog.Description>Please fill in the customer information to create a new customer.</Dialog.Description>
            <FormCustomer submit={handleCreateCustomer} />
          </Dialog.Content>
        </Dialog.Root>
      }
      errorMessage={errorMessage}
      inputProps={inputProps}
      onSelectedItem={onSelectedItem}
      placeholder={placeholder}
      removable={removable}
      onRemoveItem={onRemoveItem}
    />
  );
};
