const main = function (input) {
  // let myOutputValue = chainedSet(input)
  let myOutputValue = dynamic(input)
  return myOutputValue
};


const chainedSet = function (input) {
  if (mode == "question") {
    mode = "answer";
    myOutputValue = `${questionAndAnswerSets[currentQuestion].question}`;
  } else if (mode == "answer") {
    mode = "question";
    myOutputValue = `${questionAndAnswerSets[currentQuestion].answers[input]}`;
    currentQuestion = questionAndAnswerSets[currentQuestion].nextQuestionId;
  }

  return myOutputValue;
};

let currentQuestion = "hasBeenCoding";
let mode = "question";
// let input = ""
let myOutputValue = "";
var dynamic = function (input) {
//   if (mode == "question") {
//     mode = "answer";
//     myOutputValue = `${questionAndAnswerSets[currentQuestion].question}`;
//   } else if (mode == "answer") {
//     mode = "question";
//     myOutputValue = `${questionAndAnswerSets[currentQuestion].answers[input]}`;
//     if (currentQuestion == "hasBeenCoding") {
//       myOutputValue = `${questionAndAnswerSets[currentQuestion].answers[input].response}`;
//       currentQuestion =
//         questionAndAnswerSets[currentQuestion].answers[input].nextQuestionId;
//     } else {
//       currentQuestion = questionAndAnswerSets[currentQuestion].nextQuestionId;
//     }
//   }
//   return myOutputValue;
// };
  if (mode == "question") {
    mode = "answer";
    myOutputValue = `${questionAndAnswerSets[currentQuestion].question}`;
  } else if (mode == "answer") {
    console.log(`interview`)
    
    myOutputValue = `${questionAndAnswerSets[currentQuestion].answers[input]}`;
    mode = "question";
    if (currentQuestion == "hasBeenCoding") {
      myOutputValue = `${questionAndAnswerSets[currentQuestion].answers[input].response}`;
      currentQuestion =
        questionAndAnswerSets[currentQuestion].answers[input].nextQuestionId;
    } else {
      currentQuestion = questionAndAnswerSets[currentQuestion].nextQuestionId;
    }
  }
  return myOutputValue;
};


let questionAndAnswerSets = {
  hasBeenCoding: {
    question:
      "Hey, wow you seem happy today! Have you been coding? (yes/no/maybe)",
    answers: {
      yes: `Wow! Me too! I've been working on the Blackjack project. Makes my day!`,
      no: "Oh ok, just normally happy ;)",
      maybe: "It seems the very thought of coding makes people happy!",
    },
    nextQuestionId: "timeOfDay",
  },
  timeOfDay: {
    question:
      "Do you enjoy coding most during the day, night, or both? (day/night/both)",
    answers: {
      day: "Ah yes, when the sun is high in the sky, I can feel its energy too.",
      night: "Under the calm and gentle moon, I also find my focus.",
      both: "Indeed, I could code 24/7 if I didn't have to sleep!",
    },
    nextQuestionId: "weather",
  },
  weather: {
    question: "Are you most productive when it's sunny or raining? (sun/rain)",
    answers: {
      sun: "The sun warms my heart and powers me to code.",
      rain: "The rain washes away my distractions and allows me to focus.",
    },
    nextQuestionId: "hasBeenCoding",
  },
};
