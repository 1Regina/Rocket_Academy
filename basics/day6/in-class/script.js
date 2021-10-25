var main = function (input) {
  // var myOutputValue = drawChar(input)
  // var myOutputValue = drawSq(input);
  // var myOutputValue = drawTri(input)
  // var myOutputValue = borderSquare(input)
  // var myOutputValue = loopSimple(input)
  // var myOutputValue = loopLoop(input)
  var myOutputValue = multiDice(input)
  return myOutputValue;
};


// Simple Loop
let loopSimple = function(input){
  let myOutputValue = ''
  let counter = 0
  while (counter < input) {
    myOutputValue = myOutputValue + "hello"
    counter += 1
  } 
  return myOutputValue
}

// Loop within loop
let loopLoop = function() {
  let counter = 0
  let myOutputValue = ''
  while (counter < 3) {
    myOutputValue = myOutputValue + "HelloOuter"
    counter += 1
    let innerCounter = 0
    let myInnerValue = ""
    while (innerCounter < 3) {
      myInnerValue += "HelloInner"
      innerCounter += 1
    }
    myOutputValue += myInnerValue + "<br>"
  }
  return myOutputValue
}


let mode = "mode 1: define dice attempt"
let multiDiceGamecounter = 0
let winTimes = 0
// Multi-Dice Game
let multiDice = function(input) {
  let message = ""
  
  if (mode == "mode 1: define dice attempt"){
    tries = input;
    mode = "mode 2: guessing game"
    console.log(mode)
    return `You want to throw the dice for ${tries} times. Put in your guess.`
  }
  console.log("going guess mode:", mode, mode == 'mode 2: guessing game')

  if (mode == 'mode 2: guessing game'){
    console.log("entered guessing")
    
    let diceRolls = []
    let userGuess = input
    
    winTimes = 0
    console.log( "i m playing the game. ")

    while (multiDiceGamecounter < tries){
//       // mode = "guessing game"
      let diceNum = diceRoll()
      diceRolls.push(diceNum) 
      console.log(`keep trying`)
      if (diceRolls[multiDiceGamecounter] == userGuess){
        winTimes +=1
        return multiDiceMsg(userGuess, diceRolls) + ` <br> You made a correct guess. ` 
      } else {
        console.log("try again")
        console.log(`DiceRolls were ${diceRolls}.`)
        message = multiDiceMsg(userGuess, diceRolls) + ` <br> You lose this game. `
        
      }
      multiDiceGamecounter += 1  
    }
  }  
  return  message
 }

let multiDiceMsg = function (guess, diceRolls) {
  return `You guess ${guess} and you rolled ${diceRolls}.`
}

let diceRoll = function () {
  let randomDec = Math.random()*6;
  let randomInt = Math.floor(randomDec)
  let diceNum = randomInt + 1
  return diceNum
}



// Number of characters
let drawChar = function(numChar) {
  let myOutputValue = '';
  var counter = 0
  while (counter < numChar){
    myOutputValue = myOutputValue + '🌼';
    counter = counter + 1
  }
  return myOutputValue;
};


// Square
var drawSq = function (input) {
  var myOutputValue = '';
  // Initialise the outer counter, rowCounter
  var rowCounter = 0;
  while (rowCounter < input) {
    // Inside the outer loop, initialise the inner counter, columnCounter
    var columnCounter = 0;
    // Every time the outer loop runs, the inner loop runs repeatedly until
    // the inner loop condition is met.
    while (columnCounter < input) {
      // Each time the inner loop runs, it adds "x" to output
      myOutputValue = myOutputValue + '🌼';
      columnCounter = columnCounter + 1;
    }
    // At the end of each outer loop, add a <br> tag to begin a new row
    myOutputValue = myOutputValue + '<br>';
    rowCounter = rowCounter + 1;
  }
  // After the outer loop has run to completion, return the output compiled
  // by the above loops.
  return myOutputValue;
};


// trianagle
var drawTri = function(input) {
  var myOutputValue = '';
  // initiate a column counter in the inner loop
  var columnCounter = input;
  // initiate the outer counter for depth
  var rowCounter = 0;
  while (rowCounter < columnCounter) {
    var spotCounter = 0;
    // loop to match row and column
    while (spotCounter <= rowCounter) {
      myOutputValue +=  '🍀'
      spotCounter = spotCounter + 1 ;
    }

    // at the end of each level ie outer loop, add a <br> tag to begin a new row
    myOutputValue +=  '<br>';
    rowCounter +=1;
  }
  return myOutputValue;
}


// while loop
// Initialise counter
var counter = 0;
// Declare loop condition
while (counter < 10) {
  console.log('hello');
  // Increment counter
  counter += 1;
}


// Initialise counter, declare loop condition, and increment counter in 1 line
for (var counter = 0; counter < 10; counter += 1) {
  console.log('hello');
}

// Outline Sq
var borderSquare = function (input) {
  var myOutputValue = '';
  // sideLength represents the length of each side of the square
  var height = input;
  var rowCounter = 0;
  while (rowCounter < height) {
    var innerCounter = 0;
    while (innerCounter < height) {
      // If current iteration represents a border element, draw 🌸 instead.
      if (
            rowCounter == 0 || // top row
            innerCounter == 0  || // left most column
            rowCounter == height -1 || // last row
            innerCounter == height - 1  // last column
        ) {
        myOutputValue += '🌸';
      } else {
        // Add a 🍀 to the current row
        myOutputValue += '🍀';
      }

      innerCounter += 1;
    }
    // Insert a line break to start a new row
    myOutputValue += '<br>';
   rowCounter += 1;
  }
  return myOutputValue;
};