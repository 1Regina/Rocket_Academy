let bodyPart = {
  finger: "magic hand",
  foot: "traveller",
  face: "you are rich",
};
let mode = "ask name";
let myOutputValue = "";
const main = function (input) {
  // var userInput = input;
  console.log(mode);
  if (mode == "ask name") {
    let intro = `Whats your name?`;
    mode = "give name";
    return intro;
  }
  if (mode == "give name") {
    name = input;
    let message = `Hey ${name}, a nice name. where is your birthmark`;
    mode = "birthmark";
    return message;
  }
  if (mode == "birthmark") {
    part = input;
    mode = "tell fortune";
    // if (bodyPart == "finger") {
    //   message = bodyPart.finger;
    // } else if (bodyPart == "foot") {
    //   message = bodyPart.foot;
    // } else if (bodyPart == "face") {
    //   message = bodyPart.[bodyPart];
    // }
    myOutputValue = bodyPart[part];
    return myOutputValue;
  }
};

