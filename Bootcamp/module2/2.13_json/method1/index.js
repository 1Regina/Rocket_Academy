import { read } from './jsonFileStorage.js';

const handleFileRead = (readErr, jsonContentStr) => {
  if (readErr) {
    console.log('Reading error', readErr);
  }

  // Convert JSON content from string to object
  const jsonContentObj = JSON.parse(jsonContentStr);

  // Extract temperatures variable from JSON for readability
  const temperatures = jsonContentObj.temperatures;

  // Calculate average temperature
  let totalTemp = 0;
  for (let i = 0; i < temperatures.length; i += 1) {
    totalTemp += temperatures[i];
  }
  const avgTemp = totalTemp / temperatures.length;

  // Log average temperature
  console.log(avgTemp);
};

// Read JSON DB and operate on its data
read('data.json', handleFileRead);


// command to run node index.js