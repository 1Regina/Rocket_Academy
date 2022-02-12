import { read, edit, add } from './jsonFileStorage.js';

const command = process.argv[2];

const rollDice = () => {
  return (Math.floor(Math.random() * 6)+1 );
};

const callback = (err, input) => {
  console.log(input);
};

const handleError = (err) => {
  console.error(err);
};

const getAverage = (err, data) => {
  if (err) {
    handleError(err);
    return;
  }

  // check if data has a key "rolls"
  if (data.rolls) {
    const { rolls } = data;
    const numberOfRolls = rolls.length;
    const average = rolls.reduce((a, b) => a + b) / numberOfRolls;

    console.log(`Average is ${average}.`);
    return;
  }

  console.log('No dice has been rolled');
};

const getTally = (rolls) => {
  const diceTally = {};
  for (let i = 0; i < rolls.length; i += 1) {
    const dice = rolls[i];
    // If we have seen the card name before, increment its count
    if (dice in diceTally) {
      diceTally[dice] += 1;
    }
    // Else, initialise count of this card name to 1
    else {
      diceTally[dice] = 1;
    }
  }
  return diceTally;
};

// const readCallback = (err, jsonContentObj) => {
//   // Exit if there was an error
//   if (err) {
//     handleError(err);
//     return;
//   }

//   // Exit if key does not exist in DB
//   if (!(key in jsonContentObj)) {
//     console.error('Key does not exist');
//     // Call callback with relevant error message to let client handle
//     callback('Key does not exist');
//     return;
//   }

//   // Add input element to target array
//   jsonContentObj[key].push(latestRoll);

//   // assign the tally object as "frequencies"
//   const frequencies = getTally(jsonContentObj[key]);
//   jsonContentObj.frequencies = { ...frequencies };

//   console.log(`You rolled ${latestRoll}`);
// };

/**
 * Command Start
 */

if (command === 'roll') {
  // Roll Dice and Save Value
  const latestRoll = rollDice();
  console.log(`You rolled ${latestRoll}`);
  add('data.json', 'rolls', latestRoll, callback);
}

if (command === 'average') {
  // Get Average Dice Roll
  read('data.json', getAverage);
}

if (command === 'tally') {
  const key = 'rolls';
  const latestRoll = rollDice();
  edit(
    'data.json',

    // readCallback
    (err, jsonContentObj) => {
      // Exit if there was an error
      if (err) {
        handleError(err);
        return;
      }

      // Exit if key does not exist in DB
      if (!(key in jsonContentObj)) {
        console.error('Key does not exist');
        // Call callback with relevant error message to let client handle
        callback('Key does not exist');
        return;
      }

      // Add input element to target array
      jsonContentObj[key].push(latestRoll);

      // assign the tally object as "frequencies"
      const frequencies = getTally(jsonContentObj[key]);
      jsonContentObj.frequencies = { ...frequencies };
      console.log(`You rolled ${latestRoll}`);
    },

    // writeCallback
    (err, data) => {
      if (err) {
        handleError(err);
        return;
      }

      const occurences = Object.values(JSON.parse(data).frequencies);
      const max = Math.max(...occurences);
      
      let freqObj = JSON.parse(data).frequencies
      let maxValue = Object.keys(freqObj).reduce((a, b) => freqObj[a] > freqObj[b] ? a : b);
      
      console.log(`The computer has rolled ${maxValue} the most times.`);

    }
    
  );

}

