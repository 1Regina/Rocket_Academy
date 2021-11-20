const emojiArray = ['😄', '😎', '😦'];
// const emojiButtonss = (emojiArray) => {
//   const box = document.createElement(`div`);
//   document.body.appendChild(box);
//   for (let i = 0; i < emojiArray.length; i += 1) {
//     const cartoon = document.createElement('BUTTON');

//     cartoon.innerHTML = emojiArray[i];
//     cartoon.setAttribute(`id`, `emoji${i}`)
//     box.appendChild(cartoon);
//   }
// };
// emojiButtonss(emojiArray);

const box = document.createElement(`div`);
document.body.appendChild(box);
const smileButton = document.createElement(`button`);
smileButton.innerHTML = emojiArray[0];
smileButton.setAttribute(`id`, `emojiSmile`);
box.appendChild(smileButton);
const sunglassButton = document.createElement(`button`);
sunglassButton.innerHTML = emojiArray[1];
sunglassButton.setAttribute(`id`, `emojiSunglass`);
box.appendChild(sunglassButton);
const frownButton = document.createElement(`button`);
frownButton.innerHTML = emojiArray[2];
frownButton.setAttribute(`id`, `emojiFrown`);
box.appendChild(frownButton);

const box2 = document.createElement(`div`);
document.body.appendChild(box2);
const para = document.createElement(`p`);
box2.appendChild(para);

let emoji0 = emojiArray[0];
let emoji1 = emojiArray[1];
let emoji2 = emojiArray[2];

let clicks = 0;

// MAKE DIFFERENT EMOJIS
// make smiley emoji
const makeSquareSmileEmoji = (clicks) => {
  let str = '';

  for (let i = 0; i < clicks; i += 1) {
    for (let j = 0; j < clicks; j += 1) {
      str += emoji0;
    }
    str += '<br/>';
  }
  para.innerHTML = str;
  console.log(str);
};

function onClickSmile() {
  clicks += 1;
  console.log(`%`, clicks);
  makeSquareSmileEmoji(clicks);
}

// make sunglass emoji
const makeSquareSunglassEmoji = (clicks) => {
  let str = '';

  for (let i = 0; i < clicks; i += 1) {
    for (let j = 0; j < clicks; j += 1) {
      str += emoji1;
    }
    str += '<br/>';
  }
  para.innerHTML = str;
  console.log(str);
};

function onClickSunglass() {
  clicks += 1;
  console.log(`%`, clicks);
  makeSquareSunglassEmoji(clicks);
}

// make frown emoji
const makeSquareFrownEmoji = (clicks) => {
  let str = '';

  for (let i = 0; i < clicks; i += 1) {
    for (let j = 0; j < clicks; j += 1) {
      str += emoji2;
    }
    str += '<br/>';
  }
  para.innerHTML = str;
  console.log(str);
};

function onClickFrown() {
  clicks += 1;
  console.log(`%`, clicks);
  makeSquareFrownEmoji(clicks);
}

smileButton.addEventListener(`click`, onClickSmile);
sunglassButton.addEventListener(`click`, onClickSunglass);
frownButton.addEventListener(`click`, onClickFrown);
