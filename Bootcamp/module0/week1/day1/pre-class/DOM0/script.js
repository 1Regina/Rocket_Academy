console.log('yay');
// make a variable out of the input and button
var button = document.querySelector('#starter-button');

var stuffHappened = function () {
  console.log('stuff112221');
  var myInput = document.querySelector('#starter-ex');
  var typedValue = myInput.value;
  var h2 = document.createElement('h2');
  h2.addEventListener('click', stuffHappened);
  h2.innerText = typedValue;
  // h2.innerText = 'keep trying';
  // h2.appendChild(h21)

  document.body.appendChild(h2);
};

var h21 = document.createElement('h4');
stuffHappened();
button.addEventListener('click', stuffHappened);
// var myNewMain = function (event) {
//   console.log('hey wow my new function');
// };

// var wowParagraph = document.createElement('h2')
// wowParagraph.addEventListener('click', myNewMain);


