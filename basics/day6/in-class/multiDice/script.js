var main = function (input) {
  var myOutputValue = multiDice(input)
  return myOutputValue;
};
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