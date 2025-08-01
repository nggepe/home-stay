import PageHeader from '@/shared/ui/navigation/pages-header';
import { UpdateCustomerForm } from './form';
import { routes } from '@/configs/routes';
import { getCustomer } from '@/repositories/customer-repository';

export const metadata = {
  title: 'Customer Details',
  description: 'Details of a customer',
};

interface CustomerDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

const CustomerDetailsPage = async ({ params }: CustomerDetailsPageProps) => {
  const { id } = await params;

  const customer = await getCustomer(Number(id));

  return (
    <>
      <PageHeader
        title={customer?.name ?? '-'}
        breadcrumbs={{
          items: [
            { label: 'Home', href: routes.home.entry() },
            { label: 'Customers', href: routes.customers.entry() },
            { label: customer?.name ?? '-', href: routes.customers.detail(Number(id)).entry, active: true },
          ],
        }}
      />
      <section>
        <UpdateCustomerForm
          defaultValue={{
            name: customer?.name ?? '',
            phone: customer?.phone ?? '',
          }}
          id={Number(id)}
        />
      </section>
    </>
  );
};

export default CustomerDetailsPage;
