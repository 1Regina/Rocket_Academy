let main = function (input) {
  // Set a default value for myOutputValue
  let myOutputValue = 'hello world';
  // If input is our secret phrase, change the value of myOutputValue
  if (input == 'palatable papaya'     ||
      input == "neat noodles"         ||
      input == "awesome ayam"         ||
      input == "delicious dumpling"  
      ) {
    myOutputValue = 'you wrote the secret phrase!';
  }
  // return myOutputValue as output
  return myOutputValue;
};