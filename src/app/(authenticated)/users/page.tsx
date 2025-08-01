import { routes } from '@/configs/routes';
import PageHeader from '@/shared/ui/navigation/pages-header';
import { ListViewAction, ListViewHeaderCell, ListViewPagination, ListViewWrapper } from '@/shared/ui/views/list-view';
import { UserListView } from './(components)/user-list-view';
import { getUsers } from '@/repositories/user-repository';
import Link from 'next/link';
import { Button } from '@radix-ui/themes';

export const metadata = {
  title: 'Users',
  description: 'List of users',
};
interface PageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

const UsersPage = async ({ searchParams }: PageProps) => {
  const params = await searchParams;

  const headers: ListViewHeaderCell[] = [
    {
      label: 'Name',
      key: 'name',
    },
    {
      label: 'Email',
      key: 'email',
    },
    {
      label: 'Created At',
      key: 'createdAt',
    },
    {
      label: 'Updated At',
      key: 'updatedAt',
    },
    {
      label: '',
      key: 'action',
    },
  ];

  const { pagination, data } = await getUsers(params);

  return (
    <>
      <PageHeader
        title="Users"
        breadcrumbs={{
          items: [
            { label: 'Home', href: routes.home.entry() },
            { label: 'Users', href: routes.users.entry(), active: true },
          ],
        }}
        actions={[
          <Link href={routes.users.create.entry()} key={'create'}>
            <Button variant="classic">New User</Button>
          </Link>,
        ]}
      />
      <ListViewWrapper>
        <ListViewAction>
          <ListViewPagination pagination={pagination} />
        </ListViewAction>
        <UserListView headers={headers} data={data} />
      </ListViewWrapper>
    </>
  );
};

export default UsersPage;
