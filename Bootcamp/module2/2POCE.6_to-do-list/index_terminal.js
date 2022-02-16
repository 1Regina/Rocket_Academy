
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
      chores += items[i]
    }
  }
  if (process.argv[2] === "add"){
  add(`data.json`, `items`, process.argv[3], whenJsonIsRead);
  console.log(`I have added ${process.argv[3]} to your to-do list}`);
  }
}



const handleIncomingRequestName = (request, response) => {
  // BASE
    // read ('data.json', whenJsonIsRead);
  // COMFORTABLE  
    read ('data.json', completeChores); 
    response.send("wow", )

};

// COMFORTABLE
const completeChores = (error, jsonContent) => {
  const chores =  jsonContent.items
    if (process.argv[2] === "show") {
      console.log(`To-Do:`);
    for (let i = 0; i < chores.length; i += 1 ){
      console.log(` ${i+1}`+`. `+ `${chores[i]}`);
    }
    console.log(`\nDone:`)
  }
  if (process.argv[2] === "complete") {
    let removeIndex= process.argv[3] - 1
    console.log(` I have marked item ${process.argv[3]}, "${chores[removeIndex]}" as complete.` )

    // adding the removed item to the jsonContent.done. HELP NEEDED
    add(`data.json`, `done`,chores[removeIndex],whenJsonIsRead)
    
    chores.splice(removeIndex,1)
    // assign jsonContent.item to the new updated chores
    jsonContent.items = chores
    console.log(`remaining chores`, chores)
    //DUNNO HOW TO USE THE EDIT function. HELP NEEDED

    // output the details of the udpated data.json content
    console.log(`To-Do:`);
    for (let i = 0; i < chores.length; i += 1 ){
      console.log(` ${i+1}`+`. `+ `${chores[i]}`);
    }
    console.log(`\nDone:`)
    const doneItems = jsonContent.done
    for (let i = 0; i < doneItems.length; i += 1 ){
      console.log(` ${i+1}`+`. `+ `${doneItems[i]}`);
    }
  }
}

app.get('/', handleIncomingRequestName );

app.listen(port)