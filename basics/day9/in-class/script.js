const main = function (wildCard) {
  // var myOutputValue = playSingle()
  // var myOutputValue =  playLowCard()
  // var myOutputValue = playQueen()
  // var myOutputValue = playLowCards(input)
  var myOutputValue = playCardSuitOutput();
  // let myOutputValue = playWithWildCard(wildCard);
  return myOutputValue;
};

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

let playDeck = shuffleCards(cardDeck);
hand = [];
const playSingle = function () {
  console.log(`starting game with ${playDeck.length} cards`);
  let pullCard = playDeck.pop();
  console.log(`pullcard`, pullCard);
  hand.push(pullCard);
  console.log(`hand `, hand);
  value = pullCard.rank;
  // return value; // for playLowCard, playQueen() and playLowCards()
  // return `You pull ${pullCard.name} of ${pullCard.suit}.` // for Display Single Card
  return pullCard; // for playCardSuitOutput, for playWithWildCard
};

const playLowCard = function (cardDeck) {
  let player1 = playSingle();
  let player2 = playSingle();
  console.log(`Player 1 has ${player1}`);
  console.log(`Player 2 has  ${player2}`);

  if (player1 > player2) {
    message = `Player 1 wins. Player 1 has  ${player1} and Player has ${player2}.`;
  } else if (player1 < player2) {
    message = `Player 2 wins. Player 1 has  ${player1} and Player has ${player2}.`;
  } else {
    message = `Its a draw. Player 1 has  ${player1} and Player has ${player2}.`;
  }
  return message;
};

const playQueen = function (cardDeck) {
  let player1 = playSingle();
  let player2 = playSingle();
  console.log(`Player 1 has ${player1}`);
  console.log(`Player 2 has  ${player2}`);

  if (player1 == 12 && player2 == 12) {
    message = `Everyone draws a queen.`;
  } else if (player1 == 12) {
    message = `Player 1 wins. Player 1 has  ${player1} and Player has ${player2}.`;
  } else if (player2 == 12) {
    message = `Player 2 wins. Player 1 has  ${player1} and Player has ${player2}.`;
  } else if (player1 !== 12 && player2 !== 12) {
    message = `Nobody draws a queen. Everyone loses`;
  }
  return message;
};

let playerCollection = [];
let mode = "start mode";
const playLowCards = function (numberOfcards) {
  if (mode == "start mode") {
    message = `You want to draw ${numberOfcards} cards.`;
    for (let i = 0; i < numberOfcards; i++) {
      var myValue = playSingle();
      playerCollection.push(myValue);
      console.log(`myValue `, myValue);
      console.log("playerCollection IN LOOP is", playerCollection);
    }
    console.log("playerCollection is", playerCollection);
    sortList = playerCollection.sort(function (a, b) {
      return a - b;
    });
    console.log(`Sorted List is`, sortList);
    computerCard = playSingle();
    console.log(`computerCard is`, computerCard);

    mode = "compare";
    return message;
  }
  if (mode == "compare") {
    if (sortList[0] < computerCard) {
      message = `Player wins. <br><br>
                 Player's smallest card is  ${sortList[0]}.  <br><br>
                 Computer has ${computerCard}.`;
    } else if (sortList[0] > computerCard) {
      message = `Player loses. <br><br>
                 Player's smallest card is  ${sortList[0]}. <br><br>
                 Computer has ${computerCard}.`;
    } else {
      message = `It is a draw. <br><br>
                 Player's smallest card is  ${sortList[0]}. <br><br>
                 Computer has ${computerCard}.`;
    }
    mode = "start mode";
    return message;
  }
};

// let allPlayersCollection = [];
const playCardSuitOutput = function () {
  let player1 = playSingle();
  let player2 = playSingle();
  if (player1.rank > player2.rank) {
    message =
      playCardSuitOutputEmoji(player1, player2) +
      ` ${player1.rank} of ${player1.emoji} beats ${player2.rank} of ${player2.emoji}. 
      <br><br> Player 1 wins!`;
  } else if (player1.rank < player2.rank) {
    message =
      playCardSuitOutputEmoji(player1, player2) +
      `${player2.rank} of ${player2.emoji} beats ${player1.rank} of ${player1.emoji}. 
      <br><br> Player 2 wins!`;
  } else {
    message = playCardSuitOutputEmoji(player1, player2) + `Its a draw!`;
  }
  return message;
};

const playCardSuitOutputEmoji = function (player1, player2) {
  return ` Player 1 drew: <br>
          ${player1.rank} of ${player1.emoji}.<br><br>
          Player 2 drew: <br>
          ${player2.rank} of ${player2.emoji}.<br><br>`;
};

// More Comfortable
// Low Card with Wild Card

const playWithWildCard = function () {
  if (mode === "start mode") {
    mode = "get wild card mode";
    let wildRawDeck = makeDeck();
    let wildDeck = shuffleCards(wildRawDeck);
    let wildCard = wildDeck.pop();
    mode = "tally wild card";
    
    message = `The wildCard drawn is <br>
     ${wildCard.rank} of ${wildCard.emoji}.`;
  }
  if (mode === "tally wild card") {
    let player1 = playSingle();
    let player2 = playSingle();
    if (player1 == wildCard && player2 == wildCard) {
      message =
        playCardSuitOutputEmoji(player1, player2) +
        `<br><br> The wildcard is <br>
     ${wildcard.rank} of ${wildcard.emoji}.
     <br><br> Both win`;
    } else if (player1 == wildCard) {
      message =
        playCardSuitOutputEmoji(player1, player2) +
        `<br><br> The wildcard is <br>
     ${wildcard.rank} of ${wildcard.emoji}.
     <br><br> Player 1 wins`;
    } else if (player2 == wildCard) {
      message =
        playCardSuitOutputEmoji(player1, player2) +
        `<br><br> The wildcard is <br>
     ${wildcard.rank} of ${wildcard.emoji}.
     <br><br> Player 2 wins`;
    } else {
      playCardSuitOutput();
    }
  }
};
