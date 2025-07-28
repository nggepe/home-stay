import { breadCrumbItems } from '@/configs/breadcrumb-items';
import PageHeader from '@/shared/ui/pages-header';
import {
  ListView,
  ListViewAction,
  ListViewData,
  ListViewHeaderCell,
  ListViewKanban,
  ListViewPagination,
  ListViewTable,
} from '@/shared/ui/list-view';
import { getProducts } from '@/repositories/product-repository';
import { Button } from '@radix-ui/themes';
import Link from 'next/link';

export const metadata = {
  title: 'Rooms',
  description: 'List of rooms available for booking',
};

interface PageProps {
  searchParams: Record<string, string | string[] | undefined>;
}

const Page = async ({ searchParams }: PageProps) => {
  const params = await searchParams;
  console.log('you found search params', params);
  const { pagination, data } = await getProducts({ ...params, type: 'ROOM' });

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
  ];

  const renderData: ListViewData[] = data.map((item) => ({
    name: item.name,
    price: item.price,
    description: item.description,
  }));

  return (
    <>
      <PageHeader
        title="Rooms"
        breadcrumbs={{
          items: breadCrumbItems.rooms,
        }}
        actions={[
          <Link href={'/rooms/create'} key={'create'}>
            <Button variant="classic">New Room</Button>
          </Link>,
        ]}
      />
      <ListView>
        <ListViewAction>
          <ListViewPagination pagination={pagination} />
        </ListViewAction>
        <ListViewTable<ListViewData> headers={headers} data={renderData} />
        <ListViewKanban<ListViewData> headers={headers} data={renderData} />
      </ListView>
    </>
  );
};

export default Page;
