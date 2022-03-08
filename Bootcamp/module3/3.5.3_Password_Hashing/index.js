import express from "express"; // to serve server
import methodOverride from 'method-override'; // to override POST requests with query param ?_method=PUT 
import pg from 'pg'; //import { pool } from "./constant.js";
import jsSHA from 'jssha'; // for hashing password
import cookieParser from "cookie-parser"; // for response.cookie and response.clearCookie("loggedIn");
import bodyParser from 'body-parser'; //cookie


export const app = express();
// Set the view engine to ejs
app.set("view engine", "ejs");
// Override POST requests with query param ?_method=PUT to be PUT requests
app.use(methodOverride('_method'));
// Configure Express to parse request body data into request.body
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());


const {Pool} = pg;
// set the way we will connect to the server
const pgConfig = {
  user: 'regina',
  host: 'localhost',
  database: 'regina', 
  port: 5432,
}

const pool = new Pool(pgConfig);

// SIGNING UP -- NO COOKIE
app.get("/signUp", (request, response) => {
   response.render(`signup`);
});

// ====== WITHOUT HASHED PASSWORD
// app.post('/signUp', (request, response) =>{
//   const {email, password} = request.body;
//   console.log(email, password);
//   pool.query(`INSERT INTO users (email, password) VALUES ('${email}', '${password}')`, 
//   (error, result) => {
//     if (error) {
//       console.log(error);
//       return response.status(503).send('error');
//     }
//     return response.send (`User added : ${email}` );  
//   })
// });
// ====================== With Hashed password 
app.post('/signUp', (request, response) => {
  // initialise the SHA object
  const shaObj = new jsSHA('SHA-512', 'TEXT', { encoding: 'UTF8' });
  // input the password from the request to the SHA object
  shaObj.update(request.body.password);
  // get the hashed password as output from the SHA object
  const hashedPassword = shaObj.getHash('HEX');

  // store the hashed password in our DB
  const values = [request.body.email, hashedPassword, request.body.password];
  console.log(`values to post`, values)
  pool.query(
    'INSERT INTO users (email, hashed_password, password) VALUES ($1, $2, $3)',
    values,
    (error, result) => {
      if (error) {
      console.log("Error executing query", error.stack);
      response.status(503).send(result.rows);
      return;
      }
      const email = values[0]
      return response.send (`User added : ${email}` );  
    }
  );
});
// ======================

// LOGIN -- insert cookie
app.get("/login", (request, response) => {
   response.render(`loginForm`);
});

// ======= WITHOUT Hashed Password
// app.post("/login", (request, response) => {
//   console.log("request came in");
//   const values = [request.body.email];
//   console.log(values);

//   pool.query("SELECT * from users WHERE email=$1", values, (error, result) => {
//     if (error) {
//       console.log("Error executing query", error.stack);
//       response.status(503).send(result.rows);
//       return;
//     }

//     if (result.rows.length === 0) {
//       // we didnt find a user with that email.
//       // the error for password and user are the same. don't tell the user which error they got for security reasons, otherwise people can guess if a person is a user of a given service.
//       response.status(403).send("sorry!");
//       return;
//     }
//     //retrieve database record matching the login email
//     const user = result.rows[0];

//     if (user.password === request.body.password) {
//       // create loggedIn cookie , set it to true
//       response.cookie("loggedIn", true);
//       response.send("logged in!");
//     } else {
//       // password didn't match
//       // the error for password and user are the same. don't tell the user which error they got for security reasons, otherwise people can guess if a person is a user of a given service.
//       response.status(403).send("sorry!");
//     }
//   });
// });

// app.get("/user-dashboard", (request, response) => {
//   if (request.cookies.loggedIn === undefined) {
//     response.status(403).send("sorry, please log in!");
//     return;
//   }
//   response.status(200).send("To do: dashboard");
// });


// =============== WITH HASHED PASSWORD

app.post('/login', (request, response) => {
  // retrieve the user entry using their email
  const values = [request.body.email];
  pool.query('SELECT * from users WHERE email=$1', values, (error, result) => {
    // return if there is a query error
    if (error) {
      console.log('Error executing query', error.stack);
      response.status(503).send(result.rows);
      return;
    }

    // we didnt find a user with that email
    if (result.rows.length === 0) {
      // the error for incorrect email and incorrect password are the same for security reasons.
      // This is to prevent detection of whether a user has an account for a given service.
      response.status(403).send('login failed!');
      return;
    }

    // get user record from results
    const user = result.rows[0];
    // initialise SHA object
    const shaObj = new jsSHA('SHA-512', 'TEXT', { encoding: 'UTF8' });
    // input the password from the request to the SHA object
    shaObj.update(request.body.password);
    // get the hashed value as output from the SHA object
    const hashedPassword = shaObj.getHash('HEX');

    // If the user's hashed password in the database does not match the hashed input password, login fails
    if (user.hashed_password !== hashedPassword) {

      // the error for incorrect email and incorrect password are the same for security reasons.
      // This is to prevent detection of whether a user has an account for a given service.
      response.status(403).send('login failed! Password is incorrect');
      return;
    }

    // The user's password hash matches that in the DB and we authenticate the user.
    response.cookie('loggedIn', true);
    response.send('logged in!');
  });
});

// LOG OUT clear cookie
app.get("/logout", (request, response) => {
  response.clearCookie("loggedIn");
  response.send("logged out!");
});

app.listen(3004,() => {
  console.log('server is running...');
});