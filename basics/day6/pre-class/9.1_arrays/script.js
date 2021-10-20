// Store guesses in a global array that persists across Submits.
var guesses = [];
var main = function (input) {  
  // Add the user's guess to the guesses array.  
  guesses.push(input);  
  // Generate a random dice number.  
  var randomDiceNumber = rollDice();  
  console.log(`you rolled`,randomDiceNumber)
  console.log(`you guess`, input)
  

  // Initialise output to communicate loss.  
  // Output the record of all guesses regardless of loss or win.  
  var myOutputValue = 'You lose. Your guesses: ' + guesses;  
  // If the guess matches the dice roll, change output to communicate win. 
  if (randomDiceNumber == input) {    
    myOutputValue = 'You win. Your guesses: ' + guesses;  
  }  


  // Return output value.  
  return myOutputValue;
};

let rollDice = function( ) {
  let randomNum = (Math.random()*6)
  let randomDice = Math.floor(randomNum)+1
  return randomDice;
};

