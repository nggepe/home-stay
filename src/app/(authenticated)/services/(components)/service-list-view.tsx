'use client';

import { routes } from '@/configs/routes';
import { deleteProduct } from '@/repositories/product-repository';
import { Product } from '@/shared/types/product-types';
import { ButtonDelete } from '@/shared/ui/buttons/buttons';
import { useToast } from '@/shared/ui/providers/global-toast';
import { ListView, ListViewData, ListViewHeaderCell } from '@/shared/ui/views/list-view';
import { Text } from '@radix-ui/themes';
import { useRouter } from 'next/navigation';
import { FC } from 'react';

interface ServiceListViewProps {
  headers: ListViewHeaderCell[];
  data: Product[];
}
export const ServiceListView: FC<ServiceListViewProps> = ({ headers, data }) => {
  const { showToast } = useToast();
  const router = useRouter();
  const handleDelete = async (id: number) => {
    await deleteProduct(id);
    showToast('Data has been deleted', 'success');
    router.refresh();
  };
  const renderData: ListViewData[] = data.map((item) => ({
    name: item.name,
    price: (
      <Text className="text-end w-full" as="div">
        {item.price}
      </Text>
    ),
    description: item.description,
    action: (
      <div className="flex justify-end">
        <ButtonDelete
          dialog={{
            title: 'Delete Service',
            description: 'Are you sure you want to delete this service?',
            confirmText: 'Delete',
            cancelText: 'Cancel',
            onConfirm: async () => {
              await handleDelete(item.id!);
            },
          }}
        />
      </div>
    ),
    detailRoute: routes.services.detail(item.id!).entry,
  }));
  return (
    <>
      <ListView<ListViewData> headers={headers} data={renderData} />
    </>
  );
};
