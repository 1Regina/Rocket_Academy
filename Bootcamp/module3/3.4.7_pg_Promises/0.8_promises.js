import express from "express";
// import pg from "pg";
// import axios from 'axios';

// Initialise DB connection
// const { Pool } = pg;
// const pgConnectionConfigs = {
//   user: "regina",
//   host: "localhost",
//   database: "regina",
//   port: 5432, // Postgres server always runs on this port by default
// };
// const pool = new Pool(pgConnectionConfigs);

// const app = express();

// const port = 3004;


// const categoryName = 'vegan'; // from request.query

// pool
//   .query('SELECT * from categories WHERE name=$1', [categoryName])
//   .then((result) => {
//     // TODO: check if result.rows contains a row
//     console.log(result.rows[0]);
//     const categoryId = result.rows[0].id;
//     return pool.query(
//       `SELECT
//         recipes.id,
//         recipes.label,
//         recipes.category_id AS recipe_category_id,
//         categories.id AS category_id,
//         categories.name AS category_name
//       FROM recipes
//       INNER JOIN categories
//       ON categories.id=recipes.category_id
//       WHERE category_id=$1`,
//       [categoryId]
//     );
//   })
//   .then((result) => {
//     console.log(`all recipes with category ${categoryName}`);
//     console.log(result.rows);
//   })

console.log('creating promise');
const myFirstPromise = new Promise((resolve, reject) => {
  // We call resolve(...) when what we were doing asynchronously was successful.
  // We call reject(...) when what we were doing asynchronously failed.
  // In this example, we use setTimeout(...) to simulate async code.
  // In reality, you will probably be using something like AJAX.
  console.log('setting timeout');
  setTimeout(() => {
    console.log('timeout done, calling resolve');
    resolve('Success!'); // Yay! Everything went well!
    console.log('done calling resolve');
  }, 250);
  console.log('done setting timeout');
});

console.log('about to set .then callback');
myFirstPromise.then((successMessage) => {
  // successMessage is whatever we passed into the resolve(...) function above.
  // It doesn't have to be a string, but if it is only a succeed message, it probably will be.
  console.log(`Yay! ${successMessage}`);
  console.log('done calling .then');
});
console.log('done setting then callback');

// set port to listen
// app.listen(port);
