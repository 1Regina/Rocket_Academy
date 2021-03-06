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
    * How would you like to use ESLint? = Find n fix problems n enforce style
    * What type of modules does your project use? = JavaScript modules (import/export)
    * Which framework does your project use? = None of these
    * Does your project use TypeScript? = No 
    * Where does your code run? = Node
    * How would you like to define a style for your project? = choose from a popular style
    * Which style guide do you want to follow? = Airbnb: https://github.com/airbnb/javascript
    * What format do you want your config file to be in? = JavaScript
     eslint-config-airbnb-base@latest eslint@^7.32.0 || ^8.2.0 eslint-plugin-import@^2.25.2
    * Would you like to install them now with npm? Yes



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
4. Create the empty folders config, migrations, models, and seeders. These will store Sequelize files that we will need to create for our application. We will explore what each of these folders. We can also create these folders with the `npx sequelize init` command if npm is not global. But the config file will become config.json which is incorrect. Better to do mkdir.
    ```
    mkdir config migrations models seeders
    ```
### 2. Configure Database
1. Set up for path and environment variables in config.js (and .sequelizerc)
    ```
    -- import path from "path"; (maybe not)
    import dotenv from "dotenv";
    ```
2. Sample Config File (config/config.js)
module.exports is the instruction that tells Node.js which bits of code (functions, objects, strings, etc.) to “export” from a given file so other files are allowed to access the exported code.
    1. Here i have a [.env](https://github.com/1Regina/Rocket_Academy/blob/master/Bootcamp/module4/4.1_Sequelize/.env) for the variables 
    2. [a config.js in config folder](https://github.com/1Regina/Rocket_Academy/blob/master/Bootcamp/module4/4.1_Sequelize/config/config.js)

This file tells the sequelize cli how to connect to the database

3. Create Database Based on Config
    ```
    npx sequelize db:create
    ```
### 3. Create Tables (Migrations = versions of tables)    
1. Create a new migration for schema. Sequelize expects table names to be plural, and model names to be singular, and automatically queries for table names that are pluralised forms of our model names in our apps.
    ```
    npx sequelize migration:generate --name create-items-table
    ```
2. `queryInterface` is a param provided by Sequelize to manipulate DB schema. Populate the schema in the generated migration file including the `up` vs `down`.
    ```
    // running "npx sequelize migration:generate --name create-items-table" creates this file
    // something like this should appear in the terminal after running this command
    ​
    // Sequelize CLI [Node: 15.14.0, CLI: 6.3.0, ORM: 6.12.0-alpha.1]
    ​
    // migrations folder at "/home/michellemok/RA/ftbc5/sequelize/migrations" already exists.
    // New migration was created at /home/michellemok/RA/ftbc5/sequelize/migrations/20211203063853-create-items-table.js .

    module.exports = {
        up: async (queryInterface, Sequelize) => {
            await queryInterface.createTable('items', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            name: {
                type: Sequelize.STRING,
            },
            // created_at and updated_at are required
            created_at: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updated_at: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            });
        },

        down: async (queryInterface, Sequelize) => {
            await queryInterface.dropTable('items');
        },
    };
    ```
    Alternative under `down`, if there are many promises to fulfil and order is not important, do Promise.all
    ```
    ....
    down: async (queryInterface) => {
        // Drop tables with foreign key references first
        await Promise.all([
        queryInterface.dropTable('category_items'),
        queryInterface.dropTable('cart_items'),
        ]);
        await Promise.all([
        queryInterface.dropTable('items'),
        queryInterface.dropTable('categories'),
        queryInterface.dropTable('carts'),
        ]);
    },
    ```

3. Writing the migration file specifies the DB schema changes. To execute all unexecuted migration files, run sequelize-cli's db:migrate command
    ```
    npx sequelize db:migrate
    ```
4. This will 
    1. create the intended table with its intended schema and a meta table "SequelizeMeta" which tells which table had been run and in what order.   
    2. run those migration files which havent run as it look for those that are not yet run.
    3. create a table call items with all its columns as specified in the migration file
5. `npx sequelize db:migrate:undo` to undo a migration

### 4. Models -- interaction with database (the form template)
1. the model corresponding to the items table must be called "item" in the sequelize definition for Sequelize to work.
2. mkdir models 
3. touch models/item.mjs (note the singular now) to initialise the model from the migration. It looks similar to the migration table except for first few lines. Sample models/item.mjs
    ```
        //  a model represents a table in sequelize, The model tells Sequelize several things about the entity it represents, such as the name of the table in the database and which columns it has (and their data types).
        // To define mappings between a model and a table, use the define method
        //  After being defined, we can access our model with sequelize.models.Item, i.e,
        //  Item === sequelize.models.Item
        ​
        // this function is exported and used in line 37 of index.mjs, 
        // db.Item = initItemModel(sequelize, Sequelize.DataTypes);
        // it takes 2 parameters, the instance of Sequelize (sequelize) that we created in index.mjs and Sequelize.Datatypes(https://sequelize.org/v5/manual/data-types.html), which allow us to specify what type of data we want 


    export default function initItemModel(sequelize, DataTypes) {
        return sequelize.define(
            'item',
            {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER,
            },
            name: {
                type: DataTypes.STRING,
            },
            createdAt: {
                allowNull: false,
                type: DataTypes.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: DataTypes.DATE,
            },
            },
            {
            // The underscored option makes Sequelize reference snake_case names in the DB.
            underscored: true,
            }
        );
    }
    ```
4. short cut to create a migration and a model template
    ```
    npx sequelize-cli model:generate --name Item --attributes name:string
    ```
5. Migration has higher authority than models in the odd event that their types dont match    
6. Create Model Index File to Make Models Accessible in App
We will initialise and export all the models we define in a single module. This makes it easy to access models from different modules within our application. In the following code, model classes are exported in a db object where keys are model names and values are model classes. 
6. To define association of tables
    1. define the [how they belong](https://github.com/1Regina/Rocket_Academy/blob/321478bb181f32aa8c559ff397488f3b9cb15624/Bootcamp/module4/4POCE1_Sequelize_Travel/db/models/index.model.mjs#L34) 
    2. define the [is it one to many or many to many](https://github.com/1Regina/Rocket_Academy/blob/321478bb181f32aa8c559ff397488f3b9cb15624/Bootcamp/module4/4POCE1_Sequelize_Travel/db/models/index.model.mjs#L36)
    3. Specify the column and how it functions as a [foreign key](https://github.com/1Regina/Rocket_Academy/blob/321478bb181f32aa8c559ff397488f3b9cb15624/Bootcamp/module4/4POCE1_Sequelize_Travel/db/models/attraction.mjs#L28) 
    4. For many-to-many models/index.mjs , note the joining of table via { through: db.CartItem } e.g db.Item.belongsToMany(db.Cart, { through: db.CartItem });
    ```
        import sequelizePackage from 'sequelize';
        import allConfig from '../config/config.js';

        import initItemModel from './item.mjs';
        import initCategoryModel from './category.mjs';
        import initCartModel from './cart.mjs';
        import initCartItemModel from './cartItem.mjs';

        const { Sequelize } = sequelizePackage;
        const env = process.env.NODE_ENV || 'development';
        const config = allConfig[env];
        const db = {};

        const sequelize = new Sequelize(
        config.database,
        config.username,
        config.password,
        config
        );

        db.Item = initItemModel(sequelize, Sequelize.DataTypes);
        db.Category = initCategoryModel(sequelize, Sequelize.DataTypes);
        db.Cart = initCartModel(sequelize, Sequelize.DataTypes);
        db.CartItem = initCartItemModel(sequelize, Sequelize.DataTypes);

        // in order for the many-to-many to work we must mention the join table here.
        db.Item.belongsToMany(db.Category, { through: 'category_items' });
        db.Category.belongsToMany(db.Item, { through: 'category_items' });

        // Connect Item and Cart models.
        // Note: It's possible to use a Sequelize model class (i.e. CartItem)
        // to connect the models Item and Cart instead of the table name (i.e. cart_items).
        // Using variable is more robust than string because it's easier to detect typos.
        db.Item.belongsToMany(db.Cart, { through: db.CartItem });
        db.Cart.belongsToMany(db.Item, { through: db.CartItem });

        // Define 1-M associations between CartItems table and associated tables
        // to access CartItem attributes from Item and Cart instances
        db.Item.hasMany(db.CartItem);
        db.CartItem.belongsTo(db.Item);
        db.Cart.hasMany(db.CartItem);
        db.CartItem.belongsTo(db.Cart);

        db.sequelize = sequelize;
        db.Sequelize = Sequelize;

        export default db;
    ```
### 5. Use Sequelize in App Logic
1. Use an app file (create.mjs) to do what action you want done to the db -- create e.g create.mjs. Test with `node create.mjs milk`
    ```
    // import the object we created with everything in it from index.mjs
    import db from './models/index.mjs';

    // a model is an ES6 class. An instance of the class represents one object from that model (which maps to one row of the table in the database).
    //  Although a model is a class, you should not create instances by using the new operator directly. Sequelize provides the create method for this
    // https://sequelize.org/master/manual/model-instances.html

    db.Item.create({
    name: process.argv[2],
    })
    .then((item) => {
        console.log('success!');
        console.log(item);
    })
    .catch((error) => console.log(error));
    ```
2. Can find/retrieve also with where.mjs. Test with `node where.mjs milk`
    ```
    import db from './models/index.mjs';

    db.<MODEL_NAME_UPPER_CAMEL_CASE_SINGULAR>.findAll({
    where: {
        <MODEL_COLUMN_NAME>: ['milk']
    }
    })
    .then((items) => console.log(items[0]))
    .catch((error) => console.log(error));

    ```    
### Impt: Use camelCase    ?

### 6. Seed Data for DB
1. Use migration table to seed data
   ```
   npx sequelize seed:generate --name seed-data
   ```
2. Sample Seed Data Migration file
   ```
   module.exports = {
    up: async (queryInterface) => {
        const categoriesList = [
            {
                name: 'fish',
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                name: 'fruit',
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                name: 'meat',
                created_at: new Date(),
                updated_at: new Date(),
            },
        ];

        // Insert categories before items because items reference categories
        let categories = await queryInterface.bulkInsert(
        'categories',
        categoriesList,
        { returning: true }
        );

        const items = [];
        for (let i = 0; i < categories.length; i++) {
            const category = categories[i];

            items.push({
                name: 'some item',
                category_id: category.id,
                created_at: new Date(),
                updated_at: new Date(),
            });

            items.push({
                name: 'other item',
                category_id: category.id,
                created_at: new Date(),
                updated_at: new Date(),
            });

            items.push({
                name: 'iitemmm',
                category_id: category.id,
                created_at: new Date(),
                updated_at: new Date(),
            });
        }

        queryInterface.bulkInsert('items', items);
    },

        down: async (queryInterface) => {
            // Delete item before category records because items reference categories
            await queryInterface.bulkDelete('items', null, {});
            await queryInterface.bulkDelete('categories', null, {});
        },
    };
   ``` 
4. Execute the seed data
   ``` 
   npx sequelize db:seed:all
   ```
5. Sequelize [Cheatsheet](https://bootcamp.rocketacademy.co/4-backend-structure/4.1-orm-sequelize/4.1.9-sequelize-setup-cheatsheet)
6. Tips:
    1. Note how we do not need to create a model for the join table! If the table only contains foreign keys, Sequelize does not require us to create a model file for the table. (If the table has non-foreign keys, you would need to create a model).
    2. Command [CRUD](https://bootcamp.rocketacademy.co/4-backend-structure/4.1-orm-sequelize) 

### 7. Validation 
1. DataBase Validation - violateDBConstraint.mjs to prevent DB constraint violation e.g of the `allowNull: false` . Note that we must import the `DatabaseError` class from Sequelize
    ```
    import sequelizePackage from 'sequelize';
    import db from './models/index.mjs';

    const { DatabaseError } = sequelizePackage;

    const violateDbConstraint = async () => {
        try {
            const category = await db.Category.findOne({
            where: {
                name: [process.argv[2]],
            },
            });
            const associatedItem = await db.Item.create({
            name: process.argv[3],
            categoryId: category.id,
            });
            console.log(associatedItem);
        } catch (error) {
            if (error instanceof DatabaseError) {
            console.error('This is a database error!');
            console.error(error);
            } else {
            console.error(error);
            }
        }
    };

    violateDbConstraint();
    ```
2. Model Validation -   Constraints are called "validations" in the model context. violateModelValidation.mjs script that performs special logic for validation errors on name of item with `allowNull:false` by importing the `ValidationError` class from Sequelize.
    ```
    import sequelizePackage from 'sequelize';
    import db from './models/index.mjs';

    const { ValidationError } = sequelizePackage;

    const violateModelValidation = async () => {
        try {
            const category = await db.Category.findOne({
            where: {
                name: [process.argv[2]],
            },
            });
            const associatedItem = await db.Item.create({
            name: process.argv[3],
            categoryId: category.id,
            });
            console.log(associatedItem);
        } catch (error) {
            if (error instanceof ValidationError) {
            console.error('This is a validation error!');
            console.error(error);
            } else {
            console.error(error);
            }
        }
    };

    violateModelValidation();
    ```
3. Other validations -- models/items.mjs to validate length of name etc which will output error object with "validatorKey: 'len'," and "validatorName: 'len',"
    ```
    export default function itemModel(sequelize, DataTypes) {
        return sequelize.define(
          'item',
          {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER,
            },
            name: {
                // The following custom validations are new.
                validate: {
                    // isAlpha allows only alphanumeric characters.
                    isAlpha: true,
                    // This only allows strings of length 3 to 23.
                    len: [3, 23],
                },
                type: DataTypes.STRING,
            },
            categoryId: {
                type: DataTypes.INTEGER,
                references: {
                    model: 'categories',
                    key: 'id',
                },
            },
            createdAt: {
                allowNull: false,
                type: DataTypes.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: DataTypes.DATE,
            },
        },
        {
            // The underscored option makes Sequelize reference snake_case names in the DB.
            underscored: true,
        }
      );
    }
    ```
4. Combining Constraints and Validations
    ```
    import sequelizePackage from 'sequelize';
    import db from './models/index.mjs';

    const { ValidationError, DatabaseError } = sequelizePackage;

    db.Category.findOne({
        where: {
            name: [process.argv[2]],
        },
    })
    .then((category) => {
        return db.Item.create({
            name: process.argv[3],
            categoryId: category.id,
        });
    })
    .then((item) => {
        console.log(item);
    })
    .catch((error) => {
        if (error instanceof ValidationError) {
        console.error('This is a validation error!');
        console.error(error);
        console.error('The following is the first error message:');
        console.error(error.errors[0].message);
      } else if (error instanceof DatabaseError) {
        console.error('This is a database error!');
        console.error(error);
      } else {
        console.error(error);
      }
    });
    ```