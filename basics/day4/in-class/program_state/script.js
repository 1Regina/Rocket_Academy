var main = function (input) {
  // var myOutputValue = guessWord(input);
  var myOutputValue =playSecretWordTwiceInARow(input);
  return myOutputValue;
};

//  Guess correct Word
var countCorrect = 0;
var banana = "banana";
var chisel = "chisel";
var faucet = "faucet";
var countGuess = 0;

var rightWords = banana || chisel || faucet

// 1. Generate word
let generateWord = function ()  {
  let randomNumber = (Math.floor(Math.random() * 3))
  if (randomNumber === 0){
    return banana;
  }
  else if (randomNumber === 1){
    return chisel;
  }
  else {
  return  faucet;
  }
};


var guessWord = function(myWord ) {
  // countCorrect = countCorrect;
  var randomWord = generateWord();
  countGuess = countGuess +1;
  var message = `You are wrong. The Computer word is ${randomWord} but you guess ${myWord}.Correct Guess Count is ${countCorrect}. `
  if (myWord == randomWord
      ){
    countCorrect = countCorrect + 1;
    console.log(countCorrect);
    countGuess = countGuess +1;
    message = `You are right. The Computer word is ${randomWord} but you guess ${myWord}. Correct Guess Count is ${countCorrect}.`
  } 
  if (
    (countGuess >= 2) && (countCorrect >= 2)
    ) {
      message = "You guess at least twice correct. Always a winner Pls reset and start again"
      countCorrect = 0;
    }  
   return message;
};

// Guess Twice in a Row Correct to Win
// * Secret Word Twice in a Row
//  */
var prevSecretWord = '';

// generateSecretWordNoRepeats is a good-to-have only. Could skip
// Randomly return banana, chisel or faucet without repeating words across consecutive guesses.
var generateSecretWordNoRepeats = function () {
  var secretWord = prevSecretWord;
  // Keep generating secret words until we get a different word
  // "While" Creates a loop that repeats itself as long as a given condition is true (the condition being assessed is that which is in the parenthesis). We'll learn more about "while loops" in Day 6. You can also read more about "while loops" here: https://www.w3schools.com/jsref/jsref_while.asp
  while (secretWord == prevSecretWord) {
    // Use generateSecretWord function from previous exercise
    secretWord = generateSecretWord();
  }
  // Keep track of the current secret word as prevSecretWord in the next guess.
  prevSecretWord = secretWord;
  return secretWord;
};

var numCorrectGuessesSoFar = 0
var numCorrectGuessesNeededToWin = 2
// My modified solution with if else if and else
var playSecretWordTwiceInARow = function (guessedWord) {
  var secretWord = generateSecretWordNoRepeats(); // generateWord(); also ok
  var standardMessage = `With my PomPiPi if-else-elseIf solution: <br>
                         You guessed: ${guessedWord}. <br>
                         Secret word: ${secretWord}.`;
  if (secretWord != guessedWord
    ) {
      return `${standardMessage}. Try again`
    }
  else if (secretWord == guessedWord && ((numCorrectGuessesSoFar+1) < numCorrectGuessesNeededToWin)
    ) {
    numCorrectGuessesSoFar = numCorrectGuessesSoFar + 1; 
    console.log(`numCorrectGuessesSoFar : ${numCorrectGuessesSoFar}.` )
    return `${standardMessage} <br> 
        You guessed correctly! <br> 
        You need 1 more correct guess to win.`
  }
  else {
        numCorrectGuessesSoFar = numCorrectGuessesSoFar + 1;
        console.log(`With 1 correct guess so far earlier, now your total numCorrectGuessesSoFar : ${numCorrectGuessesSoFar}.` )
        return `${standardMessage} <br> 
        You guessed correctly twice in a row. <br> 
        You win! Please play again.`
       }
  };


//Secret Word X in a Row 
// generate req guess
var main = function() {
randomReqGuess = (Math.floor(Math.random() * 3)) + 2
console.log(randomReqGuess)
return randomReqGuess
};