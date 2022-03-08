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
let workout_id 
const insertWorkingOut = () => {
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

if (cmdName === "add-workout"){
  // let workout_id 
  // let insertWorkoutQuery = `INSERT INTO workouts (name, date) VALUES ('${workoutName}', '${workoutDate}') RETURNING * ;`
  // pool.query(insertWorkoutQuery, (error, results) => {
  //   if (error){
  //    whenQueryDone(error, results);
  //   }
  //     workout_id = results.rows[0].id
  //     // affect the exercise_workout table
  //     for (let i=0; i< workoutExercises.length; i+=1) {

  //       let insertEx_WOutQuery = `INSERT INTO exercise_workouts (exercise_id, workout_id) VALUES (${workoutExercises[i]}, ${workout_id})`
  //       pool.query(insertEx_WOutQuery,(errorW, resultsW) => {
  //         if (errorW){
  //         whenQueryDone(errorW, resultsW);
  //         } 
          
  //       })
  //     } return 
  // })
  insertWorkingOut();
}


// BASE == Get Workouts with Specific Exercise with Exercise ID
const exercise_ID = process.argv[3];   
const findWorkoutByEx_ID = (exer_ID) => {   
  let findWorkOutQuery = `SELECT workouts.name, date, exercise_id, workout_id FROM workouts INNER JOIN exercise_workouts ON workouts.id = exercise_workouts.workout_id WHERE exercise_id = ${exer_ID} ;`
  pool.query(findWorkOutQuery, (error, results) => {
    if (error) {
      whenQueryDone(error, results)
    } 

    // console.log(`Workout for exercise id ${exer_ID} is `)
    console.log(`Workout for the exercise is `)
    let workouts =  results.rows       
    workouts.forEach(working => console.log(`\t- ${working.name}`))
  })
};

if (cmdName === "get-workouts-by-exercise") {
  findWorkoutByEx_ID (exercise_ID)
};  

// COMFORTABLE == Get Workouts with Specific Exercise with Exercise Name
const exercise_name = process.argv[3];
if (cmdName === "c-get-workouts-by-exercise") {
  let findEx_IDQuery = `SELECT * FROM exercises WHERE name = '${exercise_name}'`
  pool.query(findEx_IDQuery, (err, results) => {
    if (err) {
      console.log(`error`, err)
    } 
    let exer_ID = results.rows[0].id
    findWorkoutByEx_ID (exer_ID)
  })
 
};  

if (cmdName === "c-add-workout"){
    let insertWorkoutQuery = `INSERT INTO workouts (name, date) VALUES ('${workoutName}', '${workoutDate}') RETURNING * ;`
    pool.query(insertWorkoutQuery, (error, results) => {
      if (error) {
        whenQueryDone(error, results);
      }
      workout_id = results.rows[0].id
      // affect the exercise_workout table
      for (let i=0; i< workoutExercises.length; i+=1) {
        console.log(`${workoutExercises[i]}`)
        let findQuery = `SELECT * FROM exercises WHERE name = '${workoutExercises[i]}';`
        pool.query(findQuery,(findError, findResults) => {
          if (findError) {
            whenQueryDone(findError, findResults)
          } 
          console.log(`results`, findResults.rows[0])
          let exercising_id =  findResults.rows[0].id
          let insertEx_WOutQuery = `INSERT INTO exercise_workouts (exercise_id, workout_id) VALUES (${exercising_id}, ${workout_id})`
          pool.query(insertEx_WOutQuery,(errorW, resultsW) => {
            if (errorW) {
              whenQueryDone(errorW, resultsW);
            }             
          })
        })  
      } 
    })
};