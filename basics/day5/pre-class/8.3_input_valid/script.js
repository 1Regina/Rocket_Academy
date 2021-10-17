var rollDice = function () {
    // produce a decimal between 0 and 6  
    var randomDecimal = Math.random() * 6;  
    // remove the decimal  
    var randomInteger = Math.floor(randomDecimal);  
    // add 1 to get a number between 1 and 6 inclusive  
    var diceNumber = randomInteger + 1;  
    return diceNumber;
  };
  
  var main = function (input) {  
    var myOutputValue = '';  

    // first check if input is a number  
    if (Number.isNaN(Number(input)) == true) {    
      myOutputValue = 'sorry please enter a number.';    
      return myOutputValue;  }  
      
    // then check if input is between 1 and 6  
    if (input < 1 || input > 6) {    
      myOutputValue = 'sorry please enter a number from 1 - 6';    
      return myOutputValue;  
    }  
    
    // the input is 1-6, go ahead with the dice game  
    var randomDiceNumber1 = rollDice();  
    var randomDiceNumber2 = rollDice(); 

    if (randomDiceNumber1 == input) {    
      myOutputValue = 'you win';    
      return myOutputValue;  
    }  
    
    myOutputValue = 'you lose';  

    if (randomDiceNumber1 == randomDiceNumber2) {
      myOutputValue = `you rolled doubles. Dice 1 was ${randomDiceNumber1} and Dice 2 was also ${randomDiceNumber2}`;
      return myOutputValue;
    }
    return myOutputValue;
  };