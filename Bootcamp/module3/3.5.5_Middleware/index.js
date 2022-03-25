import express from 'express';
import jsSha from 'jssha';
import path from "path";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import pg from 'pg';

const envFilePath = "some_salt.env";
dotenv.config({ path: path.normalize(envFilePath) });
const theEnvVar = process.env.MY_ENV_VAR;

console.log(theEnvVar);

// initialize salt as a global constant
const SALT = process.env.SALT;


const app = express()
const port = 3004

// 1. app.use
app.use((request, response, next) => {
  console.log('Every request:', request.path);
  next();
});


// 2. next
app.use((request, response, next) => {
  if (request.path == '/some-path') {
    response.status(404).send('sorry');
    return;
  }
  next();
});


// 3. Refactor Hash Logic into Helper Function
const getHash = (input) => {
  // create new SHA object
  const shaObj = new jsSha('SHA-512', 'TEXT', { encoding: 'UTF8' });

  // create an unhashed cookie string based on user ID and salt
  const unhashedString = `${input}-${SALT}`;

  // generate a hashed cookie string using SHA object
  shaObj.update(unhashedString);

  return shaObj.getHash('HEX');
};

console.log(`this is the hashed with salt`,getHash (`lala`))


// // 4. Write Custom Middleware to Verify Hash and Set Request Flag- FLOPPED
// app.use((request, response, next) => {
//   // set the default value
//   request.cookies.isUserLoggedIn = false;

//   // check to see if the cookies you need exists
//   if (request.cookies.loggedIn && request.cookies.userId) {
//     // get the hased value that should be inside the cookie
//     const hash = getHash(request.cookies.userId);

//     // test the value of the cookie
//     if (request.cookies.loggedIn === hash) {
//       request.isUserLoggedIn = true;
//     }
//   }

//   next();
// });

// 5. Customise Route Logic Based on User Auth
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());

app.get('/recipes', (request, response) => {
  if (request.cookies.isUserLoggedIn === false) {
    response.status(403).send('sorry');
    return;
  }
  // ...
});


// 6. Modify Auth Middleware to Query for Logged-In User Data. See akira.js Bootcamp\module3\3.5.5_Middleware\akira.js

// const { Pool } = pg;
// const pgConnectionConfigs = {
//   user: "regina",
//   host: "localhost",
//   database: "regina",
//   port: 5432, // Postgres server always runs on this port by default
// };
// const pool = new Pool(pgConnectionConfigs);


// // ...

// app.use((request, response, next) => {
//   // set the default value
//   request.cookies.isUserLoggedIn = false;

//   // check to see if the cookies you need exists
//   if (request.cookies.loggedIn && request.cookies.userId) {
//     // get the hased value that should be inside the cookie
//     const hash = getHash(request.cookies.userId);

//     // test the value of the cookie
//     if (request.cookies.loggedIn === hash) {
//       request.cookies.isUserLoggedIn = true;

//       // look for this user in the database
//       const values = [request.cookies.userId];

//       // try to get the user
//       pool.query('SELECT * FROM users WHERE id=$1', values, (error, result) => {
//         if (error || result.rows.length < 1) {
//           response.status(503).send('sorry!');
//           return;
//         }

//         // set the user as a key in the request object so that it's accessible in the route
//         request.user = result.rows[0];

//         next();
//       });

//       // make sure we don't get down to the next() below
//       return;
//     }
//   }

//   next();
// });

app.listen(port);


