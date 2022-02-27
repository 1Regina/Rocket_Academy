// Please implement exercise logic here
const grid = [
  ['A', 'B'],
  ['Y', 'Z'],
];

const upperLeftPosition = grid[0][0]; // 'A'
const upperRightPosition = grid[0][1]; // 'B'
const lowerLeftPosition = grid[1][0]; // 'Y'
const lowerRightPosition = grid[1][1]; // 'Z'

// Header to put in Player name
const intro = document.createTextNode(' Welcome to Match Card Game. ');
document.body.appendChild(intro);
const gamerName = document.createElement('input');
gamerName.setAttribute('type', 'text');
gamerName.setAttribute('name', 'username');
gamerName.setAttribute('placeholder', "Put in Gamer's name");
document.body.appendChild(gamerName);

// boardSize has to be an even number
// const boardSize = document.createElement('input');
// boardSize.setAttribute('type', 'text');
// boardSize.setAttribute('boardSize', 'size');
// boardSize.setAttribute('placeholder', "Put in Board Size");
// document.body.appendChild(boardSize);
const boardSize = 2;
let board = [];
let firstCard = null;
let firstCardElement;
let deck;
let wins = 0;
// create the element that everything will go inside of
const boardElement = document.createElement('div');
// delay or sleep function
// const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const announcement = document.createElement('h2');
document.body.appendChild(announcement);

// Timer to count dowm
// const clockTimer = document.createTextNode('CountDown Timer:');
// const clockSpace = document.createElement('div')
// document.body.appendChild(clockSpace);
// const clockTimer = document.createElement('label');
// clockTimer.innerHTML = "CountDown "
// clockSpace.appendChild(clockTimer);
// const clockWords = document.createTextNode(' CountDown : ');
const clockWords = document.createElement('div');
clockWords.innerText = 'Stop Watch';
document.body.appendChild(clockWords);
const clock = document.createElement('h3');
clockWords.appendChild(clock);
// clockTimer.clockSpace.insertBefore(clock, clockTimer.nextSibling);
clock.innerText = '';

const congrats = document.createElement('h2');
document.body.appendChild(congrats);

// ################ BUTTONS ################//
// create Time Buttons
const timerButtons = document.createElement(`div`);
document.body.appendChild(timerButtons);

// Start Game Button
const startButton = document.createElement('button');
startButton.innerText = 'Start';
timerButtons.appendChild(startButton);
startButton.onclick = function () {
  gamerName.value = '';
  congrats.innerText = '';
  announcement.innerText = '';
  initGame();
};

// Reset Game Button
const resetbutton = document.createElement('button');
resetbutton.innerText = 'Reset';
timerButtons.appendChild(resetbutton);
resetbutton.onclick = function () {
  gamerName.value = '';
  congrats.innerText = '';

  initGame();
  // return counter
  return;
};

// stopWatch Button
const stopWatchButton = document.createElement(`button`);
stopWatchButton.innerText = `Stop`;
timerButtons.appendChild(stopWatchButton);
stopWatchButton.onclick = function () {
  clearInterval(ref);
};

// Gameplay Logic
const squareClick = async (cardElement, column, row) => {
  console.log(cardElement);

  console.log('FIRST CARD DOM ELEMENT', firstCard);

  console.log('BOARD CLICKED CARD', board[column][row]);

  const clickedCard = board[column][row];

  // the user already clicked on this square
  if (cardElement.innerText !== '') {
    return;
  }

  // first turn
  if (firstCard === null) {
    console.log('first turn');
    firstCard = clickedCard;
    // turn this card over
    cardElement.innerText = firstCard.name;
    // create card visually to show at clicked box
    cardDisplay = createCard(clickedCard);
    cardElement.appendChild(cardDisplay);

    // hold onto this for later when it may not match
    firstCardElement = cardElement;

    console.log(`firstCardElement`, firstCardElement);

    // second turn
  } else {
    console.log('second turn');
    if (
      clickedCard.name === firstCard.name &&
      clickedCard.suit === firstCard.suit
    ) {
      console.log('match');
      announcement.innerText = 'There is a match.';
      setTimeout(() => {
        // remove announcement
        announcement.innerText = '';
      }, 2000);

      // turn this card over
      cardElement.innerText = clickedCard.name;
      // create card visually to show at clicked box
      cardDisplay = createCard(clickedCard);
      cardElement.appendChild(cardDisplay);
      wins += 1;
      console.log('boardSize', boardSize, wins);
      if (wins === (boardSize * boardSize) / 2) {
        congrats.innerText = 'Congratulations ' + gamerName.value;
        clearInterval(ref);
        counter = '';
        clockWords.innerText = '';
      }
      // else if () {
      //   congrats.innerText = 'Sorry ' + gamerName.value + " Game over";
      // }
    } else {
      console.log('NOT a match');

      // turn this card over
      cardElement.innerText = clickedCard.name;
      // create card visually to show at clicked box
      cardDisplay = createCard(clickedCard);
      cardElement.appendChild(cardDisplay);
      // cardElement.innerHTML = createCard(clickedCard);

      // delay time to turn over the 2 exposed wrong cards
      setTimeout(() => {
        // turn this card back over
        firstCardElement.innerText = '';
        cardElement.innerText = '';
      }, 800);

      // await sleep(1000);

      // // turn this card back over
      // firstCardElement.innerText = '';
      // cardElement.innerText = '';
    }

    // reset the first card
    firstCard = null;
  }
};

console.log('starting...');

let delayInMilliseconds = 1000;
let delayInSeconds = 125; // time limit
let counter;
let ref;

// Create a visual card from sample card
const createCard = (cardInfo) => {
  const suit = document.createElement('div');
  suit.classList.add('suit', cardInfo.colour);
  suit.innerText = cardInfo.suitSymbol;

  const name = document.createElement('div');
  name.classList.add(cardInfo.displayName, cardInfo.colour);
  name.innerText = cardInfo.displayName;

  const card = document.createElement('div');
  card.classList.add('card');

  card.appendChild(name);
  card.appendChild(suit);

  return card;
};

// Game Initialisation Logic
// create all the board elements that will go on the screen
// return the built board
const buildBoardElements = (board) => {
  // // create the element that everything will go inside of
  // const boardElement = document.createElement('div');

  // give it a class for CSS purposes
  boardElement.classList.add('board');

  // use the board data structure we passed in to create the correct size board
  for (let i = 0; i < board.length; i += 1) {
    // make a var for just this row of cards
    const row = board[i];

    // make an element for this row of cards
    const rowElement = document.createElement('div');
    rowElement.classList.add('row');

    // make all the squares for this row
    for (let j = 0; j < row.length; j += 1) {
      // create the square element
      const square = document.createElement('div');

      // set a class for CSS purposes
      square.classList.add('square');

      // set the click event
      // eslint-disable-next-line
      square.addEventListener('click', (event) => {
        // we will want to pass in the card element so
        // that we can change how it looks on screen, i.e.,
        // "turn the card over"
        squareClick(event.currentTarget, i, j);
      });

      rowElement.appendChild(square);
    }
    boardElement.appendChild(rowElement);
  }

  return boardElement;
};

const makeDeck = () => {
  // Initialise an empty deck array
  const newDeck = [];

  // exercise solution: include symbol. Same order as suit
  const symbol = ['♥', '♦', '♣', '♠'];
  // Initialise an array of the 4 suits in our deck. We will loop over this array.
  const suits = ['hearts', 'diamonds', 'clubs', 'spades'];

  // Loop over the suits array
  for (let suitIndex = 0; suitIndex < suits.length; suitIndex += 1) {
    // exercise solution: Store the current suitSymbol in a variable
    const currentSuitSymbol = symbol[suitIndex];

    // Store the current suit in a variable
    const currentSuit = suits[suitIndex];

    let suitColour = '';
    if (currentSuit == 'hearts' || currentSuit == 'diamonds') {
      suitColour = 'red';
    } else {
      suitColour = 'black';
    }
    // Loop from 1 to 13 to create all cards for a given suit
    // Notice rankCounter starts at 1 and not 0, and ends at 13 and not 12.
    // This is an example of a loop without an array.
    for (let rankCounter = 1; rankCounter <= 13; rankCounter += 1) {
      // By default, the card name is the same as rankCounter
      let cardName = `${rankCounter}`;

      // If rank is 1, 11, 12, or 13, set cardName to the ace or face card's name
      if (cardName === '1') {
        cardName = 'ace';
      } else if (cardName === '11') {
        cardName = 'jack';
      } else if (cardName === '12') {
        cardName = 'queen';
      } else if (cardName === '13') {
        cardName = 'king';
      }

      // exercise solution : By default, the display name is the same as card name
      let cardDisplayName = `${cardName}`;
      // If cardName is ace, jack, queen, king, set displayName to a, j , q, k
      if (cardDisplayName === 'ace') {
        cardDisplayName = 'A';
      } else if (cardDisplayName === 'jack') {
        cardDisplayName = 'J';
      } else if (cardDisplayName === 'queen') {
        cardDisplayName = 'Q';
      } else if (cardDisplayName === 'king') {
        cardDisplayName = 'K';
      }

      // Create a new card with the current name, suit, and rank
      const card = {
        // exercise solution: add suitSymbol, displayName, colour
        suitSymbol: currentSuitSymbol,
        suit: currentSuit,
        name: cardName,
        displayName: cardDisplayName,
        colour: suitColour,
        rank: rankCounter,
      };

      // Add the new card to the deck
      newDeck.push(card);
      newDeck.push(card);
    }
  }

  // Return the completed card deck
  return newDeck;
};

const initGame = () => {
  let existingBoard = document.querySelector('#game-board');
  // to reset the board to empty
  if (existingBoard) {
    existingBoard.innerHTML = '';
    existingBoard = null;
    board = [];
  }
  // create this special deck by getting the doubled cards and
  // making a smaller array that is ( boardSize squared ) number of cards
  let doubleDeck = makeDeck();
  let randomIndex = getRandomIndex(104);
  console.log(`generated index`, randomIndex);
  if (randomIndex % 2 === 0) {
    randomIndex = randomIndex;
    console.log(`even index without fix`, randomIndex);
  } else {
    randomIndex = randomIndex + 1;
    console.log(`convert to even index`, randomIndex);
  }
  let lastCardIndex = randomIndex + boardSize * boardSize;
  console.log('lastCardIndex', lastCardIndex);
  let deckSubset = doubleDeck.slice(randomIndex, lastCardIndex);
  deck = shuffleCards(deckSubset);

  // deal the cards out to the board data structure
  for (let i = 0; i < boardSize; i += 1) {
    board.push([]);
    for (let j = 0; j < boardSize; j += 1) {
      board[i].push(deck.pop());
      // console.log(deck.pop())
    }
  }

  const boardEl = buildBoardElements(board);
  boardEl.id = 'game-board';

  document.body.appendChild(boardEl);

  // INIT
  wins = 0;
  counter = 0; // delayInSeconds; // delayInMilliseconds;
  if (ref) {
    clearInterval(ref);
    ref = null;
  }

  //%%%% Amendment to countdown in Match Game  %%%%
  // initialie a timeout case. 
  ref = setInterval(() => {
    clock.innerText = `${Math.floor(counter/60)} Minutes and ${counter%60} Seconds`;
    counter += 1;
    if (counter >= delayInSeconds + 1) {
      clearInterval(ref);
      ref = null;
      announcement.innerText =
        'stop playing. game over. Hit reset to start over';
      boardElement.innerText = '';
    }
  }, 1000);
};

const getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};

const shuffleCards = function (cardDeck) {
  // Loop over the card deck array once for every card so every card position got shuffled once
  for (let cardIndex = 0; cardIndex < cardDeck.length; cardIndex += 1) {
    // Select a random index in the deck
    let randomIndex = getRandomIndex(cardDeck.length);
    // Select the card that corresponds to randomIndex
    let randomCard = cardDeck[randomIndex];
    // Select the card that corresponds to currentIndex
    let currentCard = cardDeck[cardIndex];
    // Swap positions of randomCard and currentCard in the deck
    cardDeck[cardIndex] = randomCard;
    cardDeck[randomIndex] = currentCard;
  }
  // Return the shuffled deck
  return cardDeck;
};

// initGame(); // remove bcos activation by start button
