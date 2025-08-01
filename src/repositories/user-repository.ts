'use server';

import { Database } from '@/configs/database';
import { PaginationRepositoryProps, PaginationRepositoryResponse } from '@/shared/types/pagination-types';
import { AppError } from '@/utils/errors';
import { convertPageToOffset, parseListViewParams, parseNextPage, parsePrevPage } from '@/utils/parser';
import bcrypt from 'bcrypt';

interface CreateUserProps {
  email: string;
  password: string;
  name: string;
}
export const createUser = async ({ email, password, name }: CreateUserProps) => {
  return await Database.users.create({
    data: {
      email,
      password: await bcrypt.hash(password, 10),
      name,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });
};

export interface User {
  id: number;
  name: string;
  email: string;
  createdAt?: Date;
  updatedAt?: Date;
}
export const getUsers = async (props: PaginationRepositoryProps): Promise<PaginationRepositoryResponse<User>> => {
  const { limit, page, search } = parseListViewParams(props);
  const users = await Database.users.findMany({
    where: {
      name: search ? { contains: search, mode: 'insensitive' } : undefined,
    },
    take: limit || 10,
    skip: convertPageToOffset(page, limit),
    orderBy: {
      id: 'desc',
    },
  });
  return {
    data: users.map((e) => ({
      name: e.name,
      email: e.email,
      id: e.id,
      createdAt: e.createdAt,
      updatedAt: e.updatedAt,
    })),
    pagination: {
      next: parseNextPage(page, users.length !== limit),
      prev: parsePrevPage(page),
    },
  };
};

export const deleteUser = async (id: number) => {
  const data = await Database.users.findMany({ take: 2, select: { id: true } });
  if (data.length == 1) {
    throw new AppError('Cannot delete the last user');
  }
  return await Database.users.delete({
    where: {
      id,
    },
  });
};

export const getUserById = async (id: number) => {
  return await Database.users.findUnique({
    select: {
      id: true,
      email: true,
      name: true,
      createdAt: true,
      updatedAt: true,
    },
    where: {
      id,
    },
  });
};

export interface UserOptional {
  name?: string;
  email?: string;
  createdAt?: Date;
  updatedAt?: Date;
  password?: string;
}
export const updateUser = async (id: number, user: UserOptional) => {
  if (user.password) {
    user.password = await bcrypt.hash(user.password, 10);
  }
  return await Database.users.update({
    where: {
      id,
    },
    data: user,
  });
};
