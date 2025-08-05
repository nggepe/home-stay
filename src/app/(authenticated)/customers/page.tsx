import PageHeader from '@/shared/ui/navigation/pages-header';
import { ListViewAction, ListViewHeaderCell, ListViewPagination, ListViewWrapper } from '@/shared/ui/views/list-view';
import { getCustomers } from '@/repositories/customer-repository';
import { Button } from '@radix-ui/themes';
import Link from 'next/link';
import { routes } from '@/configs/routes';
import { CustomerListView } from './(components)/customer-list-view';
import { PageProps } from '@/shared/types/page-types';

export const metadata = {
  title: 'Customers',
  description: 'List of customers available for booking',
};

const Page = async ({ searchParams }: PageProps) => {
  const params = await searchParams;
  const { pagination, data } = await getCustomers({ ...params });

  const headers: ListViewHeaderCell[] = [
    {
      key: 'name',
      label: 'Name',
    },
    {
      key: 'phone',
      label: 'Phone Number',
    },
    {
      key: 'action',
      label: '',
    },
  ];

  return (
    <>
      <PageHeader
        title="Customers"
        breadcrumbs={{
          items: [
            { label: 'Home', href: routes.home.entry() },
            { label: 'Customers', href: routes.customers.entry(), active: true },
          ],
        }}
        actions={[
          <Link href={routes.customers.create.entry()} key={'create'}>
            <Button variant="classic">New Customer</Button>
          </Link>,
        ]}
      />
      <ListViewWrapper>
        <ListViewAction>
          <ListViewPagination pagination={pagination} />
        </ListViewAction>
        <CustomerListView headers={headers} data={data} />
      </ListViewWrapper>
    </>
  );
};

export default Page;
