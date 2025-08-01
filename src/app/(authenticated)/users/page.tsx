import { routes } from '@/configs/routes';
import PageHeader from '@/shared/ui/navigation/pages-header';

export const metadata = {
  title: 'Users',
  description: 'List of users',
};

const UsersPage = async () => {
  return (
    <>
      <PageHeader
        title="Users"
        breadcrumbs={{
          items: [
            { label: 'Home', href: routes.home.entry() },
            { label: 'Users', href: routes.users.entry(), active: true },
          ],
        }}
      />
    </>
  );
};

export default UsersPage;
