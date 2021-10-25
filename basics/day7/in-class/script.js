var main = function(input){
  // myOutputValue = helloAllWords(input)
  // myOutputValue = addressBook(input)
  // myOutputValue = madLib(input)
  // myOutputValue = inputCreate(input)
  // myOutputValue = insertMultiple(input)
  myOutputValue = createPhraseArray (input)
  return myOutputValue
}


// print out pre-existing + current words
var letters = [];
var helloAllWords = function (input) {
  letters.push(input);

  var letterslength = letters.length;
  var myOutputValue = "hello world <br>";

  var counter = 0;
  // run once for every letter
  while (counter < letterslength) {
    console.log('counter ' + counter);
    console.log('letter ' + letters[counter]);
    myOutputValue =  myOutputValue + letters[counter] + '<br>'
    console.log(myOutputValue)
    console.log('@@@@@@@@@@@@@@@@@')
    counter = counter + 1;
  }
  return myOutputValue;
};

 
// Initialise an empty names array
var names = [];
var addressBook = function (input) {
  // Set a boolean value found to a default value of false
  var found = false;
  
  // Loop over the names array, and set found to true if the input name already
  // exists in the names array
  var index = 0;
  while (index < names.length) {
    var currentName = names[index];
    if (currentName == input) {
      found = true;
    }
    index = index + 1;
  }

  // If no duplicate name was found, add the input name to the names array 
  if (!found) {
    names.push(input);
  }
  // Return the full array of names
  var myOutputValue = 'All names: ' + names;
  return myOutputValue;
};


//BASE https://basics.rocketacademy.co/in-class-exercises/day-7-arrays-and-loops#input-multiple-words
// When the Basics Starter Code app loads, the user can input 1 adjective at a time to store in the app. Store the user-inputted adjectives in a global array variable.
// When the user inputs the word "create" the app completes the Mad Lib with a random word from the user-inputted adjectives array and outputs the completed Mad Lib in the grey box

var userAdj = [];
var getRandomIndex = function(arrayLength){
  // create a random number from zero to array length minus one.
  // this number is in the range from the first
  // index (zero) to the last index (array length minus one)
  var randomIndex = Math.floor( Math.random() * arrayLength );
  return randomIndex;
};

var madLib = function (input) {
  userAdjLength = userAdj.length;
  // When the user inputs the word "create" the app completes the Mad Lib with a random word from the user-inputted adjectives array and outputs the completed Mad Lib in the grey box.
  if (input.trim() == "create") {
    //choose a random index from array
    var randomInteger = getRandomIndex(userAdjLength);
    //get chosen word
    var chosenWord = userAdj[randomInteger];
    myOutputValue = madlibCreater(chosenWord);
    return myOutputValue;
  } else {
    userAdj.push(input);
    console.log(userAdj)
    return "word added";
  }
};

var madlibCreater = function (chosenWord) {
  return (
    '"WOW!" he said EXCITEDLY as he jumped into his convertible PAPAYA and drove off with his ' +
    chosenWord +
    " wife."
  );
};

// //More comfortable
// // Input and Create Mode https://basics.rocketacademy.co/in-class-exercises/day-7-arrays-and-loops#input-multiple-words

let mode = "input"
let adjectives = []
let inputCreate = function (word) {
  if (word == "create") {
    mode = "create"
    console.log(`now in `, mode, ` mode.`)
    let randomInteger = getRandomIndex(adjectives.length);
    //get chosen word
    let chosenWord = adjectives[randomInteger];
    myOutputValue = madlibCreater(chosenWord);
    return myOutputValue
    
  }
  else if (mode == "input") {    
    // mode = "input"
    var found = false
    var index = 0;
    while (index < adjectives.length){
      let currentAdj = adjectives[index]
      if(currentAdj == word){
        found = true
        return `${word} is already existing.`
      }
      index = index +1;
    }
    if (!found) {
      adjectives.push(word);
      
    }
    console.log("you have ", adjectives.length, "words")
    console.log("still in input mode")
    return `your adjectives array is ${adjectives}`
  }  
  else if (word == "") {
    mode = "create"
    console.log("auto mode. just submit")
    let randomInteger = getRandomIndex(adjectives.length);
    //get chosen word
    let chosenWord = adjectives[randomInteger];
    myOutputValue = madlibCreater(chosenWord);
    return myOutputValue
  }
}


// INPUT MULTIPLE WORDS https://basics.rocketacademy.co/in-class-exercises/day-7-arrays-and-loops#input-multiple-words
// already initialised
// let mode = "input"
// let adjectives = []

// 1. parse phrase into array of adjectives
// 2. create a set of adjectives
// 3. check that each word in new set is not the mother adjectives array
// 4. create sentence

phraseAdjs = []
var found = false
let createPhraseArray = function(input) {
  phraseAdjs =  input.split(' ')
  
  var index = 0;
  while (index < phraseAdjs.length){
    let currentAdj = phraseAdjs[index]
    if(phraseAdjs.includes(currentAdj) == true){
      found = true
      console.log(`index`, index)
      // console.log(, `unique adj`)
      index = index +1;
      return `phrase contains duplicate words.`
      } else {
    phraseAdjs.push(currentAdj);
    index = index +1;
    console.log(phraseAdjs.length, `unique adj`)
    return `all unique words`
    }
  }
}


