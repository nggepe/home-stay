'use client';

import FormSales from '@/components/sales/form-sales';
import { updateSales } from '@/repositories/sales-repository';
import { useToast } from '@/shared/hooks/use-toast';
import { toastError } from '@/utils/errors';
import { useRouter } from 'next/navigation';

type FormSalesProps = React.ComponentProps<typeof FormSales>;
type FormInput = Parameters<NonNullable<FormSalesProps['onSubmit']>>[0];

interface UpdateSalesFormProps {
  id: number;
  defaultValue?: FormInput;
}

export const UpdateSalesForm = ({ defaultValue, id }: UpdateSalesFormProps) => {
  const toast = useToast();
  const router = useRouter();
  const onSubmit = async (data: FormInput) => {
    try {
      await updateSales(id, {
        bookedAt: data.bookedAt,
        customerId: data.customer.id,
        grandTotal: data.grandTotal,
        salesLine: data.orderLines.map((e) => {
          return {
            productId: e.product!.id!,
            quantity: Number(e.quantity!),
            price: Number(e.price!),
            subtotal: e.subTotal!,
            checkInAt: e.checkIn ?? undefined,
            checkOutAt: e.checkOut ?? undefined,
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
  return <FormSales onSubmit={onSubmit} defaultValues={defaultValue} />;
};
