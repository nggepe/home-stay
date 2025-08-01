import { routes } from '@/configs/routes';
import PageHeader from '@/shared/ui/navigation/pages-header';
import { CreateSalesForm } from './form';

export const metadata = {
  title: 'Create Sales',
  description: 'Create a new sales',
};

const CreateSalesPage = () => {
  return (
    <>
      <PageHeader
        title="Create Sales"
        breadcrumbs={{
          items: [
            {
              label: 'Home',
              href: routes.home.entry(),
            },
            {
              label: 'Sales',
              href: routes.sales.entry(),
            },
            {
              label: 'Create Sales',
              href: routes.sales.create.entry(),
              active: true,
            },
          ],
        }}
      />
      <CreateSalesForm />
    </>
  );
};

export default CreateSalesPage;
