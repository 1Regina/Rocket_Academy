import pg from 'pg';
// const pg = require ('pg');
const { Client } = pg;

// set the way we will connect to the server
const pgConnectionConfigs = {
  user: 'regina',
  host: 'localhost',
  database: 'cat_owners', // where meal_tracker table resides
  port: 5432,
}


// create the var we'll use
const client = new Client(pgConnectionConfigs);

export default client;