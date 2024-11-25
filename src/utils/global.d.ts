declare namespace NodeJS {
  interface ProcessEnv {
    SERVER_PORT: number;
    BASE_ROUTE: string;
    ORIGIN_URL: string;
  }
}
