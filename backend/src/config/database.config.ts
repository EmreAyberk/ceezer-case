import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [`${__dirname}/../**/*.entity{.ts,.js}`],
  synchronize: process.env.NODE_ENV === 'development',
  logging: process.env.NODE_ENV === 'development',
  migrations: [`${__dirname}/../../database/migrations/*{.ts,.js}`],
  migrationsTableName: 'migrations',
}));
