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

// =========== BASE Enter a Meal AND See Meals So Far
// create the query done callback
const whenQueryDone = (error, result) => {
    // this error is anything that goes wrong with the query
    if (error) {
      console.log('error', error);
    } else {
      // rows key has the data
      // BASIE
      console.log(`report results`, result.rows);
    }
    // close the connection
    client.end();
};

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
// -------------BASE Enter a meal
if (command === 'log') {
  console.log(`inputData array`, inputData)
  sqlQuery = 'INSERT INTO meal_tracker ( type, description, amount_of_alcohol, was_hungry_before_eating) VALUES ($1, $2, $3, $4)';
  client.query(sqlQuery, inputData, whenQueryDone);
}
// -------------BASE See Meals So Far
// if (command === 'report') {
//   sqlQuery = 'SELECT * FROM meal_tracker';
//   client.query(sqlQuery, whenQueryDone);
// }

// // =============COMFORTABLE UPDATE report customize =========
// // create the query done callback
// const whenHungryQueryDone = (error, result) => {
//     // this error is anything that goes wrong with the query
//     if (error) {
//       console.log('error', error);
//     } else {
//       // rows key has the data
//       // BASIE
//       // console.log(`report results`, result.rows);
//       /////@@@@@@@/////
//       // COMFORTABLE -Sample Report Output
//       let reportResults = result.rows;
//       let ifHungry = "";
//       for (i=0; i< reportResults.length; i+=1){
//         if(reportResults[i].was_hungry_before_eating === true){
//         ifHungry = "feeling_hungry"
//       } else {
//         ifHungry = "feeling stuffed"
//       }
//         console.log(`${reportResults[i].id} - ${reportResults[i].type} - ${reportResults[i].description} - ${reportResults[i].amount_of_alcohol} - ${ifHungry}`)
//       }
//       console.log(`input Data`, inputData)
//     }
//     // close the connection
//     client.end();
// };

// if (command === 'report') {
//   sqlQuery = 'SELECT * FROM meal_tracker';
//   client.query(sqlQuery, whenHungryQueryDone);
// }


// // =============COMFORTABLE UPDATE Edit =========
// const editDetails = process.argv.slice(3,6);
// // let editID = process.argv[3];
// // let editColumn = process.argv[4];
// // let editValue = process.argv [5];

// const whenEditQueryDone = (error, result) => {
//   // this error is anything that goes wrong with the query
//   if (error) {
//     console.log(`error`, error);
//   } else {
//     console.log(`results`, result.rows);
//     console.log(`editDetails`, editDetails);
//   }
//     // close the connection
//     client.end();
// }

// if (command === 'edit') {
//   console.log(editDetails)
//   const sqlQuery = `UPDATE meal_tracker SET ${editDetails[1]} = '${editDetails[2]}' WHERE id = ${editDetails[0]}`;
//   // const sqlQuery = `UPDATE meal_tracker SET ${process.argv[4]} = '${process.argv[5]}' WHERE id=${process.argv[3]}`;
//   client.query(sqlQuery, whenEditQueryDone);
// }  


