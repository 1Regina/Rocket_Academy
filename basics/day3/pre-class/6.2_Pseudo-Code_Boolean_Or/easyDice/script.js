// Random Dice Gues
let main = function (input) {
  // Generate a random dice number
  let randomDiceNumber = rollDice();

  // Default output value is 'you lose'.
  console.log("dice roll-lose case!");
  console.log(randomDiceNumber);
  var myOutputValue = 'you lose! you input ' +input+ ' and rolled ' + randomDiceNumber;

  // Lesson
  // the user wins
  // If:
  // The guess equals the dice roll,
  // if (randomDiceNumber == input) {
  //   myOutputValue = 'you win bcos you input ' +input+ " and rolled " + randomDiceNumber;
  // }
  // // OR
  // // The guess plus one equals the dice roll,
  // if (randomDiceNumber + 1 == input) {
  //   myOutputValue = 'you win bcos you input ' +input+ " and rolled " + randomDiceNumber;
  // }
  // // OR
  //  // The guess minus one equals the dice roll,
  //  if (randomDiceNumber - 1 == input) {
  //   myOutputValue = 'you win bcos you input ' +input+ " and rolled " + randomDiceNumber;
  // }
  
  if (
      // Lesson
      input == randomDiceNumber     ||
      input == randomDiceNumber + 1 || 
      input == randomDiceNumber - 1 ||
      // Easier Dice Game: If the user guess is within 2 of the dice roll, they still win.
      input == randomDiceNumber + 2 ||
      input == randomDiceNumber - 2

    ) {
    console.log("dice roll!- win case")
    console.log(randomDiceNumber);
    myOutputValue = 'you win! you input ' +input+ ' and rolled ' + randomDiceNumber;
  }

  // Return output.
  return myOutputValue;
};

let getRandomInteger = function (max) {
  // Generate a decimal from 0 through max + 1.
  // This decimal will be inclusive of 0 and exclusive of max + 1.
  let randomDecimal = Math.random() * (max + 1);

  // Remove the decimal with the floor operation.
  // The resulting integer will be from 0 through max, inclusive of 0 and max.
  let resultInteger = Math.floor(randomDecimal);

  return resultInteger;
};

let rollDice = function () {
  // Generate a decimal from 0 through 6, inclusive of 0 and exclusive of 6.
  let randomDecimal = Math.random() * 6;

  // Remove the decimal with the floor operation.
  // This will be an integer from 0 to 5 inclusive.
  let randomInteger = Math.floor(randomDecimal);

  // Add 1 to get valid dice rolls of 1 through 6 inclusive.
  let diceNumber = randomInteger + 1;

  return diceNumber;
};

