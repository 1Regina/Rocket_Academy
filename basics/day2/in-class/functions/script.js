let main = function (input) {
  // cost of air con
  // let myOutputValue = calCost(input);
  // Screen TIME
  // let myOutputValue = calSreenDays(input);
  //Papayas Supply Budget
  // let myOutputValue = calBudget(input);
  // Ice Machine
  // let myOutputValue = calHoursRun(input);
  // Beer Order
  // let myOutputValue = calKegs (input);
  // Helen & Ivan
  // let myOutputValue = calRicherBy(input);
  // Cost of Cellular Data
  // let myOutputValue = calGBRate(input)
  // Mortgage Calculator
  let myOutputValue = calCustomerPayments( input);
  // let myOutputValue =  mortgageCalculator(input);
  return myOutputValue;
};

// cost of air con
let calCost = function (hours) {
  const costPerHour = 0.2 ; 
  const consumptionRate = 2 ; 
  let totalConsumptionCostPerHour = costPerHour * consumptionRate ; 
  let totalCost = totalConsumptionCostPerHour * hours ;
  // let calCostOutput = "Pls pay $" + totalCost.toFixed(2) + " for aircon use.";
  return calCost;
};

// Screen Time
let calSreenDays = function (hours) {
  const lifeExpectancy = 82 ; 
  const daysAnnual = 365 ;
  const hoursDaily = 24; 
  let lifeTimeScreenHr = lifeExpectancy * daysAnnual * hours ; 
  let daysOnScreen = lifeTimeScreenHr / hoursDaily;  
  let calSreenDaysDisplay = "At this rate, you will spend " + daysOnScreen.toFixed(1) + " days of your life on screen." ;
  return calSreenDaysDisplay;
};

//Papayas Supply Budget
let calBudget = function (pricePerKg) {
  const consumptionPerMonth = 2;
  let budget = consumptionPerMonth * pricePerKg;
  let budgetDisplay = "With this month's price, the papaya lover must budget $" + budget.toFixed(2);  
  return budgetDisplay;
};

// Ice Machine
let calHoursRun = function (guests) {
  const drinksPerGuest = 2; 
  const cubesPerDrink = 4 ; 
  const weightPerCube = 1.5; 
  const cubeWeightPerPound = 454 ; 
  const machineProductionRateInPoundPerHour = 5;
  let iceGramsPerGuest = drinksPerGuest * cubesPerDrink * weightPerCube;  
  let poundReqPerGuest = iceGramsPerGuest / cubeWeightPerPound;
  let machineHoursReqTotal =  (guests * poundReqPerGuest) / machineProductionRateInPoundPerHour; 
  let machineHoursReqDisplay = "With " + guests + " guests, the ice machine needs to run for " +machineHoursReqTotal.toFixed(2) + " hours." ; 
  return machineHoursReqDisplay;
};

// Beer Order
let calKegs = function(customersDaily){
  const pintPerVisit = 2; 
  const pintsCapacityHalfBarrelKeg = 124; 
  // assume 30 days in a month and 1 quarter is 3 months
  let daysInQuarter = 30 * 3 ;
  let reqKegs = (pintPerVisit * customersDaily * daysInQuarter)  / pintsCapacityHalfBarrelKeg;
  let reqKegsDisplay = "The bar needs " + Math.ceil(reqKegs) + " kegs in a quarter."
  return reqKegsDisplay;
}; 

// Helen and Ivan's Coins
let calRicherBy = function (moreI20){
  // Helen is always richer since Ivan has more 20 cents coints
  let value20 = 0.2 ; 
  let value50 = 0.5 ;
  let valueDiff = value50 - value20 ;
  let helenRicherBy = moreI20 * valueDiff; 
  let helenRicherByOuput =  "Helen is richer by $" + helenRicherBy.toFixed(2); 
  return helenRicherByOuput;
};

// Cost of Cellular Data
let calGBRate = function (useGB) {
  const cost50GB = 19.99;
  const plan50GB = 50;
  let numPlan = Math.ceil(useGB/plan50GB);
  console.log(useGB + "usage means "+ numPlan + "50GB plams")
  let payment = numPlan * cost50GB
  let costPerGB = payment / useGB
  let costPerGBDisplay = "The cost per GB used is $" + costPerGB.toFixed(2);
  return costPerGBDisplay
};

// // Mortgage Calculator
let calTotalPayment = function (loan, tenure) {
  const interest = 0.03 ; 
  let paymentTotal = loan * (1 + interest) ** tenure
  return paymentTotal;
};

let calMonthlyPayment = function (calTotalPayment, tenure) {
  // 1 year has 12 months
  let monthlyRepayment = calTotalPayment/((tenure) * 12);  
  // let monthlyRepaymentDisplay = "3. Monthly repayment is $" + monthlyRepayment ; // cannot put string output for helper function otherwise text will be fed into the calCustomerPayment function with use input to give NAN for operations involving calMonthlyPayment e.g interestTotal
  return monthlyRepayment; 
};

let calCustomerPayments = function (loan) {
  let tenure = 10; 
  let totalToRepay = calTotalPayment(loan, tenure); 
  console.log(totalToRepay);
  let interestTotal = totalToRepay - loan; 
  console.log(typeof(interestTotal));
  console.log(interestTotal);
  console.log(loan);
  let monthlyRepayment = calMonthlyPayment(totalToRepay, tenure); 
  return `For a mortgage loan of $${loan}, the customer would pay back a total of $${totalToRepay.toFixed(2)} over 10 years. \n
  The customer would pay a total of $${interestTotal.toFixed(2)} in interest. \n
  The customer would pay $${monthlyRepayment.toFixed(2)} monthly over the loan duration.`;
  
};


