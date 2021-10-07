let main = function (input) {                    // alternatively var main = function(input) {
  // var myOutputValue = convertKmToMiles(input);
  // var myOutputValue = input; 
  // var myOutputValue = "wow hello"
  // var myOutputValue = doubleNumber (input)
  // var myOutputValue = guestToOrange(input);     // Juice Wedding
  // var myOutputValue = hugEveryone (input);      // SG Hugs
  // var myOutputValue = costToPaintHouse(input);  // House Paint
  // var myOutputValue = catchUpSpeed(input) ;        // Train Speed  
  let myOutputValue = angle(input) ; 
  return myOutputValue;
};


var convertKmToMiles = function (distanceInKm) {
  var distanceInMiles = distanceInKm * 0.62;
  return distanceInMiles;
};

// Console work
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

// Juice Wedding
var guestToOrange = function (guests) {
  var needOranges = guests * 4; 
  var litresOfOrange = (guests * 90) / 1000; 
  var weddingOranges = "the wedding needs " + needOranges + " oranges and " + litresOfOrange + " litres of orange juice" ;
  return weddingOranges; 
};

//SG Hugs
var hugEveryone = function(hugDurationSecs) {
  var sleepAndEatDaily = 9;
  var hoursToHugDaily = 24- sleepAndEatDaily; 
  var secondsInHour = 60 * 60 ;
  var lengthYearInSecForHug = secondsInHour * hoursToHugDaily * 365; 
  var sgPopul = 5700000;
  var yearsToHugEveryone = (Math.round( sgPopul / (lengthYearInSecForHug / hugDurationSecs ))).toFixed(2) ; 
  return "it would take " + yearsToHugEveryone + " years to hug everyone in Singapore." ;
}; 


// House Paint
var areaInMetres = function (length , width){
  return length * width ;
};
var convertCmToM = function (lengthInCm) {
  return lengthInCm / 100;
};

var costToPaintHouse = function (paintCostLitre) {
  // find total areas not required for painting
  var windowsQty = 6; 
  var doorsQty = 8 ;
  var lengthWindowOrDoor = convertCmToM(150);
  var widthWindowOrDoor = convertCmToM(90);
  var areaWindowOrDoor = lengthWindowOrDoor * widthWindowOrDoor ;
  var totalAreaWindowsAndDoors = windowsQty * areaWindowOrDoor + doorsQty * areaWindowOrDoor ;

  // find net area required for painting
  var roomQty = 6; 
  var grossRoomArea = areaInMetres (3, 3);
  var grossHouseArea = roomQty * grossRoomArea ; 
  var areaToPaint = grossHouseArea -  totalAreaWindowsAndDoors ; 
  
  // paint costing
  var coatQty = 2;
  var areaPerCan = 300;
  var totalCansReq = (areaToPaint * coatQty) / areaPerCan ; 
  var totalCostToPaintHouse = totalCansReq * paintCostLitre ; 
  return "At $" + paintCostLitre + " per can, it will cost $" + totalCostToPaintHouse.toFixed(2) + " to paint your designer house."
};
  

// Train Speed
let catchUpSpeed = function (delayMins) {
  const train1Speed = 200;
  const timeToTokyoTrain1 = 2; 
  let distToTokyo = train1Speed * timeToTokyoTrain1 ; 
  let delayHour = delayMins / 60; 
  let durationTrain2ReachToyko = timeToTokyoTrain1 - delayHour ; 
  let reqSpeed = distToTokyo / durationTrain2ReachToyko;
  return `Catchup Speed must be ${reqSpeed.toFixed(2)} kph` ;
};


// Clock
let angle = function (minsPast1) {
  let timeDiff = 5 - minsPast1 ;
  const minsInHour = 60; 
  let gapTime = minsInHour - timeDiff;
  let angleBetweenHands = (gapTime/  minsInHour) * 360 
  if (minsPast1 < 5) {
    return `Angle between hour and minute hands is ${angleBetweenHands.toFixed(0)} degrees` ;
  } else {
    return `Angle between hour and minute hands is ${(angleBetweenHands - 360).toFixed(0)} degrees`
  };
};
