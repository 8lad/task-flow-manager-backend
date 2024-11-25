import prisma from './config/prismaClient';
import express from 'express';
import { checkAllEnvVariables } from './utils/checkAllEnvVariables';

const app = express();

checkAllEnvVariables();

const main = async () => {
  app.listen(process.env.SERVER_PORT || 3200, () => {
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
