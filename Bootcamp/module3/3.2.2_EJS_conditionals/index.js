import express from 'express';
// import {add} from './jsonFileStorage.js';

const app = express();
app.use(express.static('public'));
// Configure Express to parse request body data into request.body
app.use(express.urlencoded({ extended: false }));

const port = 3004

// Set view engine
app.set('view engine', 'ejs');

app.get('/user-data', (request, response) => {
  const data = {
    users: [{ name: 'kai' }, { name: 'jim' }, { name: 'susan' }],
  };
  response.render('user-data', data);
});

app.listen(port)