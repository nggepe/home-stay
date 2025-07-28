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
import { Button, Text } from '@radix-ui/themes';
import Link from 'next/link';
import { TrashIcon } from '@radix-ui/react-icons';
import { routes } from '@/configs/routes';

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
  console.log(pagination);

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

  const renderData: ListViewData[] = data.map((item) => ({
    name: item.name,
    price: (
      <Text className="text-end w-full" as="div">
        {item.price}
      </Text>
    ),
    description: item.description,
    action: (
      <div className="flex justify-end">
        <Button variant="surface" color="red">
          <TrashIcon />
        </Button>
      </div>
    ),
    detailRoute: routes.rooms.detail(item.id!).entry,
  }));

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
