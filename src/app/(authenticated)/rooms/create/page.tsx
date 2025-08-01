import PageHeader from '@/shared/ui/navigation/pages-header';
import { CreateRoomForm } from './form';
import { routes } from '@/configs/routes';

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
            { label: 'Home', href: routes.home.entry() },
            { label: 'Rooms', href: routes.rooms.entry() },
            { label: 'Create Room', href: routes.rooms.create.entry(), active: true },
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
