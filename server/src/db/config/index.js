import dotenv from 'dotenv';

dotenv.config();

const {
  DB_USER,
  DB_HOST,
  DB_NAME,
  DB_NAME_TEST,
  DB_PASSWORD,
  DATABASE_URL,
  NODE_ENV,
  DB_PORT
} = process.env;


export default () => {
  if (NODE_ENV === 'production') {
    return ({ connectionString: DATABASE_URL });
  }

  if (NODE_ENV === 'test') {
    return ({
      user: DB_USER || 'postgres',
      host: DB_HOST || '127.0.0.1',
      database: DB_NAME_TEST || 'customermanagement_test',
      password: DB_PASSWORD || '',
      port: DB_PORT || 5432
    });
  }

  return ({
    user: DB_USER,
    host: DB_HOST,
    password: DB_PASSWORD,
    database: DB_NAME,
    port: DB_PORT
  });
};
