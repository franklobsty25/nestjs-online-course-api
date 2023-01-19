export interface Configuration {
  env: string;
  mode: string;
  jwt: {
    secret: string;
    expires: string;
  };
  database: string;
}

export default (): Configuration => ({
  env: process.env.NODE_ENV,
  mode: process.env.MODE,
  jwt: {
    secret: process.env.SECRET,
    expires: process.env.EXPIRES,
  },
  database: process.env.DATABASE_HOST,
});
