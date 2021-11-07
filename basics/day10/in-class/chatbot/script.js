
var name = "";
var age = "";
var mode = "ask name";
var myOutputValue = "";

var main = function (input) {
  console.log(mode);
  if (mode == "ask name") {
    var intro = `Hey I am Robocop. Whats your name?`;
    mode = "give name";
    return intro;
  }
  if (mode == "give name") {
    name = input;
    var message = `Hey ${name} What a cool name. How old are you?`;
    mode = "ask age";
    return message;
  }
  if (mode == "ask age") {
    age = input;
    mode = "ask question";
    if (age <= 20) {
      message = `Cherish your youth, `;
    } else if (age > 60) {
      message = `What a wise age, `;
    } else {
      message = `You are in your prime mid life, `;
    }

    return message + name;
  }
  if (mode == "ask question") {
    myOutputValue = "chose set A or set B";
    console.log(myOutputValue);
    if (input == "set A") {
      myOutputValue = `${name} ` + questionAndAnswerSets[0].question;
      mode = "answer question";
      answerIndex = 0;
      return myOutputValue;
    } else if (input == "set B") {
      myOutputValue = `${name} ` + questionAndAnswerSets[1].question;
      mode = "answer question";
      answerIndex = 1;
      return myOutputValue;
    }
  } else if (mode == "answer question") {
    mode = "ask name";
    let userInput = input;
    myOutputValue = questionAndAnswerSets[answerIndex].answers[userInput];
    return myOutputValue;
  }
  return myOutputValue;
};

var questionAndAnswerSets = [
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


var answersAndResponses = {
  yes: `Wow! Me too!`,
  no: "Oh ok, just normally happy ;)",
  maybe: "It seems the very thought of coding makes people happy!",
};