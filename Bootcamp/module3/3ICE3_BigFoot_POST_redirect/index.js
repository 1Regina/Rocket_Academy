import express from 'express';
import read, {add} from './jsonFileStorage.js';

const app = express();
app.use(express.static('public'));
// Configure Express to parse request body data into request.body
app.use(express.urlencoded({ extended: false }));

const port = 3004

// Set view engine
app.set('view engine', 'ejs');

// app.get('/healthcheck', (req, res) => res.send('I M OK'))
// Save new sighting data sent via POST request from our form. 
// BASE. default in sighting.ejs is <form action="/bigfoot" method="POST"></form>
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
// app.get('/sighting', (request, response) => {
//   response.render('sighting');
// });

// COMFORTABLE - redirect to http://localhost:3004/sighting/<INDEX>
//!! need to update in sighting.ejs <form action="/bigfoot_new_record" method="POST">
// Render the form to input new sightings
app.get('/bigfoot_new_record', (request, response) => {
  response.render('sighting');
});
// Save new sighting data sent via POST request from our form
app.post('/bigfoot_new_record', (request, response) => {
  // Add new sighting data in request.body to sightings array in data.json.
  console.log('before added sighting')
  add('data.json', 'sightings', request.body, (err) => {
    console.log('added sighting')
    if (err) {
      response.status(500).send('DB write error.');
      return;
    }
  });
  // console.log(`safdsafdasgaregrav`)
    // Acknowledge sighting saved.
    // return response.send('Saved bigfoot sighting!');
  // Redirect to new recording
  read(`data.json`, (error, jsonObjContent) => {
    if (error) {
      console.error(`read error`, error);
      return;
    }
    const data = jsonObjContent.sightings;
    // console.log(`data`,data)
    // const total = data.length
    let index = data.length 
    console.log(`last index`, index)
    response.redirect(`/sightings/${index}`) 
    });
})


app.get('/sightings/:index', (req,res) =>{
  read(`data.json`, (error, jsonObjContent) => {
    if (error) {
      console.error(`read error`, error);
      return;
    }
    const data = jsonObjContent.sightings;
    // console.log(`data`,data)
    // const total = data.length
    const details = jsonObjContent.sightings[req.params.index]
    console.log(`details`, details)
    res.render(`single_sighting`, {details})
  })
  })


app.listen(port)