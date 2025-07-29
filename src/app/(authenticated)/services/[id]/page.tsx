import { breadCrumbItems } from '@/configs/breadcrumb-items';
import { getProduct } from '@/repositories/product-repository';
import PageHeader from '@/shared/ui/navigation/pages-header';
import { UpdateServiceForm } from './form';

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
        breadcrumbs={{ items: breadCrumbItems.detailRoom(Number(id), room?.name ?? '-') }}
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
