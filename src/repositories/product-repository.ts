'use server';

import { Database } from '@/configs/database';
import { PaginationRepositoryProps, PaginationRepositoryResponse } from '@/shared/types/pagination-types';
import { Product } from '@/shared/types/product-types';
import { convertPageToOffset, parseListViewParams, parseNextPage, parsePrevPage } from '@/utils/parser';

interface getProductsProps extends PaginationRepositoryProps {
  type?: 'ROOM' | 'SERVICE';
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

export const deleteProduct = async (id: number) => {
  return Database.products.delete({
    where: {
      id,
    },
  });
};

export const getProduct = async (id: number) => {
  return Database.products.findUnique({
    where: {
      id,
    },
  });
};

export const updateProduct = async (id: number, product: Product) => {
  return Database.products.update({
    where: {
      id,
    },
    data: product,
  });
};
