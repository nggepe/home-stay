'use client';

import { getProducts } from '@/repositories/product-repository';
import { Autocomplete } from '../../shared/ui/autocomplete/autocomplete';
import { Product } from '@/shared/types/product-types';

type AutocompleteData = Product & { display: string };

interface AutocompleteProductProps {
  type?: Product['type'];
  placeholder?: string;
  onSelectedItem?: (item: AutocompleteData) => void;
  onRemoveItem?: () => void;
  removable?: boolean;
}

export const AutocompleteProduct = ({
  type,
  placeholder,
  onSelectedItem,
  onRemoveItem,
  removable,
}: AutocompleteProductProps) => {
  const search = async (query: string) => {
    const { data } = await getProducts({ search: query, type });
    return data.map((e) => ({
      ...e,
      display: e.name,
    }));
  };

  const onLoadMore = async (query: string, page: number) => {
    const { data } = await getProducts({ search: query, type, page: page.toString() });
    return data.map((e) => ({
      ...e,
      display: e.name,
    }));
  };

  return (
    <Autocomplete<AutocompleteData>
      onSearch={search}
      renderItem={(item) => item.name}
      placeholder={placeholder}
      removable={removable}
      onRemoveItem={onRemoveItem}
      onSelectedItem={onSelectedItem}
      onLoadMore={onLoadMore}
    />
  );
};
