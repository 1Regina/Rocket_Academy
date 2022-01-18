import { createServer } from 'http';

const handleIncomingRequest = (get, response) => {
  console.log('Received request!');
  response.end('its me Regina!', 'utf-8');
};

createServer(handleIncomingRequest).listen(3004);
