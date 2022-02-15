
import express from 'express';
import { read } from './jsonFileStorage.js';

// const express = require('express');
const app = express()
const port = 3004

// const handleIncomingRequestFileRead = (request, response) => {
//   console.log('request came in');
//   read('data.json', (err, jsonContentObj) => {
//     console.log(`where is my object`,jsonContentObj);
//     response.send(jsonContentObj);
//   });
//   console.log(`sighted`)
// };

// app.get('/sightings/:index', handleIncomingRequestFileRead);

app.get('/sightings/:index', (request, response) => {
   console.log('request came in');
    read('data.json', (err, jsonContentObj)=> {
    console.log(`where is my object`,jsonContentObj);
    // response.send(jsonContentObj);
    const content = `
    <html>
      <body>
        <h1>${jsonContentObj.sightings[request.params.index].YEAR}</h1>
        <h1>${jsonContentObj.sightings[request.params.index].STATE}</h1>
        <h1>${jsonContentObj.sightings[request.params.index].OBSERVED}</h1>
        </body>
    </html>
  `;
  response.send(content);
   })
})

let stateSeen = ""
app.get('/year-sightings/:year', (request, response) => {
 
   console.log('request came in');
     console.log(request.params.year)
    read('data.json', (err, jsonContentObj)=> {
     
    jsonContentObj.sightings.forEach(element => {

      if (element.YEAR === request.params.year) {
        console.log(element.YEAR)
        console.log(element.STATE)
        console.log(typeof(element.STATE))
        stateSeen += ( element.YEAR + "<br>"+ element.STATE + "<br>")
        console.log(stateSeen)
      }
    })
    
    // const content = `
    // <html>
    //   <body>
    //     <h1>${response.send(stateSeen)}
    //     </h1>          
    //     </body>
    // </html>
    // `;
    
    response.send(stateSeen)
    })
    // response.send(content)
})
  



app.listen(port,() => {
  console.log(`so sighted`)
})