'use server';

import { Database } from '@/configs/database';
import { PaginationRepositoryProps, PaginationRepositoryResponse } from '@/shared/types/pagination-types';
import { Sales } from '@/shared/types/sales-types';
import { convertPageToOffset, parseListViewParams, parseNextPage, parsePrevPage } from '@/utils/parser';

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
  grandTotal: number;
  payments: {
    amount: number;
    date: Date;
  }[];
  totalPayment: number;
}

export const createSales = async (data: CreateSalesProps) => {
  const code = await generateNewCode();
  await Database.sales.create({
    data: {
      code,
      bookedAt: data.bookedAt,
      createdAt: new Date(),
      customerId: data.customerId,
      updatedAt: new Date(),
      grandTotal: data.grandTotal,
      sales_line: {
        createMany: {
          data: data.salesLine,
        },
      },
      sales_payment: {
        createMany: {
          data: data.payments,
        },
      },
      totalPayment: data.totalPayment,
    },
  });
};

export const updateSales = async (id: number, data: CreateSalesProps) => {
  await Database.$transaction(async (trx) => {
    await trx.sales_line.deleteMany({
      where: {
        salesId: id,
      },
    });
    await trx.sales_payment.deleteMany({
      where: {
        salesId: id,
      },
    });
    await trx.sales.update({
      where: { id: id },
      data: {
        bookedAt: data.bookedAt,
        createdAt: new Date(),
        customerId: data.customerId,
        updatedAt: new Date(),
        grandTotal: data.grandTotal,
        sales_line: {
          createMany: {
            data: data.salesLine,
          },
        },
        sales_payment: {
          createMany: {
            data: data.payments,
          },
        },
        totalPayment: data.totalPayment,
      },
    });
  });
};

export const getSales = async ({
  ...props
}: PaginationRepositoryProps): Promise<PaginationRepositoryResponse<Sales>> => {
  const { page, limit, search } = parseListViewParams({ ...props });
  const take = limit || 10;
  const skip = convertPageToOffset(page, limit);

  const sales = await Database.sales.findMany({
    where: search
      ? {
          OR: [
            { customer: { name: search ? { contains: search, mode: 'insensitive' } : undefined } },
            { code: search ? { contains: search, mode: 'insensitive' } : undefined },
          ],
        }
      : undefined,
    take: take,
    skip: skip,
    orderBy: {
      id: 'desc',
    },
    include: {
      customer: {
        select: {
          id: true,
          name: true,
          phone: true,
        },
      },
    },
  });

  return {
    data: sales,
    pagination: {
      page: String(page || 1),
      next: parseNextPage(page, sales.length !== take),
      prev: parsePrevPage(page),
    },
  };
};

export const deleteSales = async (id: number) => {
  await Database.sales_line.deleteMany({
    where: {
      salesId: id,
    },
  });
  await Database.sales.delete({
    where: {
      id,
    },
  });
};

export const generateNewCode = async () => {
  const sales: { code: string }[] =
    await Database.$queryRaw`SELECT code FROM sales ORDER BY CAST(code AS INTEGER) DESC LIMIT 1`;

  if (sales.length === 0) {
    return '1'.padStart(4, '0');
  }
  const lastCode = sales[0].code;
  const newCode = String(Number(lastCode) + 1).padStart(4, '0');
  return newCode;
};

export const getSalesById = async (id: number) => {
  const sales = await Database.sales.findUnique({
    where: {
      id,
    },
    include: {
      sales_line: {
        include: {
          product: true,
        },
      },
      customer: true,
      sales_payment: true,
    },
  });
  return sales;
};
