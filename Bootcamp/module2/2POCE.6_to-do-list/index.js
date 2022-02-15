
import express from 'express';
// import express from 'express';
import {add, read} from './jsonFileStorage.js';

// const express = require('express');
const app = express()
const port = 3004

// let chores = ""
// jsonContent is a JavaScript object. Not a string
const whenJsonIsRead = (error, jsonContent) => {
  // accesss the key via destructuring https://bootcamp.rocketacademy.co/0-language-and-tooling/0.2-es6/0.2.3-es6-destructuring-spread-operators

  const {items} = jsonContent;

  if (process.argv[2] === "show") {
    for (let i = 0; i < items.length; i += 1 ){
      console.log(`- ${items[i]}`);
      // chores += items[i]
    }
  }
  if (process.argv[2] === "add"){
  add(`data.json`, `items`, process.argv[3], whenJsonIsRead);
  console.log(`I have added ${process.argv[3]} to your to-do list}`);
  }
}



const handleIncomingRequestName = (request, response) => {
    read ('data.json', whenJsonIsRead);
    
    response.send("wow", )

};

app.get('/', handleIncomingRequestName );
app.listen(port)