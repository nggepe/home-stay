import { breadCrumbItems } from '@/configs/breadcrumb-items';
import PageHeader from '@/shared/ui/pages-header';
import { Card } from '@radix-ui/themes';

export const metadata = {
  title: 'Rooms',
  description: 'List of rooms available for booking',
};

const Page = () => {
  return (
    <>
      <PageHeader
        title="Rooms"
        breadcrumbs={{
          items: breadCrumbItems.rooms,
        }}
      />
      <Card>Hello</Card>
    </>
  );
};

export default Page;
