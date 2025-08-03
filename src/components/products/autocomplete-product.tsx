'use client';

import { getProducts } from '@/repositories/product-repository';
import { Autocomplete } from '../../shared/ui/autocomplete/autocomplete';
import { Product } from '@/shared/types/product-types';
import { HTMLInputProps } from '@/shared/types/html-input';

type AutocompleteData = Product & { display: string };

interface AutocompleteProductProps {
  type?: Product['type'];
  placeholder?: string;
  onSelectedItem?: (item: AutocompleteData) => void;
  onRemoveItem?: () => void;
  removable?: boolean;
  showTypeOnDisplay?: boolean;
  inputProps?: HTMLInputProps;
}

export const AutocompleteProduct = ({
  type,
  placeholder,
  onSelectedItem,
  onRemoveItem,
  removable,
  showTypeOnDisplay,
  inputProps,
}: AutocompleteProductProps) => {
  const search = async (query: string) => {
    const { data } = await getProducts({ search: query, type });
    return data.map((e) => ({
      ...e,
      display: showTypeOnDisplay ? `${e.name} | ${e.type}` : e.name,
    }));
  };

  const onLoadMore = async (query: string, page: number) => {
    const { data } = await getProducts({ search: query, type, page: page.toString() });
    return data.map((e) => ({
      ...e,
      display: showTypeOnDisplay ? `${e.name} | ${e.type}` : e.name,
    }));
  };

  return (
    <Autocomplete<AutocompleteData>
      onSearch={search}
      renderItem={(item) => (showTypeOnDisplay ? `${item.name} | ${item.type}` : item.name)}
      placeholder={placeholder}
      removable={removable}
      onRemoveItem={onRemoveItem}
      onSelectedItem={onSelectedItem}
      onLoadMore={onLoadMore}
      inputProps={inputProps}
    />
  );
};
