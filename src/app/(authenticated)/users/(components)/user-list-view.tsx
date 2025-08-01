'use client';

import { routes } from '@/configs/routes';
import { deleteUser, User } from '@/repositories/user-repository';
import { ButtonDelete } from '@/shared/ui/buttons/buttons';
import { useToast } from '@/shared/ui/providers/global-toast';
import { ListView, ListViewData, ListViewHeaderCell } from '@/shared/ui/views/list-view';
import { toastError } from '@/utils/errors';
import { useRouter } from 'next/navigation';
import { FC } from 'react';

interface UserListViewProps {
  headers: ListViewHeaderCell[];
  data: User[];
}
export const UserListView: FC<UserListViewProps> = ({ headers, data }) => {
  const toast = useToast();
  const router = useRouter();
  const handleDelete = async (id: number) => {
    try {
      await deleteUser(id);
      toast.showToast('Data has been deleted', 'success');
      router.refresh();
    } catch (error) {
      toastError(error, toast);
    }
  };
  const renderData: ListViewData[] = data.map((item) => ({
    name: item.name,
    email: item.email,
    createdAt: item.createdAt?.toLocaleString(),
    updatedAt: item.updatedAt?.toLocaleString(),
    action: (
      <div className="flex justify-end">
        <ButtonDelete
          dialog={{
            title: 'Delete User',
            description: 'Are you sure you want to delete this user?',
            confirmText: 'Delete',
            cancelText: 'Cancel',
            onConfirm: async () => {
              await handleDelete(item.id);
            },
          }}
        />
      </div>
    ),
    detailRoute: routes.users.detail(item.id).entry,
  }));
  return (
    <>
      <ListView<ListViewData> headers={headers} data={renderData} />
    </>
  );
};
