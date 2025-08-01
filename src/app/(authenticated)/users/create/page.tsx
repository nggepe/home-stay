import { routes } from '@/configs/routes';
import PageHeader from '@/shared/ui/navigation/pages-header';
import { CreateUserForm } from './form';

export const metadata = {
  title: 'Create User',
  description: 'Create a new user',
};

const CreateUserPage = () => {
  return (
    <>
      <PageHeader
        title="Create User"
        breadcrumbs={{
          items: [
            { label: 'Home', href: routes.home.entry() },
            { label: 'Users', href: routes.users.entry() },
            { label: 'Create User', href: routes.users.create.entry(), active: true },
          ],
        }}
      />
      <CreateUserForm />
    </>
  );
};

export default CreateUserPage;
