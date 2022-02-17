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
// Save new sighting data sent via POST request from our form
app.post('/bigfoot', (request, response) => {

  // Add new sighting data in request.body to sightings array in data.json.
  console.log('before added sighting')
  add('data.json', 'sightings', request.body, (err) => {
    console.log('added sighting')
    if (err) {
      response.status(500).send('DB write error.');
      return;
    }
    // Acknowledge sighting saved.
    return response.send('Saved bigfoot sighting!');
  });
});

// Render the form to input new sightings
app.get('/bigfoot', (request, response) => {
  response.render('sighting');
});


// for practice with curl $ curl -d "YEAR=1989&SEASON=spring" -X POST http://localhost:3004/sighting
// For Thunderclient, use request.query
app.post('/sighting', (request, response) => {

  // Add new sighting data in request.query to sightings array in data.json.
  console.log('before added sighting')
  add('data.json', 'sightings', request.query, (err) => {
    console.log('added sighting')
    if (err) {
      response.status(500).send('DB write error.');
      return;
    }
    // Acknowledge sighting saved.
    return response.send('Saved bigfoot sighting!');
  });
  // response.send('d;kdfg!');
});

// Render the form to input new sightings
app.get('/sighting', (request, response) => {
  response.render('sighting');
});

// app.post('/sighting', (request, response) => {

//   // Add new recipe data in request.body to sightings array in data.json.
//   console.log('before added sighting')
//   add('data.json', 'sightings', request.body, (err) => {
//     console.log('added sighting')
//     if (err) {
//       response.status(500).send('DB write error.');
//       return;
//     }
//     // Acknowledge recipe saved.
//     return response.send('Saved bigfoot sighting!');
//   });
//   // response.send('d;kdfg!');
// });

app.listen(port)