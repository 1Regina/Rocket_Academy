import express from 'express';
// import read from './jsonFileStorage.js';

const app = express();
app.use(express.static('public'));
const port = 3004

// Set view engine
app.set('view engine', 'ejs');

app.get('/hello', (request, response) => {
  // Obtain data to inject into EJS template
  const data = {
    fruit: {
      name: 'banana',
    },
  };
  // Return HTML to client, merging "index" template with supplied data.
  response.render('greeting', data);
});

const handleIncomingRequest = (req, res) => {
  console.log(req.params);
  res.render('yay');
};

app.get('/hello2', handleIncomingRequest);
app.listen(port)