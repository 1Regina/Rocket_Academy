const main = function (input) {
  // myOutputValue = singleChat(input)
  myOutputValue = multipleChat(input);
  return myOutputValue;
};

let mode = "start";
let answerIndex = 0
const multipleChat = function (input) {
  if (mode === "start") {
    myOutputValue = "chose set A or set B";
    console.log(myOutputValue);
    var userInput = input;
    if (input === "set A") {
      myOutputValue =  questionAndAnswerSets[0].question;
      mode = "answer question";
      answerIndex = 0;
      return myOutputValue;
    } else if (input === "set B") {
      myOutputValue =  questionAndAnswerSets[1].question;
      mode = "answer question";
      answerIndex = 1;
      return myOutputValue;
    }
  } else if (mode === "answer question") {
    userInput = input
    myOutputValue = questionAndAnswerSets[answerIndex].answers[userInput];
    mode = "start";
    return myOutputValue;
  }
  return myOutputValue;
};

const singleChat = function (input) {
  if (mode === "start") {
    mode = "output reply";
    return `Hey, wow you seem happy today! Have you been coding? (yes/no/maybe)`;
  }
  if (mode === "output reply") {
    let userInput = input;
    mode = "start";
    return questionAndAnswerSets[0].answers[userInput];
  }
};

let questionAndAnswerSets = [
  {
    question:
      "Hey, wow you seem happy today! Have you been coding? (yes/no/maybe)",
    answers: {
      yes: `Wow! Me too! I've been working on the Blackjack project. Makes my day!`,
      no: "Oh ok, just normally happy ;)",
      maybe: "It seems the very thought of coding makes people happy!",
    },
  },
  {
    question:
      "Do you enjoy coding most during the day, night, or both? (day/night/both)",
    answers: {
      day: "Ah yes, when the sun is high in the sky, I can feel its energy too.",
      night: "Under the calm and gentle moon, I also find my focus.",
      both: "Indeed, I could code 24/7 if I didn't have to sleep!",
    },
  },
];
