1. mkdir my-first-npm-project
2. cd my-first-npm-project
3. npm init -y
4. npm install express or npm i
6. go into package.json and add 
    "module": "true",
    "type": "module",
7. go to index.js and add this at the start of file
    import express from 'express';
    import { read } from './jsonFileStorage.js'; or import read from './jsonFileStorage.js';

    const app = express()
    const port = 3004
8. at the terminal to run the index.js, instead of the old node index.js, do the following below. Nodemon refresh changes so this eliminates the need to restart server all the time there is changes
    nodemon index.js -e js 
9.  Once we transition to SQL DBS, feel free to use nodemon without the -e argument.
10. or simply
    nodemon index.js



For EJS, do these also
1. npm install ejs
2. Set up the following file structure
    └── my-app
        ├── index.js
        └── public
            └── styles.css
        └── views
            └── fruit.ejs
3. in index.js, add these:
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
4. in fruit.ejs 
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