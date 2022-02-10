import express from 'express';
import {add} from './jsonFileStorage.js';

const app = express();
app.use(express.static('public'));
// Configure Express to parse request body data into request.body
app.use(express.urlencoded({ extended: false }));

const port = 3004

// Set view engine
app.set('view engine', 'ejs');

// 3.1.2 preclass
// app.get('/hello', (request, response) => {
//   // Obtain data to inject into EJS template
//   const data = {
//     fruit: {
//       name: 'banana',
//     },
//   };
//   // Return HTML to client, merging "index" template with supplied data.
//   response.render('greeting', data);
// });


// Save new recipe data sent via POST request from our form
app.post('/recipe', (request, response) => {

  // Add new recipe data in request.body to recipes array in data.json.
  add('data.json', 'recipes', request.body, (err) => {
    if (err) {
      response.status(500).send('DB write error.');
      return;
    }
    // Acknowledge recipe saved.
    response.send('Saved recipe!');
  });
});

// Render the form to input new recipes
app.get('/recipe', (request, response) => {
  response.render('recipe');
});

app.listen(port)