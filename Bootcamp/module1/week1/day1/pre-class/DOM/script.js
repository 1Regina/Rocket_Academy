// Please implement exercise logic here
// make a variable out of the input and button
var button = document.querySelector('#starter-button');

// call this function
var myButtonClicked = function () {
  console.log(`2342`)
  var input = document.querySelector('#starter-ex');
  console.log(input)
  // get the current value that's been typed into the input
  var typedValue = input.value;

  // create a new h2
  var newHtwo = document.createElement('h2');

  // say which function to call *when* the user clicks the button
  newHtwo.addEventListener('click', myButtonClicked);

  // set the text inside this new element
  newHtwo.innerText = typedValue;

  // make the h2 appear on screen
  document.body.appendChild(newHtwo);

  // empty out the HTML input
  input.value = '';
};

myButtonClicked()
// say which function to call *when* the user clicks the button
button.addEventListener('click', myButtonClicked);


// const coolParagraph = document.createElement('p');
// coolParagraph.innerText = 'hey, cool!';
// document.body.appendChild(coolParagraph);