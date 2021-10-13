var main = function(input) {
  // Lucky 11
  // myOutputValue = getTwoSameDice(input);
  // Hawker Food Categorisation
  // myOutputValue = cateFood(input);
  // 4D with Single-Digit Comparison
  // myOutputValue = checkDigit(input);
  // Hawker Food Randomness
  // myOutputValue = guessHawkerDish(input);
  // 4D with Winning Range
  myOutputValue = acceptRange(input)
  return myOutputValue;
};

// Lucky 11
var rollDice = function () {  
  // produces a decimal between 0 and 6  
  var randomDecimal = Math.random() * 6;  
  
  // take off the decimal  
  var randomInteger = Math.floor(randomDecimal);  
  
  // it's anumber from 0 - 5 ... add 1  
  var diceNumber = randomInteger + 1;  
  // console.log(randomInteger)
  return diceNumber;
};

let getTwoSameDice = function (input) {
  let rollDice1 = rollDice(); 
  let rollDice2 = rollDice();
  let myOutputValue = `You lose. Your first dice roll is ${rollDice1} and your second dice roll is ${rollDice2} and you guess ${input}.`
  if (
      input == rollDice1 ||
      input == rollDice2 ||
      rollDice1 == 1 && rollDice2 == 1) {
        myOutputValue = `You win. Your first dice roll is ${rollDice1} and your second dice roll is ${rollDice2} and you guess ${input}.`
      }
  if (   
      rollDice1 + rollDice2 == 11) {
      myOutputValue = `You win. Your first dice roll is ${rollDice1} and your second dice roll is ${rollDice2}. Their total is 11 and you guess ${input}.`
    }
  return myOutputValue ;
};

// Hawker Food Categorisation
var cateFood = function(foodItem) {
  if (
    foodItem == "chicken rice" ||
    foodItem == "nasi lemak"   ||
    foodItem ==  "bak kut teh"
    ){
      base = "rice" ;
    }
    else if (
      foodItem == "laksa"   ||
      foodItem == "hokkien mee"  
    ) {
      base = "noodles" ;
    }
    else {
      base = "others";
    }
  return base;
};

// 4D with Single Digit

let generateDigit = function(){
  // generate a 0 =< decimal number < 9
  let randomDecimal = Math.random() * 9; 

  // round down to whole number including 0
  let randomNum = Math.floor(randomDecimal); 
  
  // set the number to include higher ceiling
  let randomDigit = randomNum + 1;

  return randomDigit;
};

let checkDigit = function(input) {
  let d1 = generateDigit();
  let d2 = generateDigit();
  let d3 = generateDigit();
  let d4 = generateDigit();
  let myGuessResult = `Opps. You guess ${input} and it did not match one of the 4D numbers which are ${d1}${d2}${d3}${d4}.`;

  if (
    d1 == input ||
    d2 == input ||
    d3 == input ||
    d4 == input 
    ) {
      myGuessResult = `Congrats! You guess ${input} and it matches one of the 4D numbers which are ${d1}${d2}${d3}${d4}.`
    }; 
  return myGuessResult;
};

// Hawker Food Randomness
let generateDishNum = function(totalDishes){
  // generate a 0 =< decimal number <  totalDishes
  let randomDecimal = Math.random() * totalDishes; 

  // round down to whole number including 0
  let randomNum = Math.floor(randomDecimal); 
  
  // set the number to include higher ceiling
  let randomDigit = randomNum + 1;
  return randomDigit;
};

let tagDish = function () {
  // specify maximum number of dishes
  let totalDishes = 6;
  let randomDishNum = generateDishNum(totalDishes); // can put down digit here for testing
  if (
    randomDishNum == 1) {
      return "chicken rice"
    }; 
  if (
    randomDishNum == 2) {
      return "nasi lemak"
    }; 
  if (
    randomDishNum == 3) {
      return "bak kut teh"
    }; 
  if (
    randomDishNum == 4) {
      return "laksa"
    }; 
  if (
    randomDishNum == 5) {
      return "hokkein mee"
    }; 
  if (
    randomDishNum == 6) {
      return "roti prata"
    }; 
};

let guessHawkerDish = function( customerDish ) {
  let uncleDish = tagDish();
  let uncleMessage = `you lose. You guess ${customerDish} but uncle wants to cook ${uncleDish}.`
  if (
    customerDish == uncleDish
  ){
    uncleMessage = `you win. You guess ${customerDish} and uncle wants to cook ${uncleDish}. `
  };
  return uncleMessage;
};

// More Comfortable
// 4D with Winning Range
let acceptRange = function(input) {
  let d1 = generateDigit();
  let d2 = generateDigit();
  let d3 = generateDigit();
  let d4 = generateDigit();
  let fourD = `${d1}${d2}${d3}${d4}`;
  let fourDInNum = Number(fourD); // insert number here to test

  console.log(typeof (d4))
  console.log(typeof fourD)
  console.log(typeof fourDInNum)
  let fourDResult = `You lose. Your guess ${input} is out of range by more than 1000 from ${fourDInNum}.`
  if (Math.abs(input-fourDInNum) <= 1000
    ){
      fourDResult = `You win. Your guess ${input} is within 1000 range of ${fourDInNum}.`
    }
  return  fourDResult;
};