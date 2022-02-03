// import express from 'express';

const express = require('express');
const app = express()
const port = 3004

// A Dice 
const handleIncomingRequestADice = (request, response) => {

  console.log('request came in');
  let dice = Math.floor(Math.random()*6) + 1
  // response.send('yay');
  response.status(200).send(`Dice roll is ${dice}`)
};

app.get('/dice-roll', handleIncomingRequestADice);


// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// })

// Two Dice Rolls
const handleIncomingRequestTwoDice = (request, response) => {

  console.log('request came in');
  let dice1 = Math.floor(Math.random()*6) + 1
  let dice2 = Math.floor(Math.random()*6) + 1
  // response.send('yay');
  response.status(200).send(`First Dice Roll is ${dice1} <br>
                             Second Dice Roll is ${dice2}`)
};

app.get('/two-dice-rolls', handleIncomingRequestTwoDice);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});