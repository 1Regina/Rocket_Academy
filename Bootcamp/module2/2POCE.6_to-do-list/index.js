
import express from 'express';
// import express from 'express';
import {add, read} from './jsonFileStorage.js';
import fs from 'fs';

// const express = require('express');
const app = express()
const port = 3004



const handleIncomingReqShow = (request, response) =>{
  read(`data.json`, (err, jsonContentObj) => {
    const {items} = jsonContentObj;
    let all = ""
    for (let i = 0; i < items.length; i += 1 ){
        all += (`- ${items[i]}<br>`);
      
     };
    const content = `
    <html>
         <body>
          <h1> ${all} </h1>
         </body>
    </html>
    ` ;
    response.send(content)
    }
  ) 
}

if (process.argv[2] === "show"){
  app.get(`/tasks`, handleIncomingReqShow)
}

// helper function for show
let all = ""
const createItems = (array) => {
  for (let i = 0; i < array.length; i += 1 ){
        all += (`-${array[i]}<br>`); 
  }
  const content = `
          ${all}
    ` ;  
  return content
}
// Just read items
app.get('/', async (req, res) =>{
  const contentsInString = await fs.promises.readFile(`data.json`, {encoding: 'utf8' });
  
  console.log(typeof contentsInString )
  //
  // convert string to object
  const jsonContentObj = JSON.parse(contentsInString)
  console.log(`jsonContentObject`, jsonContentObj)
  console.log(`jsonContentObject type`,typeof jsonContentObj)
  const {items} = jsonContentObj
  let all = ""
  for (let i = 0; i < items.length; i += 1 ){
        all += (`- ${items[i]}<br>`); 
        }
  res.send(all)
  // alternative with helper function
  // let itemsList = createItems(items)
  // res.send(itemsList)

});

// Adding task
let newItem = process.argv[3]
app.get('/add', async (req, res) =>{
  const contentsInString = await fs.promises.readFile(`data.json`, {encoding: 'utf8' });
  console.log(typeof contentsInString )
  // convert string to object
  const jsonContentObj = JSON.parse(contentsInString)
  console.log(`jsonContentObject`, jsonContentObj)
  console.log(`jsonContentObject type`,typeof jsonContentObj)
  const {items} = jsonContentObj
  items.push(newItem)
  let newjsonObj = {items : items}
  // 3. write it back to your json file
  await fs.promises.writeFile("data.json", JSON.stringify(newjsonObj),{encoding: 'utf8' })
  res.send(`I have added ${newItem} to your to-do list.`)
});


// Comfortable
// Just read items
app.get('/comfortable_show', async (req, res) =>{
  const contentsInString = await fs.promises.readFile(`data.json`, {encoding: 'utf8' });
  console.log(typeof contentsInString )
  // convert string to object
  const jsonContentObj = JSON.parse(contentsInString)
  console.log(`jsonContentObject`, jsonContentObj)
  console.log(`jsonContentObject type`,typeof jsonContentObj)
  const {items} = jsonContentObj
  let all = ""
  for (let i = 0; i < items.length; i += 1 ){
        all += (`${i+1}. ${items[i]}<br>`); 
        }
  let allContents = `To-Do: <br>` + all + `<br><br> Done:`
  res.send(allContents)
  // alternative with helper function
  // let itemsList = createItems(items)
  // res.send(itemsList)
});

let taskNumber = process.argv[3]
app.get('/complete', async (req, res) =>{
  const contentsInString = await fs.promises.readFile(`data.json`, {encoding: 'utf8' });
  console.log(typeof contentsInString )
  // convert string to object
  const jsonContentObj = JSON.parse(contentsInString)
  console.log(`jsonContentObject`, jsonContentObj)
  console.log(`jsonContentObject type`,typeof jsonContentObj)
  const {items} = jsonContentObj
  let doneList = []
  console.log(parseInt(taskNumber), typeof taskNumber)
  const itemIndex = parseInt(taskNumber) - 1
  let doneItem = items[itemIndex]
  console.log(`type of done Item`, doneItem)
  doneList.push(doneItem)
  let reducedList = items.splice(itemIndex,1)
  // let newitemObj = {items : reducedList}
  console.log("reducedList", items)
  // let newDoneObj = {done : doneList}
  console.log(`doneList`,  doneList)
  let itemsNDone={};
  itemsNDone.items=items; 
  itemsNDone.done=doneList; 
  // 3. write it back to your json file
  await fs.promises.writeFile("data.json", JSON.stringify(itemsNDone),{encoding: 'utf8' })
  res.send(`I have marked "${doneItem}" as complete.`)
});


app.listen(port)
// {"items":["wash the car", "cook dinner", "buy bananas", "buy flowers"]}