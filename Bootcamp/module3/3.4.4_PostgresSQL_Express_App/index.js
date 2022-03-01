import express from 'express';
import pg from 'pg';

// Initialise DB connection
const { Pool } = pg;
const pgConnectionConfigs = {
  user: 'regina',
  host: 'localhost',
  database: 'regina',
  port: 5432, // Postgres server always runs on this port by default
};
const pool = new Pool(pgConnectionConfigs);

const app = express();

app.get('/', (request, response) => {
  console.log('request came in');

  const whenDoneWithQuery = (error, result) => {
    if (error) {
      console.log('Error executing query', error.stack);
      response.status(503).send(result.rows);
      return;
    }
    console.log(`aaaaa`, result.rows[0].name);
    response.send(result.rows);
  };

  // Query using pg.Pool instead of pg.Client
  pool.query('SELECT * from dogs', whenDoneWithQuery); // Try with different tables
});

app.listen(3004);