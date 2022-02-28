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