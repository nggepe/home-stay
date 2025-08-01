import PageHeader from '@/shared/ui/navigation/pages-header';
import { CreateServiceForm } from './form';
import { routes } from '@/configs/routes';

export const metadata = {
  title: 'Create Service',
  description: 'Create a new room for booking',
};

const CreateServicePage = () => {
  return (
    <>
      <PageHeader
        title="Create Service"
        breadcrumbs={{
          items: [
            { label: 'Home', href: routes.home.entry() },
            { label: 'Services', href: routes.services.entry() },
            { label: 'Create Service', href: routes.services.create.entry() },
          ],
        }}
      />
      <section>
        <CreateServiceForm />
      </section>
    </>
  );
};

export default CreateServicePage;
