'use server';

import { Database } from '@/configs/database';
import { Customer } from '@/shared/types/customer-types';
import { PaginationRepositoryProps, PaginationRepositoryResponse } from '@/shared/types/pagination-types';
import { convertPageToOffset, parseListViewParams, parseNextPage, parsePrevPage } from '@/utils/parser';

export const getCustomers = async ({
  ...props
}: PaginationRepositoryProps): Promise<PaginationRepositoryResponse<Customer>> => {
  const { page, limit, search } = parseListViewParams({ ...props });
  const take = limit || 10;
  const skip = convertPageToOffset(page, limit);

  const customers = await Database.customers.findMany({
    where: {
      name: search ? { contains: search, mode: 'insensitive' } : undefined,
    },
    take: take,
    skip: skip,
    orderBy: {
      id: 'desc',
    },
  });

  return {
    data: customers,
    pagination: {
      page: String(page || 1),
      next: parseNextPage(page, customers.length !== take),
      prev: parsePrevPage(page),
    },
  };
};

export const createCustomer = async (customer: Pick<Customer, 'name' | 'phone'>) => {
  return Database.customers.create({
    data: {
      ...customer,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });
};

export const updateCustomer = async (id: Customer['id'], customer: Pick<Customer, 'name' | 'phone'>) => {
  return Database.customers.update({
    where: {
      id,
    },
    data: {
      ...customer,
      updatedAt: new Date(),
    },
  });
};

export const deleteCustomer = async (id: Customer['id']) => {
  return Database.customers.delete({
    where: {
      id: id,
    },
  });
};

export const getCustomer = async (id: Customer['id']) => {
  return Database.customers.findUnique({
    where: {
      id: id,
    },
  });
};
