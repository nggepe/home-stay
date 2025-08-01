import { routes } from '@/configs/routes';
import { AutocompleteProduct } from '@/shared/ui/autocomplete/autocomplete-product';
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
          items: [
            {
              label: 'Home',
              href: routes.home.entry(),
            },
            {
              label: 'Sales',
              href: routes.sales.entry(),
              active: true,
            },
          ],
        }}
        actions={[
          <Link href={routes.sales.create.entry()} key={'create'}>
            <Button variant="classic">New Sales</Button>
          </Link>,
        ]}
      />
      <AutocompleteProduct />
    </>
  );
};

export default SalesPage;
