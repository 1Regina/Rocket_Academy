import pg from 'pg'; //import { pool } from "./constant.js";

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
// == BASE Output Exercises
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
// == BASE Create Workouts (With Existing Exercises)
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

// BASE == Get Workouts with Specific Exercise with Exercise ID
if (cmdName === "get-workouts-by-exercise") {
  const exer_ID = process.argv[3]
  let findWorkOutQuery = `SELECT workouts.name, date, exercise_id, workout_id FROM workouts INNER JOIN exercise_workouts ON workouts.id = exercise_workouts.workout_id WHERE exercise_id = ${exer_ID} ;`
  pool.query(findWorkOutQuery, (error, results) => {
    if (error) {
      whenQueryDone(error, results)
    } 

    console.log(`Workout for exercise id ${exer_ID} is `)
    let workouts =  results.rows       
    workouts.forEach(working => console.log(`\t- ${working.name}`))
  })
}

