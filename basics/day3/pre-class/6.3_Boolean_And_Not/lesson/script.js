// Even Easier Dice Game
let main = function (input) {
  var randomDiceNumber1 = rollDice();
  var randomDiceNumber2 = rollDice();
  // The default output value is "you lose".
  var myOutputValue = 'you lose';
  // // If the input matches both random dice numbers, output value is "you win".
  // if (randomDiceNumber1 == input && randomDiceNumber2 == input) {
    // If the input matches both random dice numbers and 
    // the dice is not snake eyes (ie both dice1 and dice2 = 1) , output value is "you win".
    console.log("input"); 
    console.log(input);
    console.log("diceRoll1");
    console.log(randomDiceNumber1);
    console.log("diceRoll2");
    console.log(randomDiceNumber2);
    console.log ("#####");
    console.log("input equals diceRoll1");
    console.log(input == randomDiceNumber1);
    console.log("input equals diceRoll2");
    console.log(input == randomDiceNumber2);
    console.log("not snakeeyes");
    console.log(!(randomDiceNumber1 == 1 && randomDiceNumber2 == 1));
    console.log("//////////////////");
    if (randomDiceNumber1 == input && randomDiceNumber2 == input && !(randomDiceNumber1 ==1 && randomDiceNumber2 == 1)) {
    myOutputValue = 'you win';
  }
  return myOutputValue;
};

let rollDice = function () {
  // return 2 ;
  // Generate a decimal from 0 through 6, inclusive of 0 and exclusive of 6.
  let randomDecimal = Math.random() * 6;

  // Remove the decimal with the floor operation.
  // This will be an integer from 0 to 5 inclusive.
  let randomInteger = Math.floor(randomDecimal);

  // Add 1 to get valid dice rolls of 1 through 6 inclusive.
  let diceNumber = randomInteger + 1;

  return diceNumber;
};


// the value of myVal is the result of the number 1 BOOLEAN EQUALS the number 2
var myVal = 1 == 2;

// Assign true to the didUserWin variable
// var didPlayerWin = true;
// Assign the result of input == randomDiceNumber to didPlayerWin. 
// var didPlayerWin = input == randomDiceNumber;
// Naive Not Operator Example
// if (didPlayerWin != true) {
//   console.log('player didnt win!');
//}
// Preferred Not Operator Example
// if (!didPlayerWin) {
//   console.log('player didnt win!');
// }
// Not Equals Operator Example
// if (diceRoll != 2) {
//   console.log('dice roll is not 2!');
// }