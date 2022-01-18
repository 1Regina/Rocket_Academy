import { createServer } from 'http';
import { readFile } from 'fs';

const handleIncomingRequest = (request, response) => {
  // request.url contains the portion of the URL after the domain.
  // E.g. for https://ra.co/index.html, request.url would return "/index.html".
  console.log('request url', request.url);

  // "." refers to the Unix filesystem ".", which represents the current directory.
  const filePath = '.' + request.url;

  readFile(filePath, (err, content) => {
    if (err) {
      console.error('error reading file', err);
      return;
    }
    // Set the response code to 200 (i.e. OK)
    response.writeHead(200);
    // Send the response with the file content in utf-8 format
    response.end(content, 'utf-8');
  });
};

// Initialise server with request listener function handleIncomingRequest
// https://nodejs.org/api/http.html#http_http_createserver_options_requestlistener
// Use port 3004 by convention.
createServer(handleIncomingRequest).listen(3004);

// command to run node index.js then go browser and put http://localhost:3004/index.html but missing the music n pic images