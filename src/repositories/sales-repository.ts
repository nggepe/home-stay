'use server';

import { Database } from '@/configs/database';

interface salesLine {
  productId: number;
  quantity: number;
  checkInAt?: Date;
  checkOutAt?: Date;
  price: number;
  subtotal: number;
  createdAt?: Date;
  updatedAt?: Date;
}
interface CreateSalesProps {
  bookedAt: Date;
  customerId: number;
  salesLine: salesLine[];
}

export const createSales = async (data: CreateSalesProps) => {
  await Database.sales.create({
    data: {
      bookedAt: data.bookedAt,
      createdAt: new Date(),
      customerId: data.customerId,
      updatedAt: new Date(),
      sales_line: {
        createMany: {
          data: data.salesLine,
        },
      },
    },
  });
};
