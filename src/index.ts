import prisma from './config/prismaClient';
import express from 'express';
import cors from 'cors';
import { checkAllEnvVariables } from './utils/checkAllEnvVariables';
import { isDevelopmentMode } from './utils/isDevelopmentMode';
import { DEV_ORIGIN_URL, SPARE_DEV_PORT } from './utils/constants';
import { REST_METHODS } from './utils/types';

const IS_DEVELOPMENT_MODE = isDevelopmentMode();

const app = express();

const originUrl = IS_DEVELOPMENT_MODE ? DEV_ORIGIN_URL : process.env.ORIGIN_URL;

checkAllEnvVariables();

const main = async () => {
  app.use(
    cors({
      origin: originUrl,
      methods: [REST_METHODS.Delete, REST_METHODS.Post, REST_METHODS.Get, REST_METHODS.Put],
    }),
  );

  app.listen(process.env.SERVER_PORT || SPARE_DEV_PORT, () => {
    console.info(`The server is running on the ${process.env.SERVER_PORT || SPARE_DEV_PORT} port`);
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
