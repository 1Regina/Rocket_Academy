// Please implement exercise logic here

// let htmlElements =  ``;

const boxes = [
  [
    ['hello', 'papaya'],
    ['banana', 'world'],
  ],
  [
    ['hello', 'papaya'],
    ['banana', 'world'],
  ],
];

// const createBox = () => {
//   const greyBox = document.querySelector(`#greybox`)

//   for (let i=0; i < boxes.length; i+=1) {
//     const box = boxes[i]

//     const boxDiv = document.createElement(`div`)
//     boxDiv.classList.add('container')

//     for (let j=0; j<box.length; j++) {
//       const row = document.createElement(`div`)
//       container.append(row)
//     }

//     let greyContainer = document.createElement(`div`)
//     // let newGreyBox = document.createEleement(`p`)
//     // return `hello `
//   //   htmlElements += `<div class="container></div>`
//   // }
//   // let container = document.getElementById("greybox");
//   // container.innerHTML = htmlElements;

//   //   // make the h2 appear on screen
//   // document.body.appendChild(container);

//   }
// }

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

// const makeRowsWords = (index) => {
//   const wordings = createWords(numberInput);
//   for (let j = 0; j < 1; j += 1) {
//     const row = document.createElement(`div`);
//     row.classList.add(`row`);
//     document.body.appendChild(row);
//     for (let k = 0; k < 2; k += 1) {
//       const wordBottom = document.createElement(`span`);
//       wordBottom.classList.add(`word`);
//       wordBottom.innerText = wordings[i][index][k];
//       document.body.appendChild(wordBottom);
//     }
//   }
// };
const createBox = (numberInput) => {
  for (let i = 0; i < numberInput; i += 1) {
    const wordings = createWords(numberInput);
    const greyBox = document.createElement(`div`);
    greyBox.classList.add(`container`);
    document.body.appendChild(greyBox);
    for (let j = 0; j < 1; j += 1) {
      const row = document.createElement(`div`);
      row.classList.add(`row`);
      document.body.appendChild(row);
      for (let k = 0; k < 2; k += 1) {
        const wordTop = document.createElement(`span`);
        wordTop.classList.add(`word`);
        wordTop.innerText = wordings[i][0][k];
        document.body.appendChild(wordTop);
      }
      for (let j = 0; j < 1; j += 1) {
        const row = document.createElement(`div`);
        row.classList.add(`row`);
        document.body.appendChild(row);
        for (let k = 0; k < 2; k += 1) {
          const wordBottom = document.createElement(`span`);
          wordBottom.classList.add(`word`);
          wordBottom.innerText = wordings[i][1][k];
          document.body.appendChild(wordBottom);
        }
      }
    }
    // for (let element=0; element <2; element+=1){
    //   makeRowsWords(element)
  }
};
createBox(6);
