// import express from "express"; // to serve server
// import methodOverride from 'method-override'; // to override POST requests with query param ?_method=PUT 
import pg from 'pg'; //import { pool } from "./constant.js";
// import jsSHA from 'jssha'; // for hashing password
// import cookieParser from "cookie-parser"; // for response.cookie and response.clearCookie("loggedIn");
// import bodyParser from 'body-parser'; //cookie


// export const app = express();
// // Set the view engine to ejs
// app.set("view engine", "ejs");
// // Override POST requests with query param ?_method=PUT to be PUT requests
// app.use(methodOverride('_method'));
// // Configure Express to parse request body data into request.body
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(bodyParser.json());


const {Pool} = pg;
// set the way we will connect to the server
const pgConfig = {
  user: 'regina',
  host: 'localhost',
  database: 'many_to_many', 
  port: 5432,
}

const pool = new Pool(pgConfig);
pool.connect();

const handleQueryError = (queryError) => {
  console.error('You messed up: ', queryError);
  console.log('Error executing query', queryError.stack);
  //client.end();
};

const handleEmptyResult = () => {
  console.log('no results!');
  //client.end();
};

const whenQueryDone = (error, result) => {
  if (error) {
    handleQueryError(error);
    return;
  }

  if (result.rows.length <= 0) {
    handleEmptyResult;
    return;
  }
};

const command = process.argv[2]


if (command === "insertexercises") {
  const exercise = process.argv[3];
  let insertQuery = `INSERT INTO exercises (name) VALUES ('${exercise}') returning *;`
  pool.query(insertQuery, (error, results) => {
    if (error) {
      console.log('Error executing query', error.stack);
      response.status(503).send(results.rows);
      return;
    } 
    console.log(`user just enter`, results.rows[0])
  })
}

if (command === "exercises") {
  let displayAllQuery = `SELECT * FROM exercises`
  pool.query(displayAllQuery, (displayError, displayResults) => {
    whenQueryDone(displayError, displayResults);
    const allExercises = displayResults.rows
    for (let i=0; i< allExercises.length; i+=1) {
      console.log( `${i+1}. ${allExercises[i].name}` )
    }
  })
}

const [appName, scriptName, cmdName, workoutName, workoutDate, ...workoutExercises] = process.argv;

if (cmdName === "add-workout"){
  let workout_id 
  let insertWorkoutQuery = `INSERT INTO workouts (name, date) VALUES ('${workoutName}', '${workoutDate}') RETURNING * ;`
  pool.query(insertWorkoutQuery, (error, results) => {
    if (error){
     whenQueryDone(error, results);
    }
      workout_id = results.rows[0].id
      // affect the exercise_workout table
      for (let i=0; i< workoutExercises.length; i+=1) {

        let insertEx_WOutQuery = `INSERT INTO exercise_workouts (exercise_id, workout_id) VALUES (${workoutExercises[i]}, ${workout_id})`
        pool.query(insertEx_WOutQuery,(errorW, resultsW) => {
          if (errorW){
          whenQueryDone(errorW, resultsW);
          } 
          
        })
      } return 
  })
}



