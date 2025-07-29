import { breadCrumbItems } from '@/configs/breadcrumb-items';
import PageHeader from '@/shared/ui/navigation/pages-header';
import { ListViewAction, ListViewHeaderCell, ListViewPagination, ListViewWrapper } from '@/shared/ui/views/list-view';
import { getProducts } from '@/repositories/product-repository';
import { Button } from '@radix-ui/themes';
import Link from 'next/link';
import { routes } from '@/configs/routes';
import { RoomListView } from './(components)/room-list-view';

export const metadata = {
  title: 'Rooms',
  description: 'List of rooms available for booking',
};

interface PageProps {
  searchParams: Record<string, string | string[] | undefined>;
}

const Page = async ({ searchParams }: PageProps) => {
  const params = await searchParams;
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
    {
      key: 'action',
      label: '',
    },
  ];

  return (
    <>
      <PageHeader
        title="Rooms"
        breadcrumbs={{
          items: breadCrumbItems.rooms,
        }}
        actions={[
          <Link href={routes.rooms.create.entry()} key={'create'}>
            <Button variant="classic">New Room</Button>
          </Link>,
        ]}
      />
      <ListViewWrapper>
        <ListViewAction>
          <ListViewPagination pagination={pagination} />
        </ListViewAction>
        <RoomListView headers={headers} data={data} />
      </ListViewWrapper>
    </>
  );
};

export default Page;
