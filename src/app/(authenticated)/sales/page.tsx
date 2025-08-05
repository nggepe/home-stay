import { routes } from '@/configs/routes';
import PageHeader from '@/shared/ui/navigation/pages-header';
import { ListViewAction, ListViewPagination, ListViewWrapper } from '@/shared/ui/views/list-view';
import { Button } from '@radix-ui/themes';
import Link from 'next/link';
import { SalesListView } from './sales-list-view';
import { PageProps } from '@/shared/types/page-types';
import { getSales } from '@/repositories/sales-repository';

export const metadata = {
  title: 'Sales',
  description: 'List of all sales',
};

const SalesPage = async ({ searchParams }: PageProps) => {
  const params = await searchParams;

  const { data, pagination } = await getSales({
    ...params,
  });

  return (
    <>
      <PageHeader
        title="Sales"
        breadcrumbs={{
          items: [
            {
              label: 'Home',
              href: routes.home.entry(),
            },
            {
              label: 'Sales',
              href: routes.sales.entry(),
              active: true,
            },
          ],
        }}
        actions={[
          <Link href={routes.sales.create.entry()} key={'create'}>
            <Button variant="classic">New Sales</Button>
          </Link>,
        ]}
      />
      <ListViewWrapper>
        <ListViewAction>
          <ListViewPagination pagination={pagination} />
        </ListViewAction>
        <SalesListView data={data} />
      </ListViewWrapper>
    </>
  );
};

export default SalesPage;
