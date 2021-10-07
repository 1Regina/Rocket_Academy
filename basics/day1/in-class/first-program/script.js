// Minutes in Weeks
var main = function (weeks) {
  var minutesQty = weeks * 7 * 24 * 60 ;
  return "In " + weeks + " there are " + minutesQty + " minutes! Wow";
};

// // Fahrenheit to Celsius
// var main = function (input) {
//   var farenheit = input;
//   var celsius = (farenheit -32 ) * 5/9  ;
//   return celsius;
// };


// var main = function(input) {
//   var distanceInKm = input;
//   var distanceInMiles = distanceInKm * 0.62;
//   // var myOutputValue = distanceInMiles;
//   var myOutputValue = 'Hi! ' + input + ' is equal to ' + distanceInMiles + ' miles.';
//   return myOutputValue;

// };

// Road Trip Cost
// var main = function (length) {
//   var consumptionRatePerLitre = 9;
//   var costPerLitre = 2.20; 
//   var totalCost = length * consumptionRatePerLitre * costPerLitre  ;
//   return totalCost;
// };

// Ice Cream Buffet
// var main = function (trips) {
//     var capacityContainer = 400;
//     var capacityCup = 70; 
//     var consumeContainer = (trips * capacityCup) / capacityContainer ;
//     return consumeContainer;
// };

// Time to Type Sonnets
var main = function (wordPerMinSpeed) {
    var sonnets = 17677;
    var duration = sonnets / wordPerMinSpeed ;
    var myOutputValue = "It will take you " + duration + " hours to type all of Shakespeare's sonnets." ;
    return myOutputValue;
};
