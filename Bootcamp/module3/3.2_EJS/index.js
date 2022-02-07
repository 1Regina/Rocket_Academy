import express from 'express';

const app = express();

// Set view engine
app.set('view engine', 'ejs');

app.get('/fruit', (request, response) => {
  // Obtain data to inject into EJS template
  const data = {
    fruit: {
      name: 'banana',
      count: 2,
    },

  };
  // Return HTML to client, merging "index" template with supplied data.
  response.render('fruit', data);
});

app.get('/fruit/:name', (request, response) => {
  // Obtain data to inject into EJS template
  const data = {
    fruit: {
      name: 'apple',
      count: 3,
    },

  };
  // Return HTML to client, merging "index" template with supplied data.
  response.render('fruit', data);
});

app.listen(3004);


// execute with command nodemon index.js -e js