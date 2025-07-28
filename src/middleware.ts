import { NextRequest, NextResponse } from 'next/server';
import { IGNORED_AUTH_PATH, JWT_COOKIE_NAME, JWT_REFRESH_COOKIE_NAME } from './configs/constants';
import { jwtSign, jwtVerify } from './utils/jwt';

// This function can be marked `async` if using `await` inside
export async function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const pathname = url.pathname;
  if (IGNORED_AUTH_PATH.some((path) => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  const session = req.cookies.get(JWT_COOKIE_NAME);

  if (!session) {
    url.pathname = '/login';

    return NextResponse.redirect(url);
  }

  try {
    const payload = await jwtVerify(session.value);
    if (payload) {
      const response = NextResponse.next();

      response.headers.set('userId', String(payload));

      return response;
    }
  } catch (error) {
    console.error(error);
    const refresh = req.cookies.get(JWT_REFRESH_COOKIE_NAME);
    if (refresh) {
      try {
        const refreshPayload = await jwtVerify(refresh.value);
        if (refreshPayload) {
          const response = NextResponse.next();
          response.headers.set('userId', String(refreshPayload));
          response.cookies.set(JWT_COOKIE_NAME, await jwtSign({ id: Number(refreshPayload) }, '2h'), {
            path: '/',
            secure: process.env.NODE_ENV === 'production',
          });
          response.cookies.set(JWT_REFRESH_COOKIE_NAME, await jwtSign({ id: Number(refreshPayload) }, '7d'), {
            path: '/',
            secure: process.env.NODE_ENV === 'production',
          });
          return response;
        }
      } catch (error) {
        console.error(error);
      }
    }
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }
}
