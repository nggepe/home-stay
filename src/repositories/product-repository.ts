'use server';

import { Database } from '@/configs/database';
import { $Enums } from '@/generated/prisma';
import { PaginationRepositoryProps, PaginationRepositoryResponse } from '@/shared/types/pagination-types';
import { convertPageToOffset, parseListViewParams, parseNextPage, parsePrevPage } from '@/utils/parser';

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
  const skip = convertPageToOffset(page, limit);

  const products = await Database.products.findMany({
    where: {
      type,
      name: search ? { contains: search, mode: 'insensitive' } : undefined,
    },
    take: take,
    skip: skip,
    orderBy: {
      id: 'desc',
    },
  });

  console.log('Total products', products.length, take);

  return {
    data: products,
    pagination: {
      page: String(page || 1),
      next: parseNextPage(page, products.length !== take),
      prev: parsePrevPage(page),
    },
  };
};

export const createProduct = async (product: Product) => {
  return Database.products.create({
    data: product,
  });
};
