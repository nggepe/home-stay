'use client';

import { routes } from '@/configs/routes';
import { deleteSales } from '@/repositories/sales-repository';
import { useToast } from '@/shared/hooks/use-toast';
import { AllAsReactNode } from '@/shared/types/all-react-node';
import { Sales } from '@/shared/types/sales-types';
import { ButtonDelete } from '@/shared/ui/buttons/buttons';
import { ListView, ListViewData, ListViewHeaderCell } from '@/shared/ui/views/list-view';
import { toastError } from '@/utils/errors';
import { useRouter } from 'next/navigation';
import { FC } from 'react';
import { format } from 'date-fns';
import { enUS } from 'date-fns/locale';
import { Button } from '@radix-ui/themes';
import Link from 'next/link';

export interface SalesListViewTable {
  data: Sales[];
}

type SalesListViewData = ListViewData & AllAsReactNode<Sales>;
export const SalesListView: FC<SalesListViewTable> = ({ data }) => {
  const toast = useToast();
  const router = useRouter();
  const headers: ListViewHeaderCell[] = [
    { label: 'Code', key: 'code' },
    { label: 'Customer', key: 'customer' },
    { label: 'Booked At', key: 'bookedAt' },
    { label: 'Created At', key: 'createdAt' },
    { label: 'Updated At', key: 'updatedAt' },
    { label: 'Total', key: 'grandTotal' },
    { label: '', key: 'action' },
  ];

  const handleDelete = async (id: number) => {
    try {
      await deleteSales(id);
      toast.showToast('Sales deleted successfully');
      router.refresh();
    } catch (error) {
      toastError(error, toast);
    }
  };

  const sales: SalesListViewData[] = data.map((item) => ({
    detailRoute: routes.sales.detail(item.id).entry,
    code: item.code,
    bookedAt: item.bookedAt ? format(item.bookedAt, 'dd MMMM yyyy', { locale: enUS }) : '-',
    customer: item.customer?.name,
    customerId: item.customerId,
    grandTotal: item.grandTotal,
    createdAt: item.createdAt ? format(item.createdAt, 'dd MMMM yyyy', { locale: enUS }) : '-',
    updatedAt: item.updatedAt ? format(item.updatedAt, 'dd MMMM yyyy', { locale: enUS }) : '-',
    id: item.id,
    action: (
      <div className="flex justify-end">
        <Link href={`/api/sales/${item.id}`} target="_blank">
          <Button variant="soft">PDF</Button>
        </Link>
        <ButtonDelete
          dialog={{
            title: 'Delete Sales',
            description: 'Are you sure you want to delete this sales?',
            confirmText: 'Delete',
            cancelText: 'Cancel',
            onConfirm: async () => {
              await handleDelete(item.id!);
            },
          }}
        />
      </div>
    ),
  }));

  return <ListView<SalesListViewData> headers={headers} data={sales} />;
};
