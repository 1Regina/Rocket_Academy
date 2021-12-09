// Please implement exercise logic here

// Player 1 starts first
let playersTurn = 1;

// Use let for player1Card object because player1Card will be reassigned
let player1Card;

// Add the cardContainer DOM element as a global variable.
let cardContainer;
// a global boolean variable to represent whether the user has recently clicked and we are waiting for the delay to end.
let canClick = true;

// create two buttons
const player1Button = document.createElement('button');
// player1Button.innerText = 'Player 1 Draw';
// document.body.appendChild(player1Button);

const player2Button = document.createElement('button');
// player2Button.innerText = 'Player 2 Draw';
// document.body.appendChild(player2Button);

// Create game info div as global value
// fill game info div with starting instructions
const gameInfo = document.createElement('div');
// gameInfo.innerText = 'Its player 1 turn. Click to draw a card!';
// document.body.appendChild(gameInfo);

//////////////////////////////////

// SAMPLE card
const cardInfo = {
  suitSymbol: '♦️',
  suit: 'diamond',
  name: 'queen',
  displayName: 'Q',
  colour: 'red',
  rank: 12,
};
