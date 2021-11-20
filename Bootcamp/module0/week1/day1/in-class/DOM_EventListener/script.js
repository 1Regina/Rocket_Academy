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
smileButton.innerHTML = '😄';
smileButton.setAttribute(`id`, `emojiSmile`);
box.appendChild(smileButton);
const sunglasssButton = document.createElement(`button`);
sunglasssButton.innerHTML = '😎';
sunglasssButton.setAttribute(`id`, `emojiSunglass`);
box.appendChild(sunglasssButton);
const frownButton = document.createElement(`button`);
frownButton.innerHTML = '😦';
frownButton.setAttribute(`id`, `emojiFrown`);
box.appendChild(frownButton);

const box2 = document.createElement(`div`);
document.body.appendChild(box2);
const para = document.createElement(`p`);
box2.appendChild(para);

const printConsole = () => {
  console.log(`#`);
};

let emoji = emojiArray[1];
let clicks = 0;

const makeSquareEmoji = (clicks) => {
  let str = '';

  for (let i = 0; i < clicks; i += 1) {
    for (let j = 0; j < clicks; j += 1) {



      
      str += emoji;
      console.log(`~~`);
    }
    str += '<br/>';
  }

  para.innerHTML = str;
  console.log(str);
};

function onClick() {
  clicks += 1;
  // document.getElementById("emojiSmile").innerHTML = clicks;
  console.log(`%`, clicks);
  makeSquareEmoji(clicks);
}

smileButton.addEventListener(`click`, printConsole);
smileButton.addEventListener(`click`, onClick);
