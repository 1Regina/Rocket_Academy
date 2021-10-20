var main = function (input) {
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
      myOutputValue = myOutputValue + 'x';
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