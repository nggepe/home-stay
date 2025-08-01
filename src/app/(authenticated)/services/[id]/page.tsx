import { getProduct } from '@/repositories/product-repository';
import PageHeader from '@/shared/ui/navigation/pages-header';
import { UpdateServiceForm } from './form';
import { routes } from '@/configs/routes';

export const metadata = {
  title: 'Room Details',
  description: 'Details of a room',
};

interface RoomDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

const RoomDetailsPage = async ({ params }: RoomDetailsPageProps) => {
  const { id } = await params;

  const room = await getProduct(Number(id));

  return (
    <>
      <PageHeader
        title={room?.name ?? '-'}
        breadcrumbs={{
          items: [
            { label: 'Home', href: routes.home.entry() },
            { label: 'Services', href: routes.services.entry() },
            { label: room?.name ?? '-', href: routes.services.detail(Number(id)).entry, active: true },
          ],
        }}
      />
      <section>
        <UpdateServiceForm
          defaultValue={{
            name: room?.name ?? '',
            description: room?.description ?? '',
            price: room?.price ?? 0,
          }}
          id={Number(id)}
        />
      </section>
    </>
  );
};

export default RoomDetailsPage;
