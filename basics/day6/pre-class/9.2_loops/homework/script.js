var main = function (input) {
  // var myOutputValue = drawChar(input)
  // var myOutputValue = drawSq(input);
  var myOutputValue = drawTri(input)
  return myOutputValue;
};

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
let drawTri = function(input) {
  let myOutputValue = '';
  // initiate a column counter in the inner loop
  let spotCounter = Number(input);
  // initiate the outer counter for depth
  let rowCounter = 0;
  while (rowCounter < spotCounter) {
    columnCounter = 0
    // loop to match row and column
    while (columnCounter < rowCounter) {
      myOutputValue +- '🍀'
      columnCounter += 1 ;
    }

    // at the end of each level ie outer loop, add a <br> tag to begin a new row
    myOutputValue =  myOutputValue + '<br';
    rowCounter = rowCounter +1;
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