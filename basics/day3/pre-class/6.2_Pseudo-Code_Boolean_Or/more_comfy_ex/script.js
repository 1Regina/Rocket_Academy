// Even Easier Dice Game
let main = function (input) {
  // Generate a random dice number
  let randomDiceNumber = rollDice();
  // default message
  var myOutputValue = 'you lose! roll number is  ' + randomDiceNumber + " input is " + input;
  // classify dice throw as even or odd
  let diceNum = "even" || "odd"; 
  if (
      // randomDiceNumber == 1 ||
      // randomDiceNumber == 3 ||
      // randomDiceNumber == 5 
      // refactor using modulus operator
      randomDiceNumber % 2 == 1

      ){
        diceNum = "odd" 
      }
    else //if (
            //   randomDiceNumber == 2 ||
            //   randomDiceNumber == 4 ||
            //   randomDiceNumber == 6 
            // )
            {
                diceNum = "even" 
              }
  
  // match dice throw classification and input guess             
  if (
      diceNum == "odd" && (input == "odd" || input ==  "palatable papaya" ) ||
      diceNum == "even" && (input == "even" || input ==  "palatable papaya" )
      ){
      // messages to display for matching guess  
      console.log("correct! roll number is " + randomDiceNumber+ " input is " + input)
      myOutputValue = "correct! roll number is " + randomDiceNumber+ " input is " + input
      }
      else {
            // Default output value is 'you lose'.
            console.log("dice roll-lose case!");
            console.log(randomDiceNumber);
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

