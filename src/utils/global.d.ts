declare namespace NodeJS {
  interface ProcessEnv {
    SERVER_PORT: number;
    BASE_ROUTE: string;
    ORIGIN_URL: string;
    AUTH0_DOMAIN: string;
    AUTH0_CLIENT_ID: string;
    AUTH0_CLIENT_SECRET: string;
    AUTH0_CALLBACK_URL: string;
    SESSION_SECRET: string;
  }
}
