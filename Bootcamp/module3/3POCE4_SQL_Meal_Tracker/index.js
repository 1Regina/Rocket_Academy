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
  console.log(`inputData array`, inputData)
  sqlQuery = 'INSERT INTO meal_tracker ( type, description, amount_of_alcohol, was_hungry_before_eating) VALUES ($1, $2, $3, $4)';
  client.query(sqlQuery, inputData, whenQueryDone);
}
// if (command === 'report') {
//   sqlQuery = 'SELECT * FROM meal_tracker';
//   client.query(sqlQuery, whenQueryDone);
// }

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
  console.log(editDetails)
  const sqlQuery = `UPDATE meal_tracker SET ${editDetails[1]} = '${editDetails[2]}' WHERE id = ${editDetails[0]}`;
  // const sqlQuery = `UPDATE meal_tracker SET ${process.argv[4]} = '${process.argv[5]}' WHERE id=${process.argv[3]}`;
  client.query(sqlQuery, whenEditQueryDone);
}  

// COMFORTABLE REPORT by attribute
function filterByValue(array, string) {
    return array.filter(o =>
        Object.keys(o).some(k => String(o[k]).toLowerCase().includes(String(string).toLowerCase())));
}

let attributeWord = "";
if (process.argv[3] === "hungry") {
  attributeWord = true
} else if (process.argv[3] === "not-hungry"){
  attributeWord = false
} else {
  attributeWord = process.argv[3]
}

// make boolean in was_hungry_before_eating to a string
const formatHungryMeals = (resultArray) => {
  let ifHungry = "";
  for (i=0; i< resultArray.length; i+=1){
    if(resultArray[i].was_hungry_before_eating === true) {
      ifHungry = "feeling hungry"
    } else {
      ifHungry = "feeling not hungry"
    }
    console.log(`${resultArray[i].id} - ${resultArray[i].type} - ${resultArray[i]. description} - ${resultArray[i].amount_of_alcohol} - ${ifHungry}`)
  }
}

const whenReportQueryAttribute = (error, result) => {
  let filteredRecords; 
  // this error is anything that goes wrong with the query
  if (error) {
    console.log(`error`, error);
  } else {
  // console.log(`result.rows output`, result.rows)
  filteredRecords =  filterByValue(result.rows, attributeWord);
  }
  // Method 1 output table contents as is
  console.log (`filtered Records`, filteredRecords)

  // Method 2 outputing via helper function replace boolean
  formatHungryMeals(filteredRecords);

  // close the connection
  client.end();

}

if (command === "report") {
  const sqlQuery = `SELECT * FROM meal_tracker`;
  client.query(sqlQuery, whenReportQueryAttribute);
}

// MORE COMFORTABLE ADD Created_At Column
if (command === "add created_at column") {
  const addColumnQuery = "ALTER TABLE meal_tracker ADD COLUMN IF NOT EXISTS created_at DATE"
  client.query(addColumnQuery)
}

const whenInsertQueryDone = (error, result) => {
  // this error is anything that goes wrong with the query
  if (error) {
    console.log(`error`, error);
  } else {
    console.log(`results`, result.rows);
  }
    // close the connection
    client.end();
}

if (command === "insertDate") { 
  // insert the current time into it
  const now = new Date().toLocaleString("en-US", {timeZone: "America/New_York"})
  // SPECIFY the dates
  const now = new Date('2022-02-28T12:00:00Z').toLocaleString("en-US", {timeZone: "America/New_York"})

  // now.toLocaleString('fi-FI', { timeZone: 'Europe/Helsinki' });
  console.log(`process.agrv[3]`, typeof process.argv[3], process.argv[3])
  // USE edit to populate the table
  const insertDatesText = `UPDATE meal_tracker SET created_at = '${now}' WHERE id = ${process.argv[3]}`;
  client.query(insertDatesText, whenInsertQueryDone);
}