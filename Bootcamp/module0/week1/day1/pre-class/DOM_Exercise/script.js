// Please implement exercise logic here

// Element Creation in a Loop
const wordsBoxes = [];
numberInput = 0;
const createWords = (numberInput) => {
  for (let i = 1; i <= numberInput; i += 1) {
    // for (let j=0; j<2; j+=1)
    let topArray = [];
    let bottowmArray = [];
    let tableArray = [];
    topArray.push(String(i));
    topArray.push(`papaya`);
    bottowmArray.push(`banana`);
    bottowmArray.push(`world`);
    tableArray.push(topArray);
    tableArray.push(bottowmArray);
    wordsBoxes.push(tableArray);
  }
  return wordsBoxes;
};

const createBoxes = (numberInput) => {
  for (let i = 0; i < numberInput; i += 1) {
    const wordings = createWords(numberInput);
    const greyBox = document.createElement(`div`);
    greyBox.classList.add(`container`);
    document.body.appendChild(greyBox);
    for (let j = 0; j < 1; j += 1) {
      const row = document.createElement(`div`);
      row.classList.add(`row`);
      // document.body.appendChild(row);
      for (let k = 0; k < 2; k += 1) {
        const wordTop = document.createElement(`span`);
        wordTop.classList.add(`word`);
        wordTop.innerText = wordings[i][0][k];
        // document.body.appendChild(wordTop);
        row.appendChild(wordTop);
      }

      const row2 = document.createElement(`div`);
      row2.classList.add(`row`);
      for (let k = 0; k < 2; k += 1) {
        const wordBottom = document.createElement(`span`);
        wordBottom.classList.add(`word`);
        wordBottom.innerText = wordings[i][1][k];
        row2.appendChild(wordBottom);
      }
      greyBox.appendChild(row);
      greyBox.appendChild(row2);
    }
  }
};
// createBoxes(6);

// Element Contents From an Array
const words = ['banana', 'pasta', 'alligator', 'purple', 'accurate', 'fickle'];
const manyWords = (array) => {
  const greyBox = document.createElement(`div`);
  greyBox.classList.add(`container`);
  document.body.appendChild(greyBox);
  for (let i = 0; i < 1; i += 1) {
    const row = document.createElement(`div`);
    row.classList.add(`row`);
    for (let j = 0; j < array.length; j += 1) {
      const word = document.createElement(`span`);
      word.classList.add(`word`);
      word.innerText = words[j];
      row.appendChild(word);
    }
    greyBox.appendChild(row);
  }
};

// manyWords(words);

// Element Contents From an Array of Arrays
const arrayWords = [
  ['orange', 'tomato'],
  ['fire engine', 'basketball'],
];

const manyArrays = (numberInput) => {
  for (let i = 0; i < numberInput; i += 1) {
    const wordings = createWords(numberInput);
    const greyBox = document.createElement(`div`);
    greyBox.classList.add(`container`);
    document.body.appendChild(greyBox);
    for (let i = 0; i < arrayWords.length; i += 1) {
      const row = document.createElement(`div`);
      row.classList.add(`row`);
      for (let k = 0; k < arrayWords[i].length; k += 1) {
        const wordTop = document.createElement(`span`);
        wordTop.classList.add(`word`);
        wordTop.innerText = arrayWords[i][k];
        row.appendChild(wordTop);
      }
      greyBox.appendChild(row);
    }
  }
};
// manyArrays(6);

// Refractor solution 1
// const yellowBox = (array) => {
//   for (let i = 0; i < array.length; i += 1) {
//     const row = document.createElement(`div`);
//     row.classList.add(`row`);
//     return row;
//   }
// };
// yellowBox(arrayWords);

// const withYellow = (numberInput) => {
//   for (let i = 0; i < numberInput; i += 1) {
//     const greyBox = document.createElement(`div`);
//     greyBox.classList.add(`container`);
//     document.body.appendChild(greyBox);
//     for (let k = 0; k < arrayWords.length; k += 1) {
//       const wordTop = document.createElement(`span`);
//       const yellow = yellowBox(arrayWords);
//       yellow.appendChild(wordTop);
//       greyBox.appendChild(yellow);
//     }
//   }
// };
// withYellow(3);

// Refractor solution 2
const makeYellow = (numberInput, arrayWords) => {
  for (let i = 0; i < numberInput; i += 1) {
    const greyBox = document.createElement(`div`);
    greyBox.classList.add(`container`);
    document.body.appendChild(greyBox);
    for (let k = 0; k < arrayWords.length; k += 1) {
      const wordTop = document.createElement(`span`);
      const row = document.createElement(`div`);
      row.classList.add(`row`);
      row.appendChild(wordTop);
      greyBox.appendChild(row);
    }
  }
};
makeYellow(2, arrayWords);
