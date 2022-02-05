import express from 'express';
import { read } from './jsonFileStorage.js';

// const express = require('express');
const app = express()
const port = 3004

const handleIncomingRequestFileRead = (request, response) => {
  console.log('request came in');
  read('datacity.json', (err, jsonContentObj) => {
    console.log(`where is my object`,jsonContentObj);
    response.send(jsonContentObj);
  });
  console.log(`i am in the city`)
};

const handleIncomingRequestURL = (request, response) => {
  console.log(request.params);
  response.send('yay');
};

const handleIncomingRequestName = (request, response) => {
  read('dataNames.json', (err, data) => {
    // Respond with the name at the index specified in the URL
    response.send(data.names[request.params.index]);
  });
};

// app.get('/', handleIncomingRequest);
app.get('/cityfile', handleIncomingRequestFileRead);
app.get('/location/:city/:postalCode', handleIncomingRequestURL);
// index is a URL path parameter
app.get('/names/:index', handleIncomingRequestName);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});

//PARAMS
//www.cardealer.co/:brand/:id
//www.cardealer.co/:toyota/5
//QUERY
//www.cardealer.co?toyota=blue
//www.cardealer.co?toyota=blue&id=5

// www.rocketacademy.co?city=singapore&postCode=300456

// // A Dice 
// const handleIncomingRequestADice = (request, response) => {

//   console.log('request came in');
//   let dice = Math.floor(Math.random()*6) + 1
//   // response.send('yay');
//   response.status(200).send(`Dice roll is ${dice}`)
// };

// app.get('/dice-roll', handleIncomingRequestADice);


// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// })

// // Two Dice Rolls
// const handleIncomingRequestTwoDice = (request, response) => {

//   console.log('request came in');
//   let dice1 = Math.floor(Math.random()*6) + 1
//   let dice2 = Math.floor(Math.random()*6) + 1
//   // response.send('yay');
//   response.status(200).send(`First Dice Roll is ${dice1} <br>
//                              Second Dice Roll is ${dice2}`)
// };

// app.get('/two-dice-rolls', handleIncomingRequestTwoDice);

