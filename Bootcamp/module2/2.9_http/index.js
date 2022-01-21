// createServer comes from the http module built-in to Node.
import { createServer, get } from 'http';

const handleIncomingRequest = (request, response) => {
  // 1st agrument is request. can be get or leave it as request as default is get
  console.log('Received request!');

  // set respond header for exercise requirement. Basically to intro a new "Attribute" like poker's card status for swap
  response.setHeader('Rocketacademy', true);

  // response.end tells the server to send the completed response and mark
  // this request-response interaction complete.
  // https://nodejs.org/api/http.html#http_response_end_data_encoding_callback
  response.end('Yay!', 'utf-8');
};

// createServer creates the server object. It accepts a request listener function.
// The server calls the function every time it receives a request.
// The listen method tells server to start listening for requests on given port. 
createServer(handleIncomingRequest).listen(3004);

const handleResponse = (response) => {
  // Compile response data in a data variable.
  // The response may contain multiple "chunks" of data.
  let data = '';

  // Add chunk of data to data var when each "chunk" is received.
  response.on('data', (chunk) => {
    data += chunk;
  });

  // We have received the whole response. Print the full response data.
  response.on('end', () => {
    console.log('Response Data: ', data);
  });
};

// Send an HTTP GET request, handle response with handleResponse callback.
// Handle errors by logging the error message.
// otherwise output in termainal will b the html of the site
// get('http://info.cern.ch/', handleResponse).on('error', (err) => {
//   // try with http://localhost:3004 ; http://info.cern.ch/ ;
//   console.error('Error: ' + err.message);
// });

// commands is node index.js

// answers to Q6 from inspect Network: Status all 200 ; and from Headers after select the pages Request Method : Get for all
