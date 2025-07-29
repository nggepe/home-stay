import { breadCrumbItems } from '@/configs/breadcrumb-items';
import { routes } from '@/configs/routes';
import { Autocomplete } from '@/shared/ui/autocomplete/autocomplete';
import PageHeader from '@/shared/ui/navigation/pages-header';
import { Button } from '@radix-ui/themes';
import Link from 'next/link';

export const metadata = {
  title: 'Sales',
  description: 'List of all sales',
};

const SalesPage = () => {
  return (
    <>
      <PageHeader
        title="Services"
        breadcrumbs={{
          items: breadCrumbItems.sales,
        }}
        actions={[
          <Link href={routes.sales.create.entry()} key={'create'}>
            <Button variant="classic">New Sales</Button>
          </Link>,
        ]}
      />
      <Autocomplete />
    </>
  );
};

export default SalesPage;
