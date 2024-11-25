import prisma from './config/prismaClient';
import express from 'express';

const app = express();

const main = async () => {
  app.listen(process.env.SERVER_PORT || 3200, () => {
    console.info(` ${process.env.NODE_ENV} mode`);

    console.info(`The server is running on the ${process.env.SERVER_PORT} port`);
  });
};

main()
  .then(async () => {
    await prisma.$connect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
