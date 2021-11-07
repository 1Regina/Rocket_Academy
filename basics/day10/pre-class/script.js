const main = function (input) {
  // players takes turn drawing one card
  let playerCard = playerHand.pop();
  let computerCard = computerHand.pop();
  let myOutputValue = `WAR <br>`;
  myOutputValue =
    myOutputValue +
    `Player has ${playerCard.name} of ${playerCard.suit}. <br> <br>
                       Computer has ${computerCard.name} of ${computerCard.suit}. <br><br> `;

  // whoever has the highest card wins
  if (playerCard.rank > computerCard.rank) {
    console.log(`Player wins`);
  } else if (playerCard.rank < computerCard.rank) {
    console.log(`Computer wins`);
  } else {
    // if the cards are equal, it is "war"
    console.log(`equalll`);
    myOutputValue = myOutputValue + `It's WARRR <br><br>`;

    let cardsEqual = true;
    while (cardsEqual) {
      console.log(`Its war loop`);
      // its war
      let playerFaceDown = playerHand.pop();
      let computerFaceDown = computerHand.pop();
      // one card is drawn face down

      // one card is drawn face up
      let playerFaceUp = playerHand.pop();
      let computerFaceUp = computerHand.pop();

      console.log(`playerFaceUp`);
      console.log(playerFaceUp);
      console.log(`computerFaceUp`);
      console.log(computerFaceUp);

      console.log(`HANDS`);
      console.log(playerHand);
      console.log(computerHand);

      // the highest face up card wins
      if (playerFaceUp.rank > computerFaceUp.rank) {
        console.log(`Player wins war`);
        cardsEqual = false;
      } else if (playerFaceUp.rank < computerFaceUp.rank) {
        console.log(`Computer wins war`);
        cardsEqual = false;
      }
      // if the cards are equal, repeat war

      // the winner gets all the cards (is for war or not)
      myOutputValue =
        myOutputValue +
        `<br>Player has ${playerFaceUp.name} of ${playerFaceUp.suit}. <br> <br>
         Computer has ${computerFaceUp.name} of ${computerFaceUp.suit}. `;

      // if all the cards are gone
      // if the players hands are empty
      if (
        (playerHand.length === 0 && computerHand.length === 0) ||
        (playerHand.length === 1 && computerHand.length === 1)
      ) {
        cardsEqual = false;
        myOutputValue = myOutputValue + `<br> Game Over! TIE`;
        // the player loses
      } else if (
        (playerHand.length === 0 && computerHand.length != 0) ||
        (playerHand.length === 1 && computerHand.length > 1)
      ) {
        cardsEqual = false;
        myOutputValue = myOutputValue + `<br> Game Over! You lose`;
      } else if (
        (computerHand.length === 0 && playerHand.length != 0) ||
        (computerHand.length === 1 && playerHand.length > 1)
      ) {
        cardsEqual = false;
        myOutputValue = myOutputValue + `<br> Game Over! Computer lose`;
      }
    }
  }

  return myOutputValue;
};

// the rules of the game

// the objective is to win all the cards

// the deck is shuffled and split evenly among the players

// players takes turn drawing one card

// whoever has the highest card wins

// if the cards are equal, it is "war"

// if it is war

// one card is drawn face down

// one card is drawn face up

// the highest face up card wins

// the winner gets all the cards (is for war or not)

// if the players both run out of cards, its a tie

// if one player runs out of cards, they lose

const makeDeck = function () {
  // Initialise an empty deck array
  let cardDeck = [];
  // Initialise an array of the 4 suits in our deck. We will loop over this array.
  let suits = ["hearts", "diamonds", "clubs", "spades"];
  let emoji = ["💖", "💎", "🏒", "🌳"];

  // Loop over the suits array
  let suitIndex = 0;

  while (suitIndex < suits.length) {
    // Store the current suit in a letiable
    let currentSuit = suits[suitIndex];
    let currentEmoji = emoji[suitIndex];
    // Loop from 1 to 13 to create all cards for a given suit
    // Notice rankCounter starts at 1 and not 0, and ends at 13 and not 12.
    // This is an example of a loop without an array.
    let rankCounter = 1;
    while (rankCounter <= 13) {
      // By default, the card name is the same as rankCounter
      let cardName = rankCounter;

      // If rank is 1, 11, 12, or 13, set cardName to the ace or face card's name
      if (cardName == 1) {
        cardName = "ace";
      } else if (cardName == 11) {
        cardName = "jack";
      } else if (cardName == 12) {
        cardName = "queen";
      } else if (cardName == 13) {
        cardName = "king";
      }

      // Create a new card with the current name, suit, and rank
      let card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
        emoji: currentEmoji,
      };

      // Add the new card to the deck
      cardDeck.push(card);

      // Increment rankCounter to iterate over the next rank
      rankCounter += 1;
    }

    // Increment the suit index to iterate over the next suit
    suitIndex += 1;
  }

  // Return the completed card deck
  return cardDeck;
};

let cardDeck = makeDeck();

const getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};

// Shuffle the elements in the cardDeck array
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

let deck = shuffleCards(makeDeck());
console.log(deck);

// the deck is shuffled and split evenly among the players

let playerHand = deck.splice(0, 26);
let computerHand = deck;
// remove 2 cards from computer hand
computerHand.shift();
computerHand.shift();

// to test for cards match n then player lose
// var deck = [
//   {
//     name: "5",
//     suit: "clubs",
//     rank: 5,
//   },
//   {
//     name: "2",
//     suit: "hearts",
//     rank: 2,
//   },
//   {
//     name: "3",
//     suit: "hearts",
//     rank: 3,
//   },
// ];

// var deck2 = [
//   {
//     name: "4",
//     suit: "hearts",
//     rank: 4,
//   },
//   {
//     name: "5",
//     suit: "hearts",
//     rank: 5,
//   },
//   {
//     name: "3",
//     suit: "hearts",
//     rank: 3,
//   },
// ];

// var playerHand = deck2
// var computerHand = deck