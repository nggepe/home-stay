import { breadCrumbItems } from '@/configs/breadcrumb-items';
import PageHeader from '@/shared/ui/navigation/pages-header';
import { ListViewAction, ListViewHeaderCell, ListViewPagination, ListViewWrapper } from '@/shared/ui/views/list-view';
import { getProducts } from '@/repositories/product-repository';
import { Button } from '@radix-ui/themes';
import Link from 'next/link';
import { routes } from '@/configs/routes';
import { ServiceListView } from './(components)/service-list-view';

export const metadata = {
  title: 'Services',
  description: 'List of services available for booking',
};

interface PageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

const Page = async ({ searchParams }: PageProps) => {
  const params = await searchParams;
  const { pagination, data } = await getProducts({ ...params, type: 'SERVICE' });

  const headers: ListViewHeaderCell[] = [
    {
      key: 'name',
      label: 'Name',
    },
    {
      key: 'price',
      label: 'Price (Rp)',
      className: 'text-end',
    },
    {
      key: 'description',
      label: 'Description',
    },
    {
      key: 'action',
      label: '',
    },
  ];

  return (
    <>
      <PageHeader
        title="Services"
        breadcrumbs={{
          items: breadCrumbItems.services,
        }}
        actions={[
          <Link href={routes.services.create.entry()} key={'create'}>
            <Button variant="classic">New Service</Button>
          </Link>,
        ]}
      />
      <ListViewWrapper>
        <ListViewAction>
          <ListViewPagination pagination={pagination} />
        </ListViewAction>
        <ServiceListView headers={headers} data={data} />
      </ListViewWrapper>
    </>
  );
};

export default Page;
