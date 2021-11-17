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

// // Refractor solution 2
// const makeYellow = (numberInput, arrayWords) => {
//   for (let i = 0; i < numberInput; i += 1) {
//     const greyBox = document.createElement(`div`);
//     greyBox.classList.add(`container`);
//     document.body.appendChild(greyBox);
//     for (let j = 0; j < arrayWords.length; j += 1) {
//       // const wordTop = document.createElement(`span`);
//       const row = document.createElement(`div`);
//       row.classList.add(`row`);
//       // row.appendChild(wordTop);
//       greyBox.appendChild(row);
//       // return row
//     }
//   }
// };
// // makeYellow(2, arrayWords);

// // prob wtih manyArraysYellow. I must not create row otherwise I cannot read the words. But I also cant get makeYellow to return row otherwise my row count is
// const manyArraysYellow = (numberInput, arrayWords) => {
//   makeYellow(numberInput, arrayWords);
//   const index = arrayWords.length;
//   for (let i = 0; i < index; i += 1) {
//     const row = document.createElement(`div`);
//     // row.classList.add(`row`);
//     for (let k = 0; k < arrayWords[i].length; k += 1) {
//       const wordTop = document.createElement(`span`);
//       wordTop.classList.add(`word`);
//       wordTop.innerText = arrayWords[i][k];
//       row.appendChild(wordTop);
//     }
//   }
// };

// manyArraysYellow(2, arrayWords);

// ADD EVENT LISTENERS


// const greyBox = document.createElement(`div`);
// greyBox.classList.add(`container`);
// document.body.appendChild(greyBox);
const manyArraysEvent = () => {
  // let items = 1;
  // console.log(items);
  const numberInput = 1;
  for (let i = 0; i < numberInput; i += 1) {
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
// manyArraysEvent()
// EVENT LISTENING TO manyArraysEvent
// const eventButton = document.createElement(`button`);
// eventButton.setAttribute(`id`, `event`);
// eventButton.innerText = `click for event`;
// document.body.appendChild(eventButton);
// // CLICK TO CREATE
// eventButton.addEventListener(`click`, manyArraysEvent);
// document.getElementById('event').addEventListener('click', manyArraysEvent);

// CLICK WITH OTHER EVENTS
// eventButton.addEventListener(`dblclick`, manyArraysEvent);
// eventButton.addEventListener(`mouseenter`, manyArraysEvent);
// eventButton.addEventListener(`mouseleave`, manyArraysEvent);

// CLICK TO CREATE WITH NESTED BUTTON
const arrayGreet = [['hello', 'hi']];

const greyBox = document.createElement(`div`);
greyBox.classList.add(`container`);
document.body.appendChild(greyBox);
const eventButton = document.createElement(`button`);
eventButton.innerText = `click for event`;
// greyBox.appendChild(eventButton); // if want button at top

const manyArraysClickInside = () => {
  for (let i = 0; i < arrayGreet.length; i += 1) {
    const row = document.createElement(`div`);
    row.classList.add(`row`);
    for (let k = 0; k < arrayGreet[i].length; k += 1) {
      const wordTop = document.createElement(`span`);
      wordTop.classList.add(`word`);
      wordTop.innerText = arrayGreet[i][k];
      row.appendChild(wordTop);
      // greyBox.appendChild(row);
    }
    greyBox.appendChild(row);

    eventButton.addEventListener(`click`, manyArraysClickInside);
  }
  greyBox.appendChild(eventButton);
};
// manyArraysClickInside();


// CLICK AND INPUT
// bigGreyBox.classList.add(`input-group`,`mb-3`);

const field= document.createElement(`input`);
field.setAttribute(`id`, `oneWord`);
field.setAttribute(`placeholder`, `type in your word`)
greyBox.appendChild(field)
greyBox.appendChild(eventButton);
const freshArray = []

const clickInput = () => {

}