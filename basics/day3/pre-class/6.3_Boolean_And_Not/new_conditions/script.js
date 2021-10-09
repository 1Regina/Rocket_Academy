// Even Easier Dice Game
let main = function (input) {
  var randomDiceNumber1 = rollDice(); //rollDice1();
  var randomDiceNumber2 = rollDice(); //rollDice2(); 
  // The default output value is "you lose".
  var myOutputValue = `you lose. Input is ${input} and diceRoll1 is ${randomDiceNumber1} and diceRoll2 is ${randomDiceNumber2}.`;
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
    console.log ("##############");
    // console.log("input equals diceRoll1");
    // console.log(input == randomDiceNumber1);
    // console.log("input equals diceRoll2");
    // console.log(input == randomDiceNumber2);
    // console.log("//////////////////");
    if (
      // #1 User wins if guess is within 1 for any of 2 dice.
      // input == randomDiceNumber1     ||
      // input == randomDiceNumber1 + 1 || 
      // input == randomDiceNumber1 - 1 ||
      // input == randomDiceNumber2     ||
      // input == randomDiceNumber2 + 1 || 
      // input == randomDiceNumber2 - 1 

      // #2 User wins if guess is within 1 for all 2 dice.
      // (
      //   input == randomDiceNumber1     ||
      //   input == randomDiceNumber1 + 1 || 
      //   input == randomDiceNumber1 - 1 
      // ) && 
      // ( input == randomDiceNumber2     ||
      //   input == randomDiceNumber2 + 1 || 
      //   input == randomDiceNumber2 - 1 
      // )  
      // #3 User wins if guess is within 1 of either dice but the user does not roll snake eyes.
      // (
      // input == randomDiceNumber1     ||
      // input == randomDiceNumber1 + 1 || 
      // input == randomDiceNumber1 - 1 ||
      // input == randomDiceNumber2     ||
      // input == randomDiceNumber2 + 1 || 
      // input == randomDiceNumber2 - 1 
      // ) && 
      // !(randomDiceNumber1 == 1 && randomDiceNumber2 == 1)
      // #4 User wins if guess is within 1 of either dice or if the user rolls snake eyes.
      (
      input == randomDiceNumber1     ||
      input == randomDiceNumber1 + 1 || 
      input == randomDiceNumber1 - 1 ||
      input == randomDiceNumber2     ||
      input == randomDiceNumber2 + 1 || 
      input == randomDiceNumber2 - 1 
      ) || 
      (randomDiceNumber1 == 1 && randomDiceNumber2 == 1)
    ) {
    myOutputValue = `you win. Input is ${input} and diceRoll1 is ${randomDiceNumber1} and diceRoll2 is ${randomDiceNumber2}.`;
  }
  return myOutputValue;
};

// Assign different values for rollDice1 and rollDice2 for input testing
// let rollDice1 = function (){
//   return 4
// };
// let rollDice2 = function (){
//   return 2
// };

let rollDice = function () {
  // return 1 ;
  // Generate a decimal from 0 through 6, inclusive of 0 and exclusive of 6.
  let randomDecimal = Math.random() * 6;

  // Remove the decimal with the floor operation.
  // This will be an integer from 0 to 5 inclusive.
  let randomInteger = Math.floor(randomDecimal);

  // Add 1 to get valid dice rolls of 1 through 6 inclusive.
  let diceNumber = randomInteger + 1;

  return diceNumber;
};

