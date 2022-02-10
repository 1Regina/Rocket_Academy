1. mkdir my-first-npm-project
2. cd my-first-npm-project
3. npm init -y
4. npm install express
5. npm install ejs
6. go into package.json and add 
    "module": "true",
    "type": "module",
7. go to index.js and add this at the start of file
    import express from 'express';
    import { read } from './jsonFileStorage.js';

    const app = express()
    const port = 3004
8. at the terminal to run the index.js, instead of the old node index.js, do the following below. Nodemon refresh changes so this eliminates the need to restart server all the time there is changes
    nodemon index.js -e js 
9. Once we transition to SQL DBS, feel free to use nodemon without the -e argument.
10. or simply
    nodemon index.js