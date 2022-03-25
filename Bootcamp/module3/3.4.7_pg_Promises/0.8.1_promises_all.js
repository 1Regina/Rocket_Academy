// import express from "express";
import pg from "pg";



// Initialise DB connection
const { Pool } = pg;
const pgConnectionConfigs = {
  user: "regina",
  host: "localhost",
  database: "regina",
  port: 5432, // Postgres server always runs on this port by default
};
const pool = new Pool(pgConnectionConfigs);

// Parallel
// const results = await Promise.all([
//   pool.query('SELECT * FROM recipes'),
//   pool.query('SELECT * FROM users'),
//   pool.query('SELECT * FROM categories'),
//   // allResults is an array of results whose elements correspond
//   // to the elements in the Promise.all parameter array
// ])
// .then((allResults) => {
//   console.log(allResults);
//   console.log (`results` , allResults[2].rows)
// });



//////////////// Compare sequential vs Parallel
// sequential

// const randomNumber = () => Math.floor(Math.random() * 1000);

// const setDelay = (delay) => {
//   console.log(`delaying ${delay}`);

//   return new Promise((resolve, reject) => {
//     setTimeout(() => resolve(delay), delay);
//     console.log(`in the new promise`)
//   });
// };

// // do nested setTimeouts, one after the other
// const result = setDelay(randomNumber()).then((resultOne) => {
//   console.log(`complete first timeOut`)
//   return setDelay(randomNumber()).then((resultTwo) => {
//       console.log(`complete second timeOut`)
//     return setDelay(randomNumber()).then((resultThree) => {
//         console.log(`complete third timeOut`)
//       const anything =  setDelay(randomNumber());
//        console.log(`complete fourth timeOut`)
//        return anything
//     });
    
//   });
// });

// // run this when they are all done
// result.then((lastDelay) => {
//   console.log('all done');
//   console.log(lastDelay);
// });


const randomNumber = () => Math.floor(Math.random() * 1000);

const setDelaySeq = (delay) => {
  console.log(`delaying Sequentially ${delay}`);

  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(delay), delay);
    console.log(`in the new promise`)
  });
};

// do nested setTimeouts, one after the other
const result = setDelaySeq(randomNumber()).then((resultOne) => {
  console.log(`complete first sequenquantial timeOut`)
  return setDelaySeq(randomNumber()).then((resultTwo) => {
      console.log(`complete second sequenquantial timeOut`)
    return setDelaySeq(randomNumber()).then((resultThree) => {
        console.log(`complete third sequenquantial timeOut`)
      const anything =  setDelaySeq(randomNumber());
       console.log(`complete fourth sequenquantial timeOut`)
       return anything
    });
    
  });
});

// run this when they are all done
result.then((lastDelay) => {
  console.log('all done with sequential');
  console.log(lastDelay);
});

// ########################//
// PARALLEL
// const randomNumber = () => Math.floor(Math.random() * 1000);

const setDelay = (delay) => {
  console.log(`delaying Parallelly: ${delay}`);

  return new Promise((resolve, reject) => {
    console.log(`in the new promise`)
    setTimeout(() => resolve(delay), delay);
  });
};

// start all the setTimeouts
// results is a Promise that resolves to an array of values that
// correspond to the resolve values of each element in the Promise.all
// parameter array.
const results = Promise.all([
  setDelay(randomNumber()),
  setDelay(randomNumber()),
  setDelay(randomNumber()),
  setDelay(randomNumber()),
]);

results.then((arrayOfResolvedValues) => {
  console.log('all done with Parallel');
  console.log(arrayOfResolvedValues);
});

