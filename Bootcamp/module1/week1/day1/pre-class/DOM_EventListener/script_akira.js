// take in an array of word arrays
// create one yellow box for each word array
// return a grey box DOM element
const createGreyBox = (wordArrays) => {
  const greyBox = document.createElement('div');
  greyBox.classList.add('container');
  for (let i = 0; i < wordArrays.length; i += 1) {
    const yellowBox = createYellowBox(wordArrays[i]);
    greyBox.appendChild(yellowBox);
  }
  return greyBox;
};
// take in an array of words
// create one pink box for each word
// return a yellow box DOM element
const createYellowBox = (words) => {
  const yellowBox = document.createElement('div');
  yellowBox.classList.add('row');
  for (let i = 0; i < words.length; i += 1) {
    const pinkBox = createPinkBox(words[i]);
    yellowBox.appendChild(pinkBox);
  }
  return yellowBox;
};
// take in a word
// return a pink box with that word in it
const createPinkBox = (word) => {
  const pinkBox = document.createElement('span');
  pinkBox.classList.add('word');
  pinkBox.innerText = word;
  return pinkBox;
};
// define the data we'll use to create the elements
var wordArrays = [
  ['orange', 'tomato'],
  ['fire engine', 'basketball'],
];
// call the function to create the grey box
const greyBox = createGreyBox(wordArrays);
// put the grey box onto the screen
document.body.appendChild(greyBox);
