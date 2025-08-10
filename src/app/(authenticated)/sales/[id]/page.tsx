import { routes } from '@/configs/routes';
import { PageProps } from '@/shared/types/page-types';
import PageHeader from '@/shared/ui/navigation/pages-header';
import { UpdateSalesForm } from './form';
import { getSalesById } from '@/repositories/sales-repository';

export const metadata = {
  title: 'Edit Sales',
  description: 'Edit a sales',
};

interface PageParams {
  id: string;
}

const EditSalesPage = async ({ params }: PageProps<PageParams>) => {
  const { id } = await params;

  const sales = await getSalesById(Number(id));
  if (!sales) {
    return <></>;
  }
  return (
    <>
      <PageHeader
        title="Edit Sales"
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
              label: 'Edit Sales',
              href: routes.sales.detail(Number(id)).entry,
              active: true,
            },
          ],
        }}
      />
      <UpdateSalesForm
        id={Number(id)}
        defaultValue={{
          bookedAt: sales.bookedAt!,
          customer: {
            display: `${sales.customer.name} (${sales.customer.phone})`,
            id: sales.customerId,
            name: sales.customer.name,
            phone: sales.customer.phone,
            createdAt: sales.customer.createdAt,
            updatedAt: sales.customer.updatedAt,
          },
          grandTotal: sales.grandTotal,
          orderLines: sales.sales_line.map((e) => ({
            checkIn: e.checkInAt,
            checkOut: e.checkOutAt,
            price: e.price,
            product: {
              id: e.productId,
              createdAt: e.product.createdAt,
              display: `${e.product.name} | ${e.product.type}`,
              name: e.product.name,
              price: e.product.price,
              type: e.product.type,
              updatedAt: e.product.updatedAt,
              description: e.product.description,
            },
            quantity: e.quantity,
            subTotal: e.subtotal,
          })),
          sales_payment: sales.sales_payment.map((v) => ({
            amount: v.amount,
            date: v.date,
          })),
          totalPayment: sales.totalPayment,
        }}
      />
    </>
  );
};

export default EditSalesPage;
