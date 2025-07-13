import { jwtDecrypt, SignJWT } from 'jose';

const secret = new TextEncoder().encode(process.env.AUTH_SECRET ?? 'iypuHPka1N8JjED7fyKckfznS+az0pv7r0HQ0o8gZ9o=');

export const jwtSign = async (payload: { id: number }, expiresIn: string) => {
  // Expire token in 1 hour
  const jwt = await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(expiresIn)
    .sign(secret);

  return jwt;
};

export const jwtVerify = async (jwt: string) => {
  const { payload } = await jwtDecrypt(jwt, secret);
  return payload;
};
