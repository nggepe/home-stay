import PageHeader from '@/shared/ui/navigation/pages-header';
import { CreateServiceForm } from './form';
import { breadCrumbItems } from '@/configs/breadcrumb-items';

export const metadata = {
  title: 'Create Service',
  description: 'Create a new room for booking',
};

const CreateServicePage = () => {
  return (
    <>
      <PageHeader title="Create Service" breadcrumbs={{ items: breadCrumbItems.createService }} />
      <section>
        <CreateServiceForm />
      </section>
    </>
  );
};

export default CreateServicePage;
