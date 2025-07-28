import PageHeader from '@/shared/ui/pages-header';
import { CreateRoomForm } from './form';

export const metadata = {
  title: 'Create Room',
  description: 'Create a new room for booking',
};

const CreateRoomPage = () => {
  return (
    <>
      <PageHeader
        title="Create Room"
        breadcrumbs={{
          items: [
            { label: 'Home', href: '/' },
            { label: 'Rooms', href: '/rooms' },
            { label: 'Create Room', href: '/rooms/create', active: true },
          ],
        }}
      />
      <section>
        <CreateRoomForm />
      </section>
    </>
  );
};

export default CreateRoomPage;
