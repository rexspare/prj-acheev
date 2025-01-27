import { Knex } from 'knex';
import { knexSnakeCaseMappers } from 'objection';

const { DB_NAME, DB_USER, DB_PASS, DB_HOSTNAME, DB_PORT } = process.env;

const DEFAULT_CLIENT = 'postgresql';
const DEFAULT_POOL: Knex.PoolConfig = { min: 2, max: 10 };
const DEFAULT_SEEDS: Knex.SeederConfig = { directory: `${__dirname}/db/seeds` };
const DEFAULT_MIGRATIONS: Knex.MigratorConfig = { tableName: 'knex_migrations', directory: `${__dirname}/db/migrations` };

const ENV_CONNECTION: Knex.ConnectionConfig & { port: number } = {
  host: DB_HOSTNAME ?? 'N/A',
  database: DB_NAME ?? 'N/A',
  user: DB_USER ?? 'N/A',
  password: DB_PASS ?? 'N/A',
  port: parseInt(DB_PORT ?? '5432')
};

const BASE_CONFIG: Knex.Config = {
  client: DEFAULT_CLIENT,
  connection: ENV_CONNECTION,
  pool: DEFAULT_POOL,
  migrations: DEFAULT_MIGRATIONS,
  seeds: DEFAULT_SEEDS,
  ...knexSnakeCaseMappers()
};

const config: { [key: string]: Knex.Config } = {
  development: BASE_CONFIG,
  staging: BASE_CONFIG,
  production: BASE_CONFIG
};

module.exports = config;

export default config;
