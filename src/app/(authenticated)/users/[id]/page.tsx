import { routes } from '@/configs/routes';
import { getUserById } from '@/repositories/user-repository';
import PageHeader from '@/shared/ui/navigation/pages-header';
import { UpdateUserForm } from './form';
import { DialogResetPassword } from './reset-password';
import { Button } from '@radix-ui/themes';

export const metadata = {
  title: 'Update User',
  description: 'Update a user',
};

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}
const UpdateUserPage = async ({ params }: PageProps) => {
  const { id } = await params;
  const user = await getUserById(Number(id));
  if (!user) {
    return <div>User not found</div>;
  }
  return (
    <>
      <PageHeader
        title="Update User"
        breadcrumbs={{
          items: [
            { label: 'Home', href: routes.home.entry() },
            { label: 'Users', href: routes.users.entry() },
            { label: `${user.name}`, href: routes.users.detail(Number(id)).entry, active: true },
          ],
        }}
        actions={[
          <DialogResetPassword
            userId={Number(id)}
            key="change-password"
            trigger={<Button variant="outline">Reset Password</Button>}
          />,
        ]}
      />
      <UpdateUserForm id={user.id} defaultValues={user} />
    </>
  );
};

export default UpdateUserPage;
