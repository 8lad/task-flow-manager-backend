import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const main = async () => {};

main()
  .then(async () => {
    await prisma.$connect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
