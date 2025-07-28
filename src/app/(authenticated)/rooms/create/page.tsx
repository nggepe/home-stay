import PageHeader from '@/shared/ui/pages-header';
import { CreateRoomForm } from './form';
import { breadCrumbItems } from '@/configs/breadcrumb-items';

export const metadata = {
  title: 'Create Room',
  description: 'Create a new room for booking',
};

const CreateRoomPage = () => {
  return (
    <>
      <PageHeader title="Create Room" breadcrumbs={{ items: breadCrumbItems.createRoom }} />
      <section>
        <CreateRoomForm />
      </section>
    </>
  );
};

export default CreateRoomPage;
