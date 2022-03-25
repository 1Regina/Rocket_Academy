import express from 'express';
import pg from 'pg';
import methodOverride from 'method-override';
import cookieParser from 'cookie-parser';
import jsSHA from 'jssha';

const PORT = process.argv[2] || 3004;
const SALT = 'birds are awesome';

/* ==============================================
*  ==============================================
*  ==============================================
*  ==============================================
*  ==============================================
*  ==============================================
*
*         Postgres Setup
*
*  ==============================================
*  ==============================================
*  ==============================================
*  ==============================================
*  ==============================================
*  ==============================================
*  ==============================================
*/

const { Pool } = pg;

let pgConnectionConfigs;
if (process.env.ENV === 'PRODUCTION') {
  // determine how we connect to the remote Postgres server
  pgConnectionConfigs = {
    user: 'postgres',
    // set DB_PASSWORD as an environment variable for security.
    password: process.env.DB_PASSWORD,
    host: 'localhost',
    database: '<DATABASE_NAME>',
    port: 5432,
  };
} else {
  // determine how we connect to the local Postgres server
  pgConnectionConfigs = {
    user: 'regina',
    host: 'localhost',
    database: 'regina',
    port: 5432,
  };
}

const pool = new Pool(pgConnectionConfigs);

/* ==============================================
*  ==============================================
*  ==============================================
*  ==============================================
*  ==============================================
*  ==============================================
*
*         Express Setup
*
*  ==============================================
*  ==============================================
*  ==============================================
*  ==============================================
*  ==============================================
*  ==============================================
*  ==============================================
*/

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(cookieParser());

// .................................
// .................................
// .................................
//    Auth Middleware
// .................................
// .................................

const getHash = (input) => {
  // create new SHA object
  const shaObj = new jsSHA('SHA-512', 'TEXT', { encoding: 'UTF8' });

  // create an unhashed cookie string based on user ID and salt
  const unhashedString = `${input}-${SALT}`;

  // generate a hashed cookie string using SHA object
  shaObj.update(unhashedString);

  return shaObj.getHash('HEX');
};

app.use((request, response, next) => {
  // set the default value
  request.isUserLoggedIn = false;

  // check to see if the cookies you need exists
  if (request.cookies.loggedIn && request.cookies.userId) {
    // get the hased value that should be inside the cookie
    const hash = getHash(request.cookies.userId);

    // test the value of the cookie
    if (request.cookies.loggedIn === hash) {
      request.isUserLoggedIn = true;
    }
  }

  next();
});

/* ==============================================
*  ==============================================
*  ==============================================
*  ==============================================
*  ==============================================
*  ==============================================
*
*         Auth Routes
*
*  ==============================================
*  ==============================================
*  ==============================================
*  ==============================================
*  ==============================================
*  ==============================================
*  ==============================================
*/

app.get('/signup', (req, res) => {

  if( req.isUserLoggedIn === true ){
    res.redirect('/');
    return;
  }

  const html = `
    <html>
      <body>
        <h1>Sign Up!</h1>
        <form method="POST" action="/signup">
          <label>email</label><input name="email"/>
          <label>password</label><input name="password"/>
          <input type="submit"/>
        </form>
      </body>
    </html>
  `;

  res.send(html);
});

// submits the data in the sign up form
app.post('/signup', (req, res) => {

  if( req.isUserLoggedIn === true ){
    res.redirect('/');
    return;
  }

  const shaObj = new jsSHA('SHA-512', 'TEXT', { encoding: 'UTF8' });

  // TODO: further form validation
  if( !req.body.email || !req.body.password ){
    res.redirect('/signup');
  }

  shaObj.update(req.body.password);

  const hashedPassword = shaObj.getHash('HEX');

  const newUserQuery = 'INSERT INTO users (email, password) VALUES ($1, $2)';
  const inputData = [req.body.email, hashedPassword];

  // create the new user
  pool.query(newUserQuery, inputData)
    .then(newUserQueryResult => {

      // TODO: create the cookie right here instead
      res.redirect('/login');
    }).catch(error => {
      console.log('error', error);
      res.status(500).send('Whoops, error.');
    });
});

// displays the login form
app.get('/login', (req, res) => {

  if( req.isUserLoggedIn === true ){
    res.redirect('/');
    return;
  }

  const html = `
    <html>
      <body>
        <h1>Login!</h1>
        <form method="POST" action="/login">
          <label>email</label><input name="email"/>
          <label>password</label><input name="password"/>
          <input type="submit"/>
        </form>
      </body>
    </html>
  `;

  res.send(html);
});

// submits the login data
app.post('/login', (req, res) => {
  if( req.isUserLoggedIn === true ){
    res.redirect('/');
    return;
  }

  const userQuery = `SELECT * FROM users WHERE email=$1`;
  pool.query(userQuery, [req.body.email])
    .then(emailQueryResult => {

      // can't find the user by email
      if (emailQueryResult.rows.length === 0) {
        res.status(403).send('not successful');
        return;
      }

      const shaObj = new jsSHA('SHA-512', 'TEXT', { encoding: 'UTF8' });
      shaObj.update(req.body.password);
      const hashedPassword = shaObj.getHash('HEX');

      const user = emailQueryResult.rows[0];
      console.log(`this is the user`, user)

      // password is incorrect
      if (user.password !== hashedPassword) {
        res.status(403).send('not successful');
      }

      const shaObj1 = new jsSHA('SHA-512', 'TEXT', { encoding: 'UTF8' });

      shaObj1.update(`${user.id}-${SALT}`);
      const hashedCookieString = shaObj1.getHash('HEX');

      // set the loggedin cookies
      res.cookie('loggedIn', hashedCookieString);
      res.cookie('userId', user.id);

      res.redirect('/');

    }).catch(error => {
      console.log('error', error);
      res.status(500).send('Whoops, error.');
    });
});

// logs the user out
app.delete('/logout', (req, res) => {
  res.clearCookie('loggedIn');
  res.clearCookie('userId');
  res.redirect('/login');
});


/* ==============================================
*  ==============================================
*  ==============================================
*  ==============================================
*  ==============================================
*  ==============================================
*
*         App Routes
*
*  ==============================================
*  ==============================================
*  ==============================================
*  ==============================================
*  ==============================================
*  ==============================================
*  ==============================================
*/


// ....................................
// ....................................
// ....................................
//
//  Middleware for every route that
//  completely restricts user access
// ....................................
// ....................................
// ....................................

const restrictToLoggedIn = (request, response, next) => {

  // is the user logged in? Use the other middleware.
  if( request.isUserLoggedIn === false ){
    response.redirect('/login');
    return;
  }else{

    // The user is logged in. Get the user from the DB.
    const userQuery = `SELECT * FROM users WHERE id=$1`;
    pool.query(userQuery, [request.cookies.userId])
      .then(userQueryResult => {

        // can't find the user based on their cookie.
        if( userQueryResult.rows.length === 0 ){
          response.redirect('/login');
          return;
        }

        // attach the DB query result to the request object.
        request.user = userQueryResult.rows[0];

        // go to the route callback.
        next();
      }).catch(error => {
        response.redirect('/login');
      });
  }
};

// ................................................
// ................................................
// ................................................
//
// a route that the user *MUST* be logged in to see
//
// ................................................
// ................................................
// ................................................
app.get('/dashboard', restrictToLoggedIn, (req, res) => {
  const html = `
    <html>
      <body>
        <h1>Dashboard!</h1>
        <h2>Welcome: ${req.user.email}</h2>
      </body>
    </html>
  `;
  res.send(html);
});

app.get('/', (req, res) => {

  let userState = '';

  // render different contents on this page depending
  // on if the user is logged in or not
  if( req.isUserLoggedIn === true ){
    userState = `
      <div>
        <a href="/dashboard">dashboard</a>
        <form method="POST" action="/logout?_method=DELETE">
          <input type="submit" value="logout"/>
        </form>
      </div>
    `;
  }else{
    userState = `
      <div>
        <a href="/login">login</a>
        <a href="/signup">signup</a>
      </div>
    `;
  }

  const html = `
    <html>
      <body>
        <h1>Hello!</h1>
        ${userState}
      </body>
    </html>
  `;
  res.send(html);
});

app.listen(PORT);