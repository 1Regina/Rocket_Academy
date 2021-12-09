const emojiArray = [
  '✌',
  '😂',
  '😝',
  '😁',
  '😱',
  '👉',
  '🙌',
  '🍻',
  '🔥',
  '🌈',
  '☀',
  '🎈',
  '🌹',
  '💄',
  '🎀',
  '⚽',
  '🎾',
  '🏁',
  '😡',
  '👿',
  '🐻',
  '🐶',
  '🐬',
  '🐟',
  '🍀',
  '👀',
  '🚗',
  '🍎',
  '💝',
  '💙',
  '👌',
  '❤',
  '😍',
  '😉',
  '😓',
  '😳',
  '💪',
  '💩',
  '🍸',
  '🔑',
  '💖',
  '🌟',
  '🎉',
  '🌺',
  '🎶',
  '👠',
  '🏈',
  '⚾',
  '🏆',
  '👽',
  '💀',
  '🐵',
  '🐮',
  '🐩',
  '🐎',
  '💣',
  '👃',
  '👂',
  '🍓',
  '💘',
  '💜',
  '👊',
  '💋',
  '😘',
  '😜',
  '😵',
  '🙏',
  '👋',
  '🚽',
  '💃',
  '💎',
  '🚀',
  '🌙',
  '🎁',
  '⛄',
  '🌊',
  '⛵',
  '🏀',
  '🎱',
  '💰',
  '👶',
  '👸',
  '🐰',
  '🐷',
  '🐍',
  '🐫',
  '🔫',
  '👄',
  '🚲',
  '🍉',
  '💛',
  '💚',
];



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

let emojiA = emojiArray[0];
let emojiB = emojiArray[1];
let emojiC = emojiArray[2];

let clicks = 0;

// MAKE DIFFERENT EMOJIS
// make smiley emoji
const makeSquareSmileEmoji = (clicks) => {
  let str = '';

  for (let i = 0; i < clicks; i += 1) {
    for (let j = 0; j < clicks; j += 1) {
      str += emojiA;
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
      str += emojiB;
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
      str += emojiC;
    }
    str += '<br/>';
  }
  para.innerHTML = str;
  console.log(str);
};

const onClickFrown = () => {
  clicks += 1;
  console.log(`%`, clicks);
  makeSquareFrownEmoji(clicks);
};

smileButton.addEventListener(`click`, onClickSmile);
sunglassButton.addEventListener(`click`, onClickSunglass);
frownButton.addEventListener(`click`, onClickFrown);

// Any Emoji-Displaying Buttons
let emotional = [];
const emojiButtonss = (emojiArray) => {
  const box = document.createElement(`div`);
  document.body.appendChild(box);
  for (let i = 0; i < emojiArray.length; i += 1) {
    const cartoon = document.createElement('button');
    cartoon.innerHTML = emojiArray[i];
    box.appendChild(cartoon);
    cartoon.setAttribute(`id`, `emoji${i}`);
    emotional.push(cartoon);
  }
  return emotional;
};
emojiButtonss(emojiArray);

const lastBaseBox = document.createElement(`div`);
document.body.appendChild(lastBaseBox);
const span = document.createElement(`span`);
lastBaseBox.appendChild(span);
const eventButton = document.createElement(`button`);
eventButton.innerText = `click to draw`;
span.appendChild(eventButton);

let emoji = '';
const drawEmoji = (emoji) => {
  clicks += 1;
  console.log(`%`, clicks);
  let str = '';

  for (let i = 0; i < clicks; i += 1) {
    for (let j = 0; j < clicks; j += 1) {
      str += emoji;
    }
    str += '<br/>';
  }
  para.innerHTML = str;
  console.log(str);
};
eventButton.addEventListener('click', () => drawEmoji('😊'));

emotional[0].addEventListener('click', () => drawEmoji(emojiArray[0]));
emotional[1].addEventListener('click', () => drawEmoji(emojiArray[1]));
emotional[2].addEventListener('click', () => drawEmoji(emojiArray[2]));
emotional[3].addEventListener('click', () => drawEmoji(emojiArray[3]));

const createAddEventListener = (emojiArray) => {
  for (let i = 0; i < emojiArray.length; i += 1) {
    emotional[i].addEventListener('click', () => drawEmoji(emojiArray[i]));
  }
};
createAddEventListener(emojiArray)