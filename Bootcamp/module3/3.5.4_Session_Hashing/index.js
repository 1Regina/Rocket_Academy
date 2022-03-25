import express from "express";
import pg from 'pg'; //import { pool } from "./constant.js";
import cookieParser from "cookie-parser";
import bodyParser from 'body-parser';
import jsSha from 'jssha';

export const app = express();
// Set the view engine to ejs
app.set("view engine", "ejs");
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

// the SALT is a constant value.
// In practice we would not want to store this "secret value" in plain text in our code.
// We will learn methods later in Coding Bootcamp to obfuscate this value in our code.
const SALT = 'bananas are delicious';


// SIGNING UP -- NO COOKIE
app.get("/signUp", (request, response) => {
   response.render(`signup`);
});

app.post('/signUp', (request, response) =>{
  const {email, password} = request.body;
  console.log(email, password);
  pool.query(`INSERT INTO users (email, password) VALUES ('${email}', '${password}')`, 
  (error, result) => {
    if (error) {
      console.log(error);
      return response.status(503).send('error');
    }
    return response.send (`User added : ${email}` );  
  })
});

// LOGIN -- insert cookie
app.get("/login", (request, response) => {
   response.render(`loginForm`);
});

app.post("/login", (request, response) => {
  console.log("request came in");
  const values = [request.body.email];
  console.log(values);

  pool.query("SELECT * from users WHERE email=$1", values, (error, result) => {
    if (error) {
      console.log("Error executing query", error.stack);
      response.status(503).send(result.rows);
      return;
    }

    if (result.rows.length === 0) {
      // we didnt find a user with that email.
      // the error for password and user are the same. don't tell the user which error they got for security reasons, otherwise people can guess if a person is a user of a given service.
      response.status(403).send("sorry No such member!");
      return;
    }
    //retrieve database record matching the login email
    const user = result.rows[0];

    if (user.password === request.body.password) {
      // create loggedIn cookie , set it to true
      response.cookie("loggedIn", true);
      response.send("logged in!");
    } else {
      // password didn't match
      // the error for password and user are the same. don't tell the user which error they got for security reasons, otherwise people can guess if a person is a user of a given service.
      response.status(403).send("sorry!");
    }
  });
});

// app.get("/user-dashboard", (request, response) => {
//   if (request.cookies.loggedIn === undefined) {
//     response.status(403).send("sorry, please log in!");
//     return;
//   }
//   response.status(200).send("To do: dashboard");
// });

// LOG OUT clear cookie
app.get("/logout", (request, response) => {
  response.clearCookie("loggedIn");
  response.send("logged out!");
});

app.listen(3004,() => {
  console.log('server is running...');
});