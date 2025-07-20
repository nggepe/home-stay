import { breadCrumbItems } from '@/configs/breadcrumb-items';
import { Room } from '@/shared/types/room-types';
import PageHeader from '@/shared/ui/pages-header';
import { ListView } from '@/shared/ui/list-view';

export const metadata = {
  title: 'Rooms',
  description: 'List of rooms available for booking',
};

const Page = async () => {
  const headers = [
    {
      key: 'name',
      label: 'Name',
    },
  ];

  const data: Room[] = [
    {
      id: 1,
      name: 'Room 1',
      price: 100,
      description: 'A cozy room with a beautiful view',
      capacity: 2,
    },
  ];
  return (
    <>
      <PageHeader
        title="Rooms"
        breadcrumbs={{
          items: breadCrumbItems.rooms,
        }}
      />
      <ListView headers={headers} data={data} />
    </>
  );
};

export default Page;
