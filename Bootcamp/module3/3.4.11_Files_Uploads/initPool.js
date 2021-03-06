import pg from 'pg';

const { Pool } = pg;
const pgConnectionConfigs = {
  user: 'regina',
  host: 'localhost',
  database: 'uploads',
  port: 5432,
};

const pool = new Pool(pgConnectionConfigs);

export default pool;