import express from 'express';
import {add, read, write} from './jsonFileStorage.js';
import methodOverride from 'method-override';

const app = express();
app.use(express.static('public'));
// Configure Express to parse request body data into request.body
app.use(express.urlencoded({ extended: false }));
// Override POST requests with query param ?_method=PUT to be PUT requests
app.use(methodOverride('_method'));

const port = 3004

// Set view engine
app.set('view engine', 'ejs');

// app.get('/healthcheck', (req, res) => res.send('I M OK'))
// Save new recipe data sent via POST request from our form
// app.get('/fruit', (request, response) => {
//     const data = {
//         fruit: {
//         name: 'banana',
//         },
//     };
//     // Return HTML to client, merging "index" template with supplied data.
// response.render('fruit', data);
// });

// Render the form to input new recipes
app.get('/recipe', (request, response) => {
  response.render('recipe');
});
// app.get('/recipe/:index', (request, response) => {
//   response.render('edit');
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


// without edit form. only can use curl
app.put('/recipe/:index', function (request, response) {
   const { index } = request.params;
   read('data.json', (err, data) => {
     // Replace the data in the object at the given index
     data['recipes'][index] = request.body;
     write('data.json', data, (err) => {
       response.send('Done!');
     console.log(`request.body`, request.body)
     console.log(`index`, index)  
     });
   });
});


// Render in edit form
app.get('/recipe/:index/edit', (request, response) => {
  // Retrieve current recipe data and render it
  read('data.json', (err, jsonData) => {
    const { index } = request.params;
    const recipe = jsonData.recipes[index];
    // Pass the recipe index to the edit form for the PUT request URL.
    recipe.index = index;
    const ejsData = { recipe };
    response.render('edit', ejsData);
  });
});


app.delete('/recipe/:index', (request, response) => {
  // Remove element from DB at given index
  const { index } = request.params;
  read('data.json', (err, data) => {
    data['recipes'].splice(index, 1);
    write('data.json', data, (err) => {
      response.send('Done!');
    });
  });
});

app.listen(3004);