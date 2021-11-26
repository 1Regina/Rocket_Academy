console.log('starting...');


// 1 spot for countdown on page
let milliseconds = 5000;
const delayInMilliseconds = 1;
const output = document.createElement('div');
output.innerText = milliseconds;
document.body.appendChild(output);

const ref = setInterval(() => {
  output.innerText = milliseconds;

  if (milliseconds <= 0) {
    clearInterval(ref);
  }

  milliseconds -= 1;
}, delayInMilliseconds);


// string of countdown on page
// let milliseconds = 5000;
// const delayInMilliseconds = 1000;
// const ref1 = setInterval(() => {
//   const output = document.createElement('div');
//   // output.innerText = milliseconds;
//   document.body.appendChild(output);
//   output.innerText = milliseconds;

//   if (milliseconds <= 0) {
//     clearInterval(ref1);
//   }

//   milliseconds -= 1;
// }, delayInMilliseconds);


// EXERCISE
// Counting up
let millisecondsUp = 0;
// const delayInMilliseconds = 1;
const outputUp = document.createElement('div');
// outputUp.innerText = millisecondsUp;
document.body.appendChild(outputUp);

const refUp = setInterval(() => {
  outputUp.innerText = millisecondsUp;

  if (millisecondsUp >= 5000) { // stop when counter hits 20 
    clearInterval(refUp);
  }

  millisecondsUp += 1;
}, delayInMilliseconds);