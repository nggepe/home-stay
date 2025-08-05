'use client';

import FormSales from '@/components/sales/form-sales';
import { createSales } from '@/repositories/sales-repository';
import { useToast } from '@/shared/hooks/use-toast';
import { toastError } from '@/utils/errors';
import { useRouter } from 'next/navigation';

type FormSalesProps = React.ComponentProps<typeof FormSales>;
type FormInput = Parameters<NonNullable<FormSalesProps['onSubmit']>>[0];

export const CreateSalesForm = () => {
  const toast = useToast();
  const router = useRouter();
  const onSubmit = async (data: FormInput) => {
    try {
      await createSales({
        bookedAt: data.bookedAt,
        customerId: data.customer.id,
        grandTotal: data.grandTotal,
        salesLine: data.orderLines.map((e) => {
          return {
            productId: e.product!.id!,
            quantity: e.quantity!,
            price: Number(e.price!),
            subtotal: e.subTotal!,
            checkInAt: e.checkIn,
            checkOutAt: e.checkOut,
            createdAt: new Date(),
            updatedAt: new Date(),
          };
        }),
      });
      toast.showToast('Sales created successfully');
      router.push('/sales');
    } catch (error) {
      console.error(error);
      toastError(error, toast);
    }
  };
  return <FormSales onSubmit={onSubmit} />;
};
