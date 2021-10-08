// let main = function (input) {
//   // Set a default value for myOutputValue
//   let myOutputValue = 'hello world';
//   // If input is our secret phrase, change the value of myOutputValue
//   if (input == 'palatable papaya') {
//     myOutputValue = 'you wrote the secret phrase!';
//   }
//   // return myOutputValue as output
//   return myOutputValue;
// };

// Random Dice Gues
var main = function (input) {
  // Generate a random dice number
  var randomDiceNumber = rollDice();

  // Default output value is 'you lose'.
  console.log("dice roll-lose case!");
  console.log(randomDiceNumber);
  var myOutputValue = 'you lose! you rolled ' + randomDiceNumber;

  // If input matches randomDiceNumber, update output.
  // original simple dice guess  
  // if (input == randomDiceNumber) {
  
  // homework (twice the guess)
  if (input*2 == randomDiceNumber) {
    console.log("dice roll!- win case")
    console.log(randomDiceNumber);
    myOutputValue = 'you win! you rolled ' + randomDiceNumber;
  }

  // Return output.
  return myOutputValue;
};

var getRandomInteger = function (max) {
  // Generate a decimal from 0 through max + 1.
  // This decimal will be inclusive of 0 and exclusive of max + 1.
  var randomDecimal = Math.random() * (max + 1);

  // Remove the decimal with the floor operation.
  // The resulting integer will be from 0 through max, inclusive of 0 and max.
  var resultInteger = Math.floor(randomDecimal);

  return resultInteger;
};

var rollDice = function () {
  // Generate a decimal from 0 through 6, inclusive of 0 and exclusive of 6.
  var randomDecimal = Math.random() * 6;

  // Remove the decimal with the floor operation.
  // This will be an integer from 0 to 5 inclusive.
  var randomInteger = Math.floor(randomDecimal);

  // Add 1 to get valid dice rolls of 1 through 6 inclusive.
  var diceNumber = randomInteger + 1;

  return diceNumber;
};