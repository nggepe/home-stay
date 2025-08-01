import PageHeader from '@/shared/ui/navigation/pages-header';
import { CreateCustomerForm } from './form';
import { routes } from '@/configs/routes';

export const metadata = {
  title: 'Create Customer',
  description: 'Create a new room for booking',
};

const CreateCustomerPage = () => {
  return (
    <>
      <PageHeader
        title="Create Customer"
        breadcrumbs={{
          items: [
            { label: 'Home', href: routes.home.entry() },
            { label: 'Customers', href: routes.rooms.entry() },
            { label: 'Create Customer', href: routes.rooms.create.entry(), active: true },
          ],
        }}
      />
      <section>
        <CreateCustomerForm />
      </section>
    </>
  );
};

export default CreateCustomerPage;
