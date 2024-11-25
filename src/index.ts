import prisma from './config/prismaClient';
import express from 'express';
import cors from 'cors';
import { rateLimit } from 'express-rate-limit';
import cookieParser from 'cookie-parser';
import { checkAllEnvVariables } from './utils/checkAllEnvVariables';
import { isDevelopmentMode } from './utils/isDevelopmentMode';
import {
  ALL_ROUTES,
  REQUEST_AMOUNT_LIMIT,
  REQUEST_TIME_LIMIT,
  SPARE_DEV_PORT,
} from './utils/constants';
import { RequestMenthods } from './utils/types';
import { getErrorResponseInfoObject } from './utils/helpers';
import { errorLogger } from './services/errorLogger';
import { notFoundErrorHandler } from './services/notFoundErrorHandler';
import { finalErrorHandler } from './services/finalErrorHandler';

const IS_DEVELOPMENT_MODE = isDevelopmentMode();

const app = express();

const originUrl = IS_DEVELOPMENT_MODE ? ALL_ROUTES : process.env.ORIGIN_URL;

checkAllEnvVariables();

const main = async () => {
  app.use(express.json());

  app.use(
    cors({
      origin: originUrl,
      methods: [
        RequestMenthods.Delete,
        RequestMenthods.Post,
        RequestMenthods.Get,
        RequestMenthods.Put,
      ],
    }),
  );

  app.use(
    rateLimit({
      windowMs: REQUEST_TIME_LIMIT,
      limit: REQUEST_AMOUNT_LIMIT,
      message: getErrorResponseInfoObject('The request limit have been reached'),
      statusCode: 400,
    }),
  );

  app.use(cookieParser());

  if (IS_DEVELOPMENT_MODE) {
    app.use(errorLogger);
  }

  app.all(ALL_ROUTES, notFoundErrorHandler);
  app.use(finalErrorHandler);

  app.listen(process.env.SERVER_PORT || SPARE_DEV_PORT, () => {
    console.info(
      `*** The server is running on the ${process.env.SERVER_PORT || SPARE_DEV_PORT} port ***`,
    );
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
