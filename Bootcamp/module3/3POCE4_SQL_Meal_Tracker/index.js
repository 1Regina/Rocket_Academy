const pg = require ('pg');
const {Client} = pg; 

// set the way we will connect to the server
const pgConnectionConfigs = {
  user: 'regina',
  host: 'localhost',
  database: 'regina', // where meal_tracker table resides
  port: 5432,
}

// create the var we'll use
const client = new Client (pgConnectionConfigs) ; 

// make the correction to the server
client.connect();

// create the query done callback
const whenQueryDone = (error, result) => {
    // this error is anything that goes wrong with the query
    if (error) {
      console.log('error', error);
    } else {
      // rows key has the data
      // BASIE
      // console.log(`report results`, result.rows);
      /////@@@@@@@/////
      // COMFORTABLE -Sample Report Output
      let reportResults = result.rows;
      let ifHungry = "";
      for (i=0; i< reportResults.length; i+=1){
        if(reportResults.was_hungry_before_eating === true){
        ifHungry = "feeling_hungry"
      } else {
        ifHungry = "feeling stuffed"
      }
        console.log(`${reportResults[i].id} - ${reportResults[i].type} - ${reportResults[i].description} - ${reportResults[i].amount_of_alcohol} - ${ifHungry}`)
      }
      console.log(`input Data`, inputData)
    }
    // close the connection
    client.end();
};

// BASE
const command = process.argv[2];
const inputData = process.argv.slice(3,7);
// let inputData = []
// const type = process.argv[3];
// const description = process.argv[4];
// const amount_of_alcohol = process.argv[5];
// const was_hungry_before_eating = process.argv[6];
// inputData.push(type);
// inputData.push(description);
// inputData.push(amount_of_alcohol);
// inputData.push(was_hungry_before_eating);
let sqlQuery = '';

if (command === 'log') {
  sqlQuery = 'INSERT INTO meal_tracker ( type, description, amount_of_alcohol, was_hungry_before_eating) VALUES ($1, $2, Number($3), $4)';
  client.query(sqlQuery, inputData, whenQueryDone);
}
if (command === 'report') {
  sqlQuery = 'SELECT * FROM meal_tracker';
  client.query(sqlQuery, whenQueryDone);
}

// COMFORTABLE
const editDetails = process.argv.slice(3,6);
// let editID = process.argv[3];
// let editColumn = process.argv[4];
// let editValue = process.argv [5];


const whenEditQueryDone = (error, result) => {
  // this error is anything that goes wrong with the query
  if (error) {
    console.log(`error`, error);
  } else {
    console.log(`results`, result.rows);
    console.log(`editDetails`, editDetails);
  }
    // close the connection
    client.end();
}

if (command === 'edit') {
  sqlQuery = 'UPDATE meal_tracker SET $2 = $3 WHERE id = $1';
  client.query(sqlQuery, editDetails, whenEditQueryDone);
}  
