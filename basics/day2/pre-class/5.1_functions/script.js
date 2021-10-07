var main = function (input) {
  // var myOutputValue = convertKmToMiles(input);
  // var myOutputValue = input; 
  // var myOutputValue = "wow hello"
  // var myOutputValue = doubleNumber (input)
  var myOutputValue = guestToOrange(input); 
  return myOutputValue;
};


var convertKmToMiles = function (distanceInKm) {
  var distanceInMiles = distanceInKm * 0.62;
  return distanceInMiles;
};

// var kmsToHome = 4;
// var kmsToSchool = 6;
// var kmsToWork = 7;
// undefined
// convertKmToMiles(kmsToHome);
// 2.48
// convertKmToMiles(kmsToSchool);
// 3.7199999999999998
// convertKmToMiles(kmsToWork);
// 4.34
// var result = convertKmToMiles(7676);
// undefined
// result
// 4759.12

// Double a Number
var doubleNumber = function (number) {
  return number * 2;
};

// Convert Kilograms to Pounds
var convertKilosToPounds = function (kilos) {
  return kilos * 2.2;
};

// Calculate Area of a Circle
var calcCircleArea = function (radius) {
  var pi = 3.1415;
  return pi * radius * radius;
};

var guestToOrange = function (guests) {
  var needOranges = guests * 4; 
  var litresOfOrange = (guests * 90) / 1000; 
  var weddingOranges = "the wedding needs " + needOranges + " oranges and " + litresOfOrange + " litres of orange juice"
  return weddingOranges; 
};