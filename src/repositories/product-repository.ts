'use server';

import { Database } from '@/configs/database';
import { $Enums } from '@/generated/prisma';
import { PaginationRepositoryProps, PaginationRepositoryResponse } from '@/shared/types/pagination-types';
import { parseListViewParams } from '@/utils/params';

interface getProductsProps extends PaginationRepositoryProps {
  type?: 'ROOM' | 'SERVICE';
}

export interface Product {
  type: $Enums.ProductType;
  name: string;
  price: number;
  description?: string | null;
  id?: number;
  createdAt: Date;
  updatedAt: Date;
}

export const getProducts = async ({
  type,
  ...props
}: getProductsProps): Promise<PaginationRepositoryResponse<Product>> => {
  const { page, limit, search } = parseListViewParams({ ...props });
  const take = limit || 10;
  const products = await Database.products.findMany({
    where: {
      type,
      name: search ? { contains: search } : undefined,
    },
    take: take,
    skip: ((page || 1) - 1) * take,
  });

  return {
    data: products,
    pagination: {
      page: String(page || 1),
      next: products.length === limit ? page ?? Number(page) + 1 : undefined,
      prev: page ? page - 1 : undefined,
    },
  };
};

export const createProduct = async (product: Product) => {
  return Database.products.create({
    data: product,
  });
};
