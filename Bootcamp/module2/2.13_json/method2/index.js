import { read } from './jsonFileStorage.js';

const handleJsonRead = (jsonContentObj) => {
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

read('data.json', handleJsonRead);
