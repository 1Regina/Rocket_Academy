// Please implement exercise logic here
// CLICK AND INPUT

const listDiv = document.createElement(`div`);
const inputDiv = document.createElement(`div`);
const greyBox = document.createElement(`div`);

greyBox.classList.add(`container`);
document.body.appendChild(greyBox);
// greyBox has 2 section
greyBox.appendChild(listDiv);
greyBox.appendChild(inputDiv);

const eventButton = document.createElement(`button`);
eventButton.innerText = `click for event`;

// bigGreyBox.classList.add(`input-group`,`mb-3`);

const field = document.createElement(`input`);
field.setAttribute(`id`, `oneWord`);
field.setAttribute(`placeholder`, `type in your word`);
inputDiv.appendChild(field);
inputDiv.appendChild(eventButton);
const freshArray = [];

const clickInput = () => {
  let wordField = document.querySelector(`#oneWord`);
  console.log(`wordField`, wordField);
  let typedWord = wordField.value;

  freshArray.push(typedWord);
  console.log(`freshArray`, freshArray);

  const row = document.createElement(`div`);
  row.classList.add(`row`);
  const word = document.createElement(`span`);
  word.classList.add(`word`);

  // const newArray = freshArray.slice(-1)
  for (let i = 0; i < freshArray.length; i += 1) {
    word.innerText = freshArray[i];
    console.log(`word is `, word);
    console.log(`freshArray`, freshArray);
    listDiv.appendChild(row);
    row.appendChild(word);
  }
};
eventButton.addEventListener(`click`, clickInput);
