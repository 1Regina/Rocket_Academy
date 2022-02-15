import express from 'express';
import read from './jsonFileStorage.js';// bcos export default function read

const app = express();
const port = 3004

app.use(express.static('public'));

// Set view engine
app.set('view engine', 'ejs');

app.get('/', (request, response) => {

  read(`data.json`, (error, jsonObjContent) =>{
    if (error) {
    console.error(`read error`, error);
    return;
  }

  const data = jsonObjContent.sightings;

  const numofTags = {
    index: data.length
  }
  response.render('sightings', numofTags);
  });
  // Return HTML to client, merging "index" template with supplied data.
 
});

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