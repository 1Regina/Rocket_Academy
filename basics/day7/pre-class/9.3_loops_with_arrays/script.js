var main = function(input){
  // myOutputValue = helloAllWords(input)
  myOutputValue = addressBook(input)

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


// LOOP OVER ITEMS IN ARRAY
// // Index starts at 0, representing the 0th index of the array
// var index = 0;
// // We will iterate over the letters array
// var letters = ['a', 'b', 'c'];
// // Run the loop while index is less than the length of the array
// while (index < letters.length) {
//   // letters[index] represents a different element for each loop iteration
//   var currentLoopLetter = letters[index];
//   // Log the current element in each iteration
//   console.log(currentLoopLetter);
//   // Increment the index at the end of each iteration
//   index = index + 1;
// }