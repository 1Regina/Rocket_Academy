// Get a random index ranging from 0 (inclusive) to max (exclusive).
const getRandomIndex = (max) => {
  return Math.floor(Math.random() * max);
};

// Shuffle the elements in the cardDeck array
export const shuffleCards = (cardDeck) => {
  // Loop over the card deck array once
  var currentIndex = 0;
  while (currentIndex < cardDeck.length) {
    // Select a random index in the deck
    var randomIndex = getRandomIndex(cardDeck.length);
    // Select the card that corresponds to randomIndex
    var randomCard = cardDeck[randomIndex];
    // Select the card that corresponds to currentIndex
    var currentCard = cardDeck[currentIndex];
    // Swap positions of randomCard and currentCard in the deck
    cardDeck[currentIndex] = randomCard;
    cardDeck[randomIndex] = currentCard;
    // Increment currentIndex
    currentIndex = currentIndex + 1;
  }
  // Return the shuffled deck
  return cardDeck;
};

export const deal = (cardDeck, cardsToDeal) => {
  const hand = [];
  for (let i = 0; i < cardsToDeal; i += 1) {
    hand.push(cardDeck.pop());
  }
  return hand;
};
