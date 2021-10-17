var main = function(input){
  // Last Roll
  // let myOutputValue = getPrevDice(input)
  // Win or Loss
  // let myOutputValue = countWins(input)
  // Most Rolled
  let myOutputValue = reportMostFreq(input)
  return myOutputValue;
};

// LAST ROLL
// initiate to beginning before any dice roll 
let prevDiceRoll = 0;

var rollDice = function () {  
  // produces a decimal between 0 and 6  
  var randomDecimal = Math.random() * 6;  
  
  // take off the decimal  
  var randomInteger = Math.floor(randomDecimal);  
  
  // it's anumber from 0 - 5 ... add 1  
  var diceNumber = randomInteger + 1;  
  
  return diceNumber;

};



var getPrevDice = function (input) {  
  // 1. roll a new dice number, assign to a variable
  var randomDiceNumber = rollDice(); 
  // 2. record output value with previous and current values as string
  var myOutputValue = `your last roll was ${prevDiceRoll}. You just roll a ${randomDiceNumber}. You guess ${input}. You lost.`;  

  if (randomDiceNumber == input) {    
    myOutputValue = `your last roll was ${prevDiceRoll}. You just roll a ${randomDiceNumber}. You guess ${input}. You win.`;  
  }  
  // 3. assign prev dice roll variable TO new dice number (AMENDED)
  prevDiceRoll = randomDiceNumber; 
  // 4. return string from step 2 
  return myOutputValue;
};

// var main = function (input) { 
//     // 1. roll a new dice number, assign to a variable
//     var getNewDice = 3// rollDice();
    
//     // 2. record output value with previous and current values as string
//     var myOutputValue = `You lose. your last roll was  ${prevDiceRoll}. You just roll a ${getNewDice} and you guess ${input}. `
//     // 3b. if condition where guess = current roll
//     if (input == getNewDice) {
//       myOutputValue =  `You win. your last roll was  ${prevDiceRoll}. You just roll a ${getNewDice} and you guess ${input}. `
//       }
//     // 3. assign prev dice roll variable TO new dice number (AMENDED)
//     //    (new dice num is then the prevDiceRoll for the next time you press submit)
//     prevDiceRoll = getNewDice
// // 4. return string from step 2 
//   return myOutputValue;
// };


// WIN / LOSS
// Track the user's running score
let score = 0;
// Track number of games won
let numGamesPlayed = 0;
// Track number of losses
let numGamesWon = 0;
// let winLossMessage = 
// let percentWinOld = ((numGamesWon/numGamesPlayed)*100).toFixed(1)

let countWins = function (input){
   // 1. roll a new dice number, assign to a variable
  let randomDiceNumber = rollDice();
  // 2. increase games played by 1
  numGamesPlayed = numGamesPlayed +1

  
  let percentWinOld = ((numGamesWon/numGamesPlayed)*100).toFixed(1)
  console.log(`wrong guess`)
  console.log(`numGames Play = ${numGamesPlayed}.` )
  console.log(`GamesOld% Won = ${percentWinOld}.` )
  let myOutputMessage = `You win ${percentWinOld}% of the time.You guess ${input}. You rolled ${randomDiceNumber}. You lose!`
  // if guess correctly
  if (input == randomDiceNumber
    ){
      numGamesWonNew = numGamesWon +1 
      // numGamesPlayed = numGamesPlayed +1
      let percentWinNew = ((numGamesWonNew/numGamesPlayed)*100).toFixed(1)
      myOutputMessage = `You win ${percentWinNew}% of the time.You guess ${input}. You rolled ${randomDiceNumber}. You win!`
      console.log(`correct guess`)
      console.log(`numGames Play = ${numGamesPlayed}.` )
      console.log(`GamesNew% Play = ${percentWinNew}.` )
    }
  numGamesWonNew = numGamesWon +1   
  return myOutputMessage;
};


// Most Rolled
// Track the frequency of dice rolls for each dice value
let freqDice1 = 0;
let freqDice2 = 0;
let freqDice3 = 0;
let freqDice4 = 0;
let freqDice5 = 0;
let freqDice6 = 0;


var reportMostFreq = function(input){
  // get roll dice number
  let randomNum = rollDice();
  // update count for dice num rolled
  if (randomNum == 1) {
      freqDice1 = freqDice1 + 1   
  }
  if (randomNum == 2) {
    freqDice2 = freqDice2 + 1   
  }
  if (randomNum == 3) {
    freqDice3 = freqDice3 + 1   
  }
  if (randomNum == 4) {
    freqDice4 = freqDice4 + 1   
  }
  if (randomNum == 5) {
    freqDice5 = freqDice5 + 1   
  }
  if (randomNum == 6) {
    freqDice6 = freqDice6 + 1   
  }
  // get the highest count out of all 6 numbers
  let highestFreq = Math.max (
     freqDice1 ,
     freqDice2 ,
     freqDice3 ,
     freqDice4 ,
     freqDice5 ,
     freqDice6 ,
  );

  // to validate count roll
  console.log(`times 1 is rolled: ${freqDice1}`)
  console.log(`times 2 is rolled: ${freqDice2}`)
  console.log(`times 3 is rolled: ${freqDice3}`)
  console.log(`times 4 is rolled: ${freqDice4}`)
  console.log(`times 5 is rolled: ${freqDice5}`)
  console.log(`times 6 is rolled: ${freqDice6}`)
  console.log (`%%%%%`)

  // match and return the most rolled number
  if (highestFreq == freqDice1) {
    message = `You just rolled a ${randomNum}. 1 is the number you roll the most. You guessed ${input}.`
  }
  if (highestFreq == freqDice2) {
    message = `You just rolled a ${randomNum}. 2 is the number you roll the most. You guessed ${input}.`
  }
  if (highestFreq == freqDice3) {
    message = `You just rolled a ${randomNum}. 3 is the number you roll the most. You guessed ${input}.`
  }
  if (highestFreq == freqDice4) {
    message = `You just rolled a ${randomNum}. 4 is the number you roll the most. You guessed ${input}.`
  }
  if (highestFreq == freqDice5) {
    message = `You just rolled a ${randomNum}. 5 is the number you roll the most. You guessed ${input}.`
  }
  if (highestFreq == freqDice6) {
    message = `You just rolled a ${randomNum}. 6 is the number you roll the most. You guessed ${input}.`
  }

  let fullMessage = message + " You lose."  

  // if guess match
  if(input == randomNum) {
    fullMessage = message + " You win."
  }

  return fullMessage 
};