'use client';

import { getCustomers } from '@/repositories/customer-repository';
import { Customer } from '@/shared/types/customer-types';
import { Autocomplete } from '@/shared/ui/autocomplete/autocomplete';
import { Button } from '@radix-ui/themes';

type AutocompleteData = Customer & { display: string };
export const AutocompleteCustomers = () => {
  const search = async (query: string, page?: number) => {
    const { data } = await getCustomers({ search: query, page: page?.toString() });
    return data.map((e) => ({
      ...e,
      display: e.name,
    }));
  };

  return (
    <Autocomplete<AutocompleteData>
      onSearch={search}
      renderItem={(item) => item.display}
      onLoadMore={search}
      actions={
        <Button variant="soft" size={'1'}>
          New Customer
        </Button>
      }
    />
  );
};
