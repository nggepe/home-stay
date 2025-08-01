'use client';

import { routes } from '@/configs/routes';
import { deleteCustomer } from '@/repositories/customer-repository';
import { Customer } from '@/shared/types/customer-types';
import { ButtonDelete } from '@/shared/ui/buttons/buttons';
import { useToast } from '@/shared/ui/providers/global-toast';
import { ListView, ListViewData, ListViewHeaderCell } from '@/shared/ui/views/list-view';
import { Text } from '@radix-ui/themes';
import { useRouter } from 'next/navigation';
import { FC } from 'react';

interface CustomerListViewProps {
  headers: ListViewHeaderCell[];
  data: Customer[];
}
export const CustomerListView: FC<CustomerListViewProps> = ({ headers, data }) => {
  const { showToast } = useToast();
  const router = useRouter();
  const handleDelete = async (id: number) => {
    await deleteCustomer(id);
    showToast('Data has been deleted', 'success');
    router.refresh();
  };
  const renderData: ListViewData[] = data.map((item) => ({
    name: item.name,
    phone: (
      <Text className="w-full" as="div">
        {item.phone}
      </Text>
    ),
    createdAt: item.createdAt?.toLocaleDateString(),
    updatedAt: item.updatedAt?.toLocaleDateString(),
    action: (
      <div className="flex justify-end">
        <ButtonDelete
          dialog={{
            title: 'Delete Customer',
            description: 'Are you sure you want to delete this customer?',
            confirmText: 'Delete',
            cancelText: 'Cancel',
            onConfirm: async () => {
              await handleDelete(item.id!);
            },
          }}
        />
      </div>
    ),
    detailRoute: routes.customers.detail(item.id!).entry,
  }));
  return (
    <>
      <ListView<ListViewData> headers={headers} data={renderData} />
    </>
  );
};
