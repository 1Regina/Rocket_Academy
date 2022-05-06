1. mkdir my-first-npm-project
2. cd my-first-npm-project
3. npm init -y
4. npm install express or npm i
6. go into package.json and add 
    ```
    "module": "true",
    "type": "module"
    ```
7. go to index.js and add this at the start of file
    ```
    import express from 'express';
    import { read } from './jsonFileStorage.js'; or import read from './jsonFileStorage.js';

    const app = express()
    const port = 3004
    ```
8. at the terminal to run the index.js, instead of the old `node index.js`, do `nodemon index.js -e js ` . **Nodemon** refresh changes so this eliminates the need to restart server all the time there is changes. Once we transition to SQL DBS, feel free to use nodemon without the -e argument.
9.  or simply `nodemon index.js`

## For EJS, do these also
10. npm install ejs
11. Set up the following file structure
    ```
        └── my-app
            ├── index.js
            └── public
                └── styles.css
            └── views
                └── fruit.ejs
    ```
12. in index.js, add these:
    ```
    import express from 'express';
    import {add} from './jsonFileStorage.js';

    const app = express();
    app.use(express.static('public'));
    // Configure Express to parse request body data into request.body
    app.use(express.urlencoded({ extended: false }));

    const port = 3004

    // Set view engine
    app.set('view engine', 'ejs');

    // app.get('/healthcheck', (req, res) => res.send('I M OK'))
    // Save new recipe data sent via POST request from our form
    app.get('/fruit', (request, response) => {.......
    .........
    // Return HTML to client, merging "index" template with supplied data.
    response.render('fruit', data);
    });

    app.listen(3004);
    ```
13. in fruit.ejs 
    ```
    <html>
    <head>
        <!-- AFTER HTML loads in browser, browser will request for CSS. -->
        <link rel="stylesheet" href="styles.css">
    </head>
    <body>
        <h2><%= fruit.name %></h2>
    </body>
    </html>
    ```
14. To bind POST requests, add in index.js
    ```
    app.use(express.urlencoded({ extended: false }));
    ```    
15. To enable PUT and DELETE method
    1.  cd in the app folder and `npm install method-override`
    2.  add in index.js
        ```
        import methodOverride from 'method-override';

        // Override POST requests with query param ?_method=PUT to be PUT requests
        app.use(methodOverride('_method'));
        ```
    3. Add the designated query parameter to the end of the form action URL so that Express can detect this as a PUT request. The form should still have method "POST". Read more in [here](https://bootcamp.rocketacademy.co/3-backend-applications/3.1-express-js/3.1.4-put-delete-requests).
    4. Changes to form url
       1. Example 1
            ```
            /recipe/1?_method=PUT
            ```
       2. Example 2.. Remember to encase the ENTIRE record in form tag     
            ```
            <form action="/sighting/<%=oneSighting.index%>/edit?_method=PUT" method="POST">
            ..all the other logic.. 
            </form>
            ```
    5. Delete uses splice to remove the data:
        ```
            app.delete('/recipe/:index', (request, response) => {
                // Remove element from DB at given index
                const { index } = request.params;
                read('data.json', (err, data) => {
                    data['recipes'].splice(index, 1);
                    write('data.json', data, (err) => {
                    response.send('Done!');
                    });
                });
                });
        ```         
    6.  The delete form may only contain a single button that triggers a DELETE request on the data with the specified index. Note it uses the Method Override parameter like we did with PUT requests above. If the full record viewing is not neceesary and delete button is only at a spot in the summary listing page, then the form action could be just over the button like below. See [summary listing example with delete button](C:\Users\regina\Desktop\Learning\Rocket_Academy\Rocket_Academy_Projects\bootcamp\project10_major_UFO_sightings\views\listing.ejs)
        1.  Example 1
            ```
            <form action="/recipe/<%= index %>?_method=DELETE" method="POST">
            <input type="submit" value="Delete" />
            </form>
            ```   
        2. Example 2
            ```
            <form action="/sighting/<%=i%>/delete?_method=DELETE" method="POST">
                <input type="submit" value="Delete" <%=id= delete_id %>/>   
                </form>   
            ```    
## For Postgresql
1. `npm install pg` to update package.json
2. See sample for index.js [here](https://bootcamp.rocketacademy.co/3-backend-applications/3.4-sql-applications/3.4.2-postgresql-node-app)      

## For cookie
1. `npm install cookie-parser`
2. [import cookieParser from "cookie-parser"](https://github.com/1Regina/Rocket_Academy/blob/0877f7c16bbe069a5bbaf3f7e5bc0f377dc45002/Bootcamp/module3/3.5.3_Password_Hashing/index.js#L5);
3. [app.use(cookieParser());](https://github.com/1Regina/Rocket_Academy/blob/0877f7c16bbe069a5bbaf3f7e5bc0f377dc45002/Bootcamp/module3/3.5.3_Password_Hashing/index.js#L16)
4. Set cookie with successful login in [index.js](https://github.com/1Regina/Rocket_Academy/blob/0877f7c16bbe069a5bbaf3f7e5bc0f377dc45002/Bootcamp/module3/3.5.3_Password_Hashing/index.js#L165) 
5. Remove cookie when [logout](https://github.com/1Regina/Rocket_Academy/blob/0877f7c16bbe069a5bbaf3f7e5bc0f377dc45002/Bootcamp/module3/3.5.3_Password_Hashing/index.js#L172) with  `response.clearCookie("loggedIn");`
## For cookie
1. `npm install body-parser`
2. [import bodyParser from 'body-parser';](https://github.com/1Regina/Rocket_Academy/blob/0877f7c16bbe069a5bbaf3f7e5bc0f377dc45002/Bootcamp/module3/3.5.3_Password_Hashing/index.js#L4)
3. [app.use(bodyParser.json());](https://github.com/1Regina/Rocket_Academy/blob/0877f7c16bbe069a5bbaf3f7e5bc0f377dc45002/Bootcamp/module3/3.5.3_Password_Hashing/index.js#L17)
4. See its use in [index.js](https://github.com/1Regina/Rocket_Academy/blob/master/Bootcamp/module3/3.5.3_Password_Hashing/index.js)

## For Password Hashing
1. npm install jssha
2. [import jsSHA from 'jssha';](https://github.com/1Regina/Rocket_Academy/blob/0877f7c16bbe069a5bbaf3f7e5bc0f377dc45002/Bootcamp/module3/3.5.3_Password_Hashing/index.js#L4)
3. For the signUp page (set a [app.get](https://github.com/1Regina/Rocket_Academy/blob/0877f7c16bbe069a5bbaf3f7e5bc0f377dc45002/Bootcamp/module3/3.5.3_Password_Hashing/index.js#L32) for SignUp and a [app.post](https://github.com/1Regina/Rocket_Academy/blob/0877f7c16bbe069a5bbaf3f7e5bc0f377dc45002/Bootcamp/module3/3.5.3_Password_Hashing/index.js#L50) too), [hashed the signup password](https://github.com/1Regina/Rocket_Academy/blob/0877f7c16bbe069a5bbaf3f7e5bc0f377dc45002/Bootcamp/module3/3.5.3_Password_Hashing/index.js#L52)
    ```
        app.post('/signUp', (request, response) => {
        // initialise the SHA object
        const shaObj = new jsSHA('SHA-512', 'TEXT', { encoding: 'UTF8' });
        // input the password from the request to the SHA object
        shaObj.update(request.body.password);
        // get the hashed password as output from the SHA object
        const hashedPassword = shaObj.getHash('HEX');

        // store the hashed password in our DB
        const values = [request.body.email, hashedPassword];
        pool.query(
            'INSERT INTO users (email, hashed_password) VALUES ($1, $2)',
            values,
            (error, result) => {
            if (error) {
            console.log("Error executing query", error.stack);
            response.status(503).send(result.rows);
            return;
            }
            return response.send (`User added : ${email}` );  
            }
        );
        });
    ```
4. For the login page (must have both [app.get](https://github.com/1Regina/Rocket_Academy/blob/0877f7c16bbe069a5bbaf3f7e5bc0f377dc45002/Bootcamp/module3/3.5.3_Password_Hashing/index.js#L78) and [app.post](https://github.com/1Regina/Rocket_Academy/blob/0877f7c16bbe069a5bbaf3f7e5bc0f377dc45002/Bootcamp/module3/3.5.3_Password_Hashing/index.js#L127)), [hashed](https://github.com/1Regina/Rocket_Academy/blob/0877f7c16bbe069a5bbaf3f7e5bc0f377dc45002/Bootcamp/module3/3.5.3_Password_Hashing/index.js#L149) it and checked against the hashed one in the database table records to [compare](https://github.com/1Regina/Rocket_Academy/blob/0877f7c16bbe069a5bbaf3f7e5bc0f377dc45002/Bootcamp/module3/3.5.3_Password_Hashing/index.js#L156).
5. If login successful, [set cookie](https://github.com/1Regina/Rocket_Academy/blob/0877f7c16bbe069a5bbaf3f7e5bc0f377dc45002/Bootcamp/module3/3.5.3_Password_Hashing/index.js#L165)
    ```
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
                response.status(403).send('login failed!');
                return;
                }

                // The user's password hash matches that in the DB and we authenticate the user.
                response.cookie('loggedIn', true);
                response.send('logged in!');
            });
        });
    ```
6. clear cookie when [logout](https://github.com/1Regina/Rocket_Academy/tree/master/Bootcamp/module3#:~:text=remove%20cookie%20when%20logout%20with%20response.clearcookie(%22loggedin%22)%3B).   

## ADD SALT VIA ENV
1. npm install path
2. npm install dotenv
3. put import in index.js
    ```
    import path from "path";
    import dotenv from "dotenv";

    ``` 
4. Create some .env file at the same level e.g some_salt.env and put the declarations with the string variables in them
    ```
    MY_ENV_VAR = "testing"
    SALT = "anyhow try"
    ```
5. Add this to index.js
    ```
    const envFilePath = "some_salt.env";
    dotenv.config({ path: path.normalize(envFilePath) });
    const theEnvVar = process.env.MY_ENV_VAR;

    console.log(theEnvVar);

    // initialize salt as a global constant
    const SALT = process.env.SALT;
    ```   
6. use the salt to hash password 
    ```
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

    ```

## For API, use AXIOS
1. npm install axios

## Middleware
1. Note that only 1 next is ever called in middleware . In Express, it's possible for 2 nexts to be called, but this will invoke the successive middleware twice, possibly causing an error when the code tries to end the request-response cycle for the 2nd time for a given request. 
```
    const checkAuth = (request, response, next) => {
    // logic that calls next() or not
    // ...
    };

    // ...

    app.get('/recipes', checkAuth, (request, response) => {
    if (request.isUserLoggedIn === false) {
        response.status(403).send('sorry');
        return;
    }
    // ...
    });
```
2. check out [authentication](https://github.com/1Regina/Rocket_Academy/blob/master/Bootcamp/module3/3.5.5_Middleware/akira.js) in middleware 

## Date
1. Gold standard in SQL is TIMESTAMPTZ
    ```

    CREATE TABLE sightings (
        id            SERIAL PRIMARY KEY,
        description   TEXT,
        date          DATE,
        created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );

    ```

2. prining all sighting dates
    ```
    app.get('/sightings', (request, response) => {
    const query = 'SELECT * from sightings';

        pool.query(query).then((result) => {
            // print out all the dates in the database
            const allSightingDates = result.rows.map((sighting) => {
            console.log(sighting.date);

            // change this Date object into a string value
            return sighting.date.toString();
            });

            response.send(allSightingDates);
        });
    });
    ```
3. npm install moment
4. import moment from 'moment' inside file index.js
5. processing with dates e.g to return ['11 days ago', '117 years ago'];
    ```
    // ...

    // print out all the dates in the database
    const allSightingDates = result.rows.map((sighting) => {
    console.log(sighting.date);

    // change this Date object into a string value
    // .from returns a "ago" string
    return moment(sighting.date).from();
    });

    // ...
    ```
6. See the moment docs on how to output dates with moment. Note that moment will also work with the TIMESTAMPTZ data type from the created_at column and any date with timezone data inside it.  
7. Under "Current Options for Storing Time Data" . 3 options
    1. use the datetime-local input type. Chrome supports datetime-local and the field value can be inserted directly into a Postgres TIMESTAMPTZ field.
       ```
       <input type="date-local" name="date"/>
       ``` 
    2. date input type and create a separate input field for time data. Store time data in Postgres using a separate column.  Example [here](https://stackoverflow.com/questions/538739/best-way-to-store-time-hhmm-in-a-database). 
    3. Avoid time input altogether in your application, and only support date input.

## File uploads  
1. https://bootcamp.rocketacademy.co/3-backend-applications/3.4-sql-applications/3.4.11-file-uploads

## eslint
1. npm install eslint --save-dev
2. npm init @eslint/config


## Sequelize
### 1. Setup Package and Folders
1. npm init -y
2. Sequelize requests that we install pg manually because Sequelize also supports other SQL database types such as MySQL and SQLite, and does not install any SQL DB connectors such as pg by default to keep the Sequelize library lean.
    ```    
    npm install pg sequelize
    ```
3. Install sequelize-cli NPM package to generate relevant Sequelize files such as migrations and models from the command line. sequelize-cli also allows us to run Sequelize migration files that will update our DB schema 
    ```
    npm install --save-dev sequelize-cli
    ```
4. Create the empty folders config, migrations, models, and seeders. These will store Sequelize files that we will need to create for our application. We will explore what each of these folders. We can also create these folders with the `npx sequelize init` command if npm is not global.
    ```
    mkdir config migrations models seeders
    ```
### 2. Configure Database
1. Set up for path and environment variables
    ```
    import path from "path";
    import dotenv from "dotenv";
    ```
2. Sample Config File (config/config.js)
module.exports is the instruction that tells Node.js which bits of code (functions, objects, strings, etc.) to “export” from a given file so other files are allowed to access the exported code.
    1. Here i have a .env for the variables
    2. a config.json in config folder

This file tells the sequelize cli how to connect to the database
3. Create Database Based on Config
    ```
    npx sequelize db:create
    ```
### 3. Create Tables (Migrations)    
1. Create a new migration for schema. Sequelize expects table names to be plural, and model names to be singular, and automatically queries for table names that are pluralised forms of our model names in our apps.
    ```
    npx sequelize migration:generate --name create-items-table
    ```
2. Populate the schema in the generated migration file    including the `up` vs `down`
3. Writing the migration file specifies the DB schema changes. To execute all unexecuted migration files, run sequelize-cli's db:migrate command
    ```
    npx sequelize db:migrate
    ```