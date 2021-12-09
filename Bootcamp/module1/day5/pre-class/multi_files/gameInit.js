// Please implement exercise logic here
// Get a random index ranging from 0 (inclusive) to max (exclusive).
const getRandomIndex = (max) => Math.floor(Math.random() * max);

// Shuffle an array of cards
const shuffleCards = (cards) => {
  // Loop over the card deck array once
  for (let currentIndex = 0; currentIndex < cards.length; currentIndex += 1) {
    // Select a random index in the deck
    const randomIndex = getRandomIndex(cards.length);
    // Select the card that corresponds to randomIndex
    const randomCard = cards[randomIndex];
    // Select the card that corresponds to currentIndex
    const currentCard = cards[currentIndex];
    // Swap positions of randomCard and currentCard in the deck
    cards[currentIndex] = randomCard;
    cards[randomIndex] = currentCard;
  }
  // Return the shuffled deck
  return cards;
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
    }
  }

  // Return the completed card deck
  return newDeck;
};

////////////////////////
// Global variables that store game-wide data or DOM elements
const deck = shuffleCards(makeDeck());

// // Player 1 starts first
// let playersTurn = 1;

// // Use let for player1Card object because player1Card will be reassigned
// let player1Card;

// // create two buttons
// const player1Button = document.createElement('button');
// // player1Button.innerText = 'Player 1 Draw';
// // document.body.appendChild(player1Button);

// const player2Button = document.createElement('button');
// // player2Button.innerText = 'Player 2 Draw';
// // document.body.appendChild(player2Button);

// // Create game info div as global value
// // fill game info div with starting instructions
// const gameInfo = document.createElement('div');
// // gameInfo.innerText = 'Its player 1 turn. Click to draw a card!';
// // document.body.appendChild(gameInfo);

//////////////////////////////////

// Create a helper function for output to abstract complexity
// of DOM manipulation away from game logic
const output = (message) => {
  gameInfo.innerText = message;
};

// Add an event listener on player 1's button to draw card and switch
// to player 2's turn
// player1Button.addEventListener('click', () => {
//   if (playersTurn === 1) {
//     player1Card = deck.pop();
//     playersTurn = 2;
//     console.log(`playersTurn of p1button`,playersTurn)
//   }
// });

// Add event listener on player 2's button to draw card and determine winner
// Switch back to player 1's turn to repeat game
// player2Button.addEventListener('click', () => {
//   if (playersTurn === 2) {
//     const player2Card = deck.pop();
//     playersTurn = 1;

//     if (player1Card.rank > player2Card.rank) {
//       output('player 1 wins');
//     } else if (player1Card.rank < player2Card.rank) {
//       output('player 2 wins');
//     } else {
//       output('tie');
//     }
//   }
// });

// Add the cardContainer DOM element as a global variable.
// let cardContainer;
// // a global boolean variable to represent whether the user has recently clicked and we are waiting for the delay to end.
// let canClick = true;
///...REPLACE BY PLAYER CLICK CALLBACKS ..... //
// const player1Click = () => {
//   console.log(`playersTurn`, playersTurn)
//   if (playersTurn === 1) {
//     // Pop player 1's card metadata from the deck
//     player1Card = deck.pop();
//     console.log(`player1 card`,player1Card)

//     // Create card element from card metadata
//     const cardElement = createCard(player1Card);
//     // Empty cardContainer in case this is not the 1st round of gameplay
//     cardContainer.innerHTML = '';
//     // Append the card element to the card container
//     cardContainer.appendChild(cardElement);
//     console.log(cardElement)
//     // Switch to player 2's turn
//     playersTurn = 2;
//   }
// };

// const player2Click = () => {
//   if (playersTurn === 2) {
//     // Pop player 2's card metadata from the deck
//     const player2Card = deck.pop();
//     console.log(`player2 card`, player2Card);

//     // Create card element from card metadata
//     const cardElement = createCard(player2Card);
//     // Append card element to card container
//     cardContainer.appendChild(cardElement);

//     // Switch to player 1's turn
//     playersTurn = 1;

//     // Determine and output winner
//     if (player1Card.rank > player2Card.rank) {
//       output('player 1 wins');
//     } else if (player1Card.rank < player2Card.rank) {
//       output('player 2 wins');
//     } else {
//       output('tie');
//     }
//   }
// };
///...REPLACE BY PLAYER CLICK CALLBACKS ..... //

// REPLACE BY PLAYER CLICK CALLBACKS
const player1Click = () => {
  if (playersTurn === 1 && canClick === true) {
    canClick = false;

    setTimeout(() => {
      player1Card = deck.pop();

      const cardElement = createCard(player1Card);

      // in case this is not the 1st time
      // in the entire app,
      // empty the card container
      cardContainer.innerHTML = '';

      cardContainer.appendChild(cardElement);
      playersTurn = 2;
      canClick = true;
    }, 2000);
  }
};

const player2Click = () => {
  if (playersTurn === 2 && canClick === true) {
    canClick = false;

    setTimeout(() => {
      const player2Card = deck.pop();
      const cardElement = createCard(player2Card);

      cardContainer.appendChild(cardElement);

      playersTurn = 1;
      canClick = true;

      if (player1Card.rank > player2Card.rank) {
        output('player 1 wins');
      } else if (player1Card.rank < player2Card.rank) {
        output('player 2 wins');
      } else {
        output('tie');
      }
    }, 2000);
  }
};

const initGame = () => {
  // initialize button functionality
  player1Button.innerText = 'Player 1 Draw';
  document.body.appendChild(player1Button);

  player2Button.innerText = 'Player 2 Draw';
  document.body.appendChild(player2Button);

  player1Button.addEventListener('click', player1Click);
  player2Button.addEventListener('click', player2Click);

  // fill game info div with starting instructions
  gameInfo.innerText = 'Its player 1 turn. Click to draw a card!';
  document.body.appendChild(gameInfo);

  // Initialise cardContainer as a div with CSS class card-container, and add it to the document body. Add this logic to the initGame function.
  cardContainer = document.createElement('div');
  cardContainer.classList.add('card-container');
  document.body.appendChild(cardContainer);
};

// Translate HTML to JS DOM Manipulation
const makeCard = () => {
  const suit = document.createElement('div');
  suit.classList.add('suit');
  suit.innerText = '♥️';

  const name = document.createElement('div');
  name.classList.add('name', 'red');
  name.innerText = '3';

  const card = document.createElement('div');
  card.classList.add('card');

  card.appendChild(name);
  card.appendChild(suit);
};

// // SAMPLE card
// const cardInfo = {
//   suitSymbol: '♦️',
//   suit: 'diamond',
//   name: 'queen',
//   displayName: 'Q',
//   colour: 'red',
//   rank: 12,
// };

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

  // const cardEl = document.createElement('p');
  // cardEl.innerText = cardInfo.displayName; // also output the other attributes
  // return cardEl;
};

initGame();
