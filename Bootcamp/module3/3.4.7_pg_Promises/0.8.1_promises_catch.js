

// random number representing between 0 and .999 seconds
const randomNumber = () => Math.floor(Math.random() * 9000);

// function that wraps setTimeout in a promise
const setDelay = (delay) => {
  console.log(`delaying ${delay}`);

  return new Promise((resolve, reject) => {
    // throw if we have to wait too long
    if (delay > 500) {
      throw "we'll wait too long";
    }

    setTimeout(() => {
      console.log(`going into setTimeout`)
      // timeout is over, resolve
      resolve();
    }, delay);
  });
};

setDelay(randomNumber())
  .then(() => {
    console.log('all done with delay');
  })
  .catch((error) => {
    console.log('catching error');
    console.log(error);
  })