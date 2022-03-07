import exp from 'constants';
import express from 'express';
import methodOverride from 'method-override';
import pg from 'pg';

const app = express();
app.use(express.static('public')); // to link with style sheets css.
app.use(express.urlencoded({extended: false}));

const port = 3004

// Initialise the DB connection 
const {Pool} = pg;

const pgConnectionConfigs = {
  user: 'regina',
  host: 'localhost',
  database: 'many_recipes',
  port: 5432, // Postgres server always runs on this port by default
};
// Assign the connection config using the Pool blueprint/template to a variable pool
const pool = new Pool (pgConnectionConfigs)

// Set view engine
app.set('view engine', 'ejs')
// Override POST requests with query param ?_method=PUT to be PUT requests
app.use(methodOverride('_method'));

app.get('/recipe/new', (request, response) => {
  pool.query('SELECT * from categories', (error, result) => {
    console.log(`query output`, result.rows)
    const data = {
      categories: result.rows,
    };
    console.log(`data becomes`, data)
    response.render('new', data);
  });
});

app.listen(port);