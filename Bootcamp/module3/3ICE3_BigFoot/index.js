import express from 'express';
import {add} from './jsonFileStorage.js';

const app = express();
app.use(express.static('public'));
// Configure Express to parse request body data into request.body
app.use(express.urlencoded({ extended: false }));

const port = 3004

// Set view engine
app.set('view engine', 'ejs');

// app.get('/healthcheck', (req, res) => res.send('I M OK'))
// Save new recipe data sent via POST request from our form
app.post('/bigfoot', (request, response) => {

  // Add new recipe data in request.body to sightings array in data.json.
  console.log('before added sighting')
  add('data.json', 'sightings', request.body, (err) => {
    console.log('added sighting')
    if (err) {
      response.status(500).send('DB write error.');
      return;
    }
    // Acknowledge recipe saved.
    return response.send('Saved bigfoot sighting!');
  });
  // response.send('d;kdfg!');
});

// Render the form to input new sightings
app.get('/bigfoot', (request, response) => {
  response.render('sighting');
});

app.listen(port)