import { PrismaClient } from '../src/generated/prisma';
import bcrypt from 'bcrypt';

async function init(prisma: PrismaClient) {
  const password = await bcrypt.hash('admin', 10);

  await prisma.users.upsert({
    where: {
      email: 'admin@example.com',
    },
    update: {},
    create: {
      email: 'admin@example.com',
      password,
      name: 'Yori',
    },
  });
}

init(new PrismaClient());
