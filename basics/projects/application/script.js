var main = function(input){
  myOutputValue = decideDinner(input)
  return myOutputValue
}

var getRandomIndex = function(arrayLength){
  // create a random number from zero to array length minus one.
  // this number is in the range from the first
  // index (zero) to the last index (array length minus one)
  var randomIndex = Math.floor( Math.random() * arrayLength );
  return randomIndex;
};


var madlibCreater = function (chosenWord) {
  return (
    'Today I would like to have ' +
    chosenWord +
    " for dinner."
  );
};

// //More comfortable
// // Input and Create Mode https://basics.rocketacademy.co/in-class-exercises/day-7-arrays-and-loops#input-multiple-words

let mode = "input"
let items = []
let decideDinner = function (word) {
  if (word == "create") {
    mode = "create"
    console.log(`now in `, mode, ` mode.`)
    let randomInteger = getRandomIndex(items.length);
    //get chosen word
    let chosenWord = items[randomInteger];
    myOutputValue = madlibCreater(chosenWord);
    return myOutputValue
    
  }
  if (mode == "input") {    
    // mode = "input"
    var found = false
    var index = 0;
    while (index < items.length){
      let currentAdj = items[index]
      if(currentAdj == word){
        found = true
        return `${word} is already existing.`
      }
      index = index +1;
    }
    if (!found) {
      items.push(word);
      
    }
    console.log("you have ", items.length, "words")
    console.log("still in input mode")
    return `your diet choices are ${items}`
  }  
  else if (word == "") {
    mode = "create"
    console.log("auto mode. just submit")
    let randomInteger = getRandomIndex(items.length);
    //get chosen word
    let chosenWord = items[randomInteger];
    myOutputValue = madlibCreater(chosenWord);
    return myOutputValue
  }
}
