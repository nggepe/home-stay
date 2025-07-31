'use client';

import { getProducts } from '@/repositories/product-repository';
import { Autocomplete } from './autocomplete';
import { Product } from '@/shared/types/product-types';

export const AutocompleteRoom = () => {
  const search = async (query: string) => {
    const { data } = await getProducts({ search: query, type: 'ROOM' });
    return data.map((e) => ({
      ...e,
      display: e.name,
    }));
  };

  const onLoadMore = async (query: string, page: number) => {
    const { data } = await getProducts({ search: query, type: 'ROOM', page: page.toString() });
    return data.map((e) => ({
      ...e,
      display: e.name,
    }));
  };

  return (
    <Autocomplete<Product & { display: string }>
      onSearch={search}
      renderItem={(item) => item.name}
      placeholder="Search room"
      removable
      onRemoveItem={() => {
        console.log('item removed');
      }}
      onSelectedItem={(item) => {
        console.log('item selected', item);
      }}
      onLoadMore={onLoadMore}
    />
  );
};
