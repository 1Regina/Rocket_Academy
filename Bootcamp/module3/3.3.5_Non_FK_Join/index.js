import express from 'express';
// import read, {add} from './jsonFileStorage.js';
import methodOverride from 'method-override';
import pg from 'pg'; //import { pool } from "./constant.js";

const {Pool} = pg;
// set the way we will connect to the server
const pgConfig = {
  user: 'regina',
  host: 'localhost',
  database: 'many_recipes', 
  port: 5432,
}

const pool = new Pool(pgConfig);
pool.connect();

const app = express();
app.use(express.static('public'));
// Configure Express to parse request body data into request.body
app.use(express.urlencoded({ extended: false }));
// Override POST requests with query param ?_method=PUT to be PUT requests
app.use(methodOverride('_method'));
// app.use(cookieParser());
// app.use(bodyParser.json());
// Set view engine
app.set('view engine', 'ejs');



const port = 3004




const handleQueryError = (queryError) => {
  console.error('You messed up: ', queryError);
  console.log('Error executing query', queryError.stack);
  //client.end();
};

const handleEmptyResult = () => {
  console.log('no results!');
  //client.end();
};

const whenQueryDone = (error, result) => {
  if (error) {
    handleQueryError(error);
    return;
  }

  if (result.rows.length <= 0) {
    handleEmptyResult;
    return;
  }
};

// app.get('/recipe/:id/categories/add', (request, response) => {
app.get('/recipe/:id/categories/add', (request, response) => {  
  let index = request.params.id
  pool.query('select * from categories', (error, result) => {

    const data = {
      categories : result.rows
    };
  
    data.recipeId = index

    // console.log({data})
    response.render('categories', {data});

  });
});


app.post('/recipe/:id/categories/add', (request, response) => {
  console.log(`bbbb`, request.params)
    let index = request.params.id
  const recipeValues = [request.body.label];
  
  console.log(`recipeVALUES`, recipeValues)

  // use "RETURNING *" to retrieve the newly-created row
  const recipeInsertQuery = `INSERT INTO recipes (label) VALUES ($1) RETURNING *`;

  // execute query to insert new recipe
  pool.query(recipeInsertQuery, recipeValues, (recipeError, recipeResult) => {
    if (recipeError) {
      response.status(501).send('error!');
      return;
    }

    // retrieving this data is possible because of the "RETURNING *" in our query
    const recipeId = recipeResult.rows[0].id;

    const categoryInsertQuery =
      'INSERT INTO recipe_categories (recipe_id, category_id) VALUES ($1, $2)';

    let queryDoneCounter = 0;

    // for each category we have in the request, make an insert query
    request.body.category_ids.forEach((categoryId, index) => {
      // construct the set of values we are inserting
      const categoryValues = [recipeId, categoryId];

      pool.query(
        categoryInsertQuery,
        categoryValues,
        (categoryError, categoryResult) => {
          // query is done
          console.log(categoryResult.rows);

          queryDoneCounter += 1;
          
          // all queries are done
          if (queryDoneCounter === request.body.category_ids.length) {
            response.send('done!');
          }
        }
      );
    });
  });
});
const command = process.argv[2]

app.listen(port)