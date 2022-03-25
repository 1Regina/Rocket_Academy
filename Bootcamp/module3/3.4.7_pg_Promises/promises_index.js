import express from "express";
import pg from "pg";
import axios from 'axios';


const app = express();

const port = 3004;

// Initialise DB connection
const { Pool } = pg;
const pgConnectionConfigs = {
  user: "regina",
  host: "localhost",
  database: "regina",
  port: 5432, // Postgres server always runs on this port by default
};
const pool = new Pool(pgConnectionConfigs);

const categoryName = 'vegan'; // from request.query

pool
  .query('SELECT * from categories WHERE name=$1', [categoryName])
  .then((result) => {
    // TODO: check if result.rows contains a row
    console.log(`first output is `,result.rows[0]);
    const categoryId = result.rows[0].id;
    return pool.query(
      `SELECT
        recipes.id,
        recipes.label,
        recipes.category_id AS recipe_category_id,
        categories.id AS category_id,
        categories.name AS category_name
      FROM recipes
      INNER JOIN categories
      ON categories.id=recipes.category_id
      WHERE category_id=$1`,
      [categoryId]
    );
  })
  .then((result) => {
      if (result.rows.length === 0) {
      throw 'no recipes';
    }

    console.log(`all recipes with category ${categoryName}`);
    console.log(result.rows);
  })
   .catch((error) => {
    // in Express.js we might respond 400 or 500.
    console.log(`reporting error`, error);
  });

// set port to listen
app.listen(port);
