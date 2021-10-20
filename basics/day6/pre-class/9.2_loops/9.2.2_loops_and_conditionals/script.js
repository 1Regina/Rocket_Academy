var main = function (input) {
  var myOutputValue = '';
  var counter = 0;
  // Continue the loop while counter is less than the input value
  while (counter < input) {
    // If counter is less than 5, add "yes" to output
    if (counter < 5) {
      myOutputValue = myOutputValue + 'yes';
      // Otherwise, add "no" to output
    } else {
      myOutputValue = myOutputValue + 'no';
    }
    counter = counter + 1;
  }
  return myOutputValue;
};


// var main = function (input) {
//   var myOutputValue = '';

//   var counter = 0;
//   while (counter < input) {
//     // If counter is even, add "yes" to output
//     // The modulus (%) operator returns the remainder after division
//     // If a number divided by 2 equals 0, we consider it even.
//     if (counter % 2 == 0) {
//       myOutputValue = myOutputValue + 'yes';
//       // Otherwise, add "no" to output
//     } else {
//       myOutputValue = myOutputValue + 'no';
//     }
//     counter = counter + 1;
//   }

//   return myOutputValue;
// };

