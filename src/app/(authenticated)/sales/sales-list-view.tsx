'use client';

import { routes } from '@/configs/routes';
import { AllAsReactNode } from '@/shared/types/all-react-node';
import { Sales } from '@/shared/types/sales-types';
import { ButtonDelete } from '@/shared/ui/buttons/buttons';
import { ListView, ListViewData, ListViewHeaderCell } from '@/shared/ui/views/list-view';
import { FC } from 'react';

export interface SalesListViewTable {
  data: Sales[];
}

type SalesListViewData = ListViewData & AllAsReactNode<Sales>;
export const SalesListView: FC<SalesListViewTable> = ({ data }) => {
  const headers: ListViewHeaderCell[] = [
    { label: 'Customer', key: 'customer' },
    { label: 'Booked At', key: 'bookedAt' },
    { label: 'Total', key: 'grandTotal' },
    { label: '', key: 'action' },
  ];

  const sales: SalesListViewData[] = data.map((item) => ({
    detailRoute: routes.sales.detail(item.id).entry,
    bookedAt: item.bookedAt?.toLocaleDateString(),
    customer: item.customer?.name,
    customerId: item.customerId,
    grandTotal: item.grandTotal,
    createdAt: item.createdAt?.toLocaleDateString(),
    updatedAt: item.updatedAt?.toLocaleDateString(),
    id: item.id,
    action: (
      <div className="flex justify-end">
        <ButtonDelete
          dialog={{
            title: 'Delete Sales',
            description: 'Are you sure you want to delete this sales?',
            confirmText: 'Delete',
            cancelText: 'Cancel',
            onConfirm: async () => {
              // await handleDelete(item.id!);
            },
          }}
        />
      </div>
    ),
  }));

  return <ListView<SalesListViewData> headers={headers} data={sales} />;
};
