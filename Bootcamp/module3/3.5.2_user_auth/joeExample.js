import express from 'express';
import pg from 'pg';
import bodyParser from 'body-parser';

const app = express();
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


app.listen(3000,() => {
  console.log('server is running...');
});