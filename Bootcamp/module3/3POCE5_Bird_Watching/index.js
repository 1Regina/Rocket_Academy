import express from 'express';
import read, {add} from './jsonFileStorage.js';
import methodOverride from 'method-override';

const app = express();
app.use(express.static('public'));
// Configure Express to parse request body data into request.body
app.use(express.urlencoded({ extended: false }));

const port = 3004

// Set view engine
app.set('view engine', 'ejs');

// Override POST requests with query param ?_method=PUT to be PUT requests
app.use(methodOverride('_method'));


// set port to listen
app.listen(port)