var main = function (input) {
  var myOutputValue = '';
  var counter = 0;
  while (counter < input) {
    // Roll dice inside the loop, generating a random dice roll each iteration
    var diceRoll = rollDice();
    // Add each dice roll to output
    myOutputValue = myOutputValue + ' ' + diceRoll + ' ';
    // Increment counter at end of each iteration
    counter = counter + 1;
  }
  return myOutputValue;
};

let rollDice = function( ) {
  let randomNum = (Math.random()*6)
  let randomDice = Math.floor(randomNum)+1
  return randomDice;
};

