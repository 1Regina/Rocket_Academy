import { write, read, edit, add } from './jsonFileStorage.js';

const input = process.argv[2];
// Roll Dice and Save Value
let rollObj = {};
let rollArr = [];
const rollDice = () => {
  const dice = Math.floor(Math.random() * 6 + 1);
  console.log(`You rolled`, dice);
  // console.log(`cant believe its only a count`, rollArr.push(dice));
  rollArr.push(dice);
  rollObj.rolls = rollArr;
  // console.log(`rollArray`, rollArr);
  // console.log(`rollObject`, rollObj);
  return rollObj;
};
let myObj = rollDice();
// Roll Dice and Save Value
if (input === 'roll') {
  //  console.log(`You rolled`, dice);
  write(
    'data0.json',
    myObj,
    // 3rd input = my 2nd callback/function argument "writeCallback" in edit
    (err) => {
      // If no error, just concern
      if (!err) {
        console.log('');
      }
    }
  );
}

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
if (input === 'average') {
  // Get Average Dice Roll
  read('data0.json', getAverage);
}
