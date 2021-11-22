console.log('setTimeout! - 1');

const delayInMilliseconds = 1000; // this is one second

console.log('setTimeout! - 2');

const doLater = () => {
  console.log('setTimeout! - 3');
};

console.log('setTimeout! - 4');

setTimeout(doLater, delayInMilliseconds);

console.log('setTimeout! - 5');


// answer: it shows in console in this order 'setTimeout! - 1', 'setTimeout! - 2', 'setTimeout! - 4', 'setTimeout! - 5', 'setTimeout! - 3' . 'setTimeout! - 3' is last bcos of the delay in showing even though it was run after 'setTimeout! - 2'