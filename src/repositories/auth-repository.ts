'use server';

import { JWT_COOKIE_NAME, JWT_REFRESH_COOKIE_NAME } from '@/configs/constants';
import { Database } from '@/configs/database';
import { AppError } from '@/utils/errors';
import { jwtSign } from '@/utils/jwt';
import bcrypt from 'bcrypt';
import { cookies } from 'next/headers';

export const Login = async (email: string, password: string) => {
  const user = await Database.users.findUnique({
    where: {
      email,
    },
  });
  if (!user) {
    throw new AppError('Username / Password is incorrect');
  }

  const result = await bcrypt.compare(password, user?.password || '');
  if (!result) {
    throw new AppError('Username / Password is incorrect');
  }
  await MakeSession(user.id);
};

export const MakeSession = async (userId: number) => {
  const jwt = await jwtSign({ id: userId }, '1h');
  const cookie = await cookies();
  cookie.set(JWT_COOKIE_NAME, jwt, { path: '/', secure: process.env.NODE_ENV === 'production' });
  const refreshJwt = await jwtSign({ id: userId }, '7d');
  cookie.set(JWT_REFRESH_COOKIE_NAME, refreshJwt, { path: '/', secure: process.env.NODE_ENV === 'production' });
};

export const Logout = async () => {
  const cookie = await cookies();
  cookie.delete(JWT_COOKIE_NAME);
  cookie.delete(JWT_REFRESH_COOKIE_NAME);
};
