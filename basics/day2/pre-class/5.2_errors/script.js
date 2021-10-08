
// let main = function (input) {                    // alternatively var main = function(input) {
//   // var myOutputValue = convertKmToMiles(input);
//   // var myOutputValue = input; 
//   // var myOutputValue = "wow hello"
//   // var myOutputValue = doubleNumber (input)
//   // var myOutputValue = guestToOrange(input);        // Juice Wedding
//   // var myOutputValue = hugEveryone (input);         // SG Hugs
//   // var myOutputValue = costToPaintHouse(input);     // House Paint
//   // var myOutputValue = catchUpSpeed(input) ;        // Train Speed  
//   // let myOutputValue = angle(input) ;               // Clock
//   var myOutputValue = 'hello world'();
//   return myOutputValue;
// };

console.log("1st")
var main = function (input) {
  console.log("2nd")
  var myOutputValue = kilometersToMiles(input);
  // console.log("=== DISTANCE IN KM ===")
  console.log('myOutputValue');
  console.log(myOutputValue);
  return myOutputValue;
};
console.log("3rd")

var kilometersToMiles = function (distanceInKilometers) {
  console.log("4th")
  var distanceInMiles = distanceInKilometers * 0.62;
  console.log('this is the distance in miles');
  console.log(distanceInMiles);
  return distanceInMiles;
};
console.log("5th")
