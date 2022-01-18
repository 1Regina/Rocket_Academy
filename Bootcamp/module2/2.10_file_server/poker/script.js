// import {
//   straits,
//   oddStraits,
//   royalty,
//   twin,
//   twinTwin,
//   triple,
//   fully,
//   quadsi,
//   betStandard,
//   betPower,
//   betDouble,
// } from './infoSummary.js';

// ********************//
// GLOBAL VARIABLES//
let hand = [];
var cardNameTally = {};
var cardSuitTally = {};
let counterDuplicates = {};
// let outcome = {};
let royalFlush = false;
let straightFlush = false;
let fourOfAKind = false;
let fullHouse = false;
let flush = false;
let straight = false;
let threeOfAKind = false;
let twoPair = false;
let onePair = false;
// let highCard = false; unless duel
let mode = 'choose bet';
let credits = 10;
// default initial hold status of cards
let allCards = ['1', '1', '1', '1', '1'];
// final hold status of all card before swap
let holdAray = [];
let earnings = {};

// ********************//
// MUSIC //
const music = document.getElementById('myAudio');

function playAudio() {
  music.loop = true;
  music.play();
}

function pauseAudio() {
  music.pause();
}

// ********************//
// HELPER FUNCTIONS //
const makeDeck = () => {
  // Initialise an empty deck array
  const newDeck = [];
  const symbol = ['♦', '♣', '♥', '♠'];
  // Initialise an array of the 4 suits in our deck. We will loop over this array.
  const suits = ['diamonds', 'clubs', 'hearts', 'spades'];

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

const getRandomIndex = (max) => {
  return Math.floor(Math.random() * max);
};

const shuffleCards = (cardDeck) => {
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

// function to append 5 cards cover
const layCardsCover = () => {
  // retrieve table area
  let table = document.getElementById('cardsTable');
  let container = document.createElement('div');
  container.classList.add('card-container');
  container.setAttribute('id', 'cards-container');
  table.appendChild(container);
  for (i = 0; i < 5; i++) {
    var img = document.createElement('img');
    img.src = 'bb8.png';
    img.setAttribute('class', 'cover');
    container.appendChild(img);
  }
};
layCardsCover();

// let picHand = []
//Check if array contains all elements of another array
// const hasPictInStraight = (hand, picHand) => {
//   return picHand.every((i) => hand.includes(i));
// };

// ********************//
//WINING CONDITIONS //
// FLUSHES//
/**
 * A function that check hand for same suit (can be simplified)
 * @param  hand {array} array of cards in hand
 * @return {bool} true if the hand is of the same suit
 */
const hasFlush = (hand) => {
  // Loop over hand
  for (let i = 0; i < hand.length; i += 1) {
    let cardSuit = hand[i].suit;
    // If we have seen the card name before, increment its count
    if (cardSuit in cardSuitTally) {
      cardSuitTally[cardSuit] += 1;
    }
    // Else, initialise count of this card name to 1
    else {
      cardSuitTally[cardSuit] = 1;
    }
  }
  for (cardSuit in cardSuitTally) {
    console.log(
      `There are ${cardSuitTally[cardSuit]}: ${cardSuit}s in the hand`
    );
  }
  let counterFlush = 0;
  for (const key in cardSuitTally) {
    // only 1 suit exists
    if (Object.keys(cardSuitTally).length === 1) {
      counterFlush += 1;
      // console.log(`There a flush of ${cardSuitTally[key]} in hand`);
      console.log(`There a flush of ${hand[0].suit} in hand`);
      console.log(`counterFlush`, counterFlush);
      flush = true;
    } else {
      flush = false;
    }
  }
  return flush;
};

/**
 * A function that check if every card is sequential
 * @param  hand {array} array of cards in hand
 * @return {bool} true if the cards are in sequential order
 */
const hasStraight = (hand) => {
  // sort the hand in order to compare sequence
  hand.sort((a, b) => a.rank - b.rank);
  // Loop over hand
  for (let i = 0; i < hand.length; i += 1) {
    if (
      // normal straight
      (hand[i + 1].rank - hand[i].rank === 1 &&
        hand[4].rank - hand[0].rank === 4) ||
      // king-ace-2-3-4
      (hand[0].rank === 1 &&
        hand[1].rank === 2 &&
        hand[2].rank === 3 &&
        hand[3].rank === 4 &&
        hand[4].rank === 13) ||
      // queen-king-ace-2-3
      (hand[0].rank === 1 &&
        hand[1].rank === 2 &&
        hand[2].rank === 3 &&
        hand[3].rank === 12 &&
        hand[4].rank === 13) ||
      // jack-queen-king-ace-2
      (hand[0].rank === 1 &&
        hand[1].rank === 2 &&
        hand[2].rank === 11 &&
        hand[3].rank === 12 &&
        hand[4].rank === 13) ||
      // 10-jack-queen-king-ace(
      (hand[0].rank === 1 &&
        hand[1].rank === 10 &&
        hand[2].rank === 11 &&
        hand[3].rank === 12 &&
        hand[4].rank === 13)
    ) {
      // console.log(`hasSraight variance ${hand[4].rank - hand[0].rank === 4}`);
      straight = true;
    } else {
      straight = false;
    }
    return straight;
  }
};

/**
 * A function that check if the hand is royal flush
 * @param  hand {array} array of cards in hand
 * @return {bool} true if the hand is a royal flush
 */
const hasRoyalFlush = (hand) => {
  hand.sort((a, b) => a.rank - b.rank);
  // hand.sort((a, b) => (a.rank > b.rank ? 1 : b.rank > a.rank ? -1 : 0));
  // royal flush
  if (
    hasFlush(hand) === true &&
    hand[0].name === 'ace' &&
    hand[4].name === 'king'
  ) {
    royalFlush = true;
    // outcome['royalFlush'] = 1;
  } else {
    royalFlush = false;
  }
  console.log(`royalFlush`, royalFlush);
  return royalFlush;
};

/**
 * A function that check if the hand is straight flush
 * @param  hand {array} array of cards in hand
 * @return {bool} true if the hand is a straight flush
 */
const hasStraightFlush = (hand) => {
  hand.sort((a, b) => a.rank - b.rank);
  // straight flush
  if (hasFlush(hand) === true && hasStraight(hand) === true) {
    straightFlush = true;
  } else {
    straightFlush = false;
  }
  console.log(`straightFlush`, straightFlush);
  return straightFlush;
};

// PAIRS & SAME KIND//
/**
 * A function that summarizes the hand for duplicates
 * @param  hand {array} array of cards in hand
 * @return {object} which summarize the number of pairs and triples in hand
 */
const hasDuplicateNames = (hand) => {
  cardNameTally = {};
  // Loop over hand
  for (let i = 0; i < hand.length; i += 1) {
    let cardName = hand[i].name;

    // If we have seen the card name before, increment its count
    if (cardName in cardNameTally) {
      cardNameTally[cardName] += 1;
    }
    // Else, initialise count of this card name to 1
    else {
      cardNameTally[cardName] = 1;
    }
  }
  for (cardName in cardNameTally) {
    console.log(
      `There are ${cardNameTally[cardName]}: ${cardName}s in the hand`
    );
  }
  // initialise the count of pairs and triple in hand
  let counterPairs = 0;
  let counterTriples = 0;
  let counterQuadruples = 0;
  for (const key in cardNameTally) {
    if (cardNameTally[key] === 2) {
      counterPairs += 1;
      counterDuplicates['pairs'] = counterPairs;
    } else if (cardNameTally[key] === 3) {
      counterTriples += 1;
      counterDuplicates['triples'] = counterTriples;
    } else if (cardNameTally[key] === 4) {
      counterQuadruples += 1;
      counterDuplicates['quadruples'] = counterQuadruples;
    }
  }
  console.log(`There are ${counterPairs} pairs of cards name in hand`);
  console.log(`There are ${counterTriples} triples of cards name in hand`);
  console.log(`There are ${counterQuadruples} full house in hand`);
  console.log(`cardNameTally`, cardNameTally);
  return counterDuplicates;
};

/**
 * A function that check if it is one pair
 * @param  hand {array} array of cards in hand
 * @return {bool} true if hand has a pair
 */
const hasOnePair = (hand) => {
  cardNameTally = {};
  // Loop over hand
  for (let i = 0; i < hand.length; i += 1) {
    let cardName = hand[i].name;
    // If we have seen the card name before, increment its count
    if (cardName in cardNameTally) {
      cardNameTally[cardName] += 1;
    }
    // Else, initialise count of this card name to 1
    else {
      cardNameTally[cardName] = 1;
    }
  }
  // initialise the count of pairs in hand
  let counterPairs = 0;
  for (const key in cardNameTally) {
    if (cardNameTally[key] === 2) {
      counterPairs += 1;
    }
  }
  if (counterPairs === 1) {
    return (onePair = true);
  } else {
    onePair = false;
  }
  console.log(`cardNameTally`, cardNameTally);
  return onePair;
};

/**
 * A function that check if it has 2 pairs
 * @param  hand {array} array of cards in hand
 * @return {bool} true if hand has 2 pairs
 */
const hasTwoPairs = (hand) => {
  cardNameTally = {};
  // Loop over hand
  for (let i = 0; i < hand.length; i += 1) {
    let cardName = hand[i].name;
    // If we have seen the card name before, increment its count
    if (cardName in cardNameTally) {
      cardNameTally[cardName] += 1;
    }
    // Else, initialise count of this card name to 1
    else {
      cardNameTally[cardName] = 1;
    }
  }
  // initialise the count of pairs in hand
  let counterPairs = 0;
  for (const key in cardNameTally) {
    if (cardNameTally[key] === 2) {
      counterPairs += 1;
    }
  }
  if (counterPairs === 2) {
    return (twoPair = true);
  } else {
    twoPair = false;
  }
  console.log(`cardNameTally`, cardNameTally);
  return twoPair;
};

/**
 * A function that check if it is 3 of a kind
 * @param  hand {array} array of cards in hand
 * @return {bool} true if hand has 3 same cards
 */
const hasThreeOfKind = (hand) => {
  cardNameTally = {};
  // Loop over hand
  for (let i = 0; i < hand.length; i += 1) {
    let cardName = hand[i].name;
    // If we have seen the card name before, increment its count
    if (cardName in cardNameTally) {
      cardNameTally[cardName] += 1;
    }
    // Else, initialise count of this card name to 1
    else {
      cardNameTally[cardName] = 1;
    }
  }
  // initialise the count of pairs in hand
  let counter = 0;
  for (const key in cardNameTally) {
    if (cardNameTally[key] === 3) {
      counter += 1;
    }
  }
  if (counter === 1) {
    return (threeOfAKind = true);
  } else {
    threeOfAKind = false;
  }
  console.log(`cardNameTally`, cardNameTally);
  return threeOfAKind;
};

/**
 * A function that check if it is 3 of a kind & a pair (full house)
 * @param  hand {array} array of cards in hand
 * @return {bool} true if hand has a full house
 */
const hasFullHouse = (hand) => {
  if (hasThreeOfKind(hand) === true && hasOnePair(hand) === true) {
    return (fullHouse = true);
  } else {
    fullHouse = false;
  }
  return fullHouse;
};

/**
 * A function that check if it is 4 of a kind
 * @param  hand {array} array of cards in hand
 * @return {bool} true if hand has 4 of a kind
 */
const hasFourOfKind = (hand) => {
  cardNameTally = {};
  // Loop over hand
  for (let i = 0; i < hand.length; i += 1) {
    let cardName = hand[i].name;
    // If we have seen the card name before, increment its count
    if (cardName in cardNameTally) {
      cardNameTally[cardName] += 1;
    }
    // Else, initialise count of this card name to 1
    else {
      cardNameTally[cardName] = 1;
    }
  }
  // initialise the count of pairs in hand
  let counter = 0;
  for (const key in cardNameTally) {
    if (cardNameTally[key] === 4) {
      counter += 1;
    }
  }
  if (counter === 1) {
    return (fourOfAKind = true);
  } else {
    fourOfAKind = false;
  }
  console.log(`cardNameTally`, cardNameTally);
  return fourOfAKind;
};

// ********************//
//SANDBOX TESTING //
const testingAll = () => {
  console.log(`!!!!FLUSH TESTING!!!`);
  let straits = makeDeck().slice(15, 20);
  console.log(`straits`, straits);
  let oddStraits = makeDeck().slice(17, 20);
  let oddStraitsA = makeDeck()[2];
  let oddStraitsA1 = makeDeck()[3];
  oddStraits.push(oddStraitsA);
  oddStraits.push(oddStraitsA1);
  console.log(`oddStraits: `, oddStraits);
  console.log(` Straight outcome on straits:`, hasStraight(straits)); // true
  console.log(` Straight outcome on oddStraits:`, hasStraight(oddStraits)); // true
  console.log(`@@@@@@@@@@@@@@@@@@@@@@@@@@@@@`);
  console.log(` Straight Flush outcome on straits:`, hasStraightFlush(straits)); //true
  console.log(` Straight Flush on oddStraits:`, hasStraightFlush(oddStraits)); // false
  console.log(`&&&&&&&&&&&&&&&&&&&&&&&&&&&&&`);
  let royalty = makeDeck().slice(9, 13);
  royalty.push(makeDeck()[0]);
  console.log(`royalty`, royalty);
  console.log(`$$$$$$$$$$$$$$$$$$$$$$$$$$`);
  console.log(`Royal Flush outcome:`, hasRoyalFlush(royalty)); //true

  console.log(`!!!!PAIRS & KINDS TESTING!!!`);
  let twin = makeDeck().slice(31, 35);
  twin.push(makeDeck()[47]);
  console.log(`twin`, twin);
  console.log(`OnePair outcome on twin: `, hasOnePair(twin)); // true

  let twinTwin = makeDeck().slice(31, 35);
  twinTwin.push(makeDeck()[6]);
  twinTwin.push(makeDeck()[47]);
  console.log(`twinTwin`, twinTwin);
  console.log(`TwoPair outcome on twinTwin: `, hasTwoPairs(twinTwin)); // true

  let triple = makeDeck().slice(32, 35);
  triple.push(makeDeck()[8]);
  triple.push(makeDeck()[47]);
  console.log(`triple`, triple);
  console.log(`ThreeOfAKind outcome on triple: `, hasThreeOfKind(triple)); // true

  let fully = makeDeck().slice(33, 35);
  fully.push(makeDeck()[7]);
  fully.push(makeDeck()[47]);
  fully.push(makeDeck()[20]);
  console.log(`fully`, fully);
  console.log(`fullHouse outcome on fully: `, hasFullHouse(fully)); // true

  let quadsi = makeDeck().slice(33, 35);
  quadsi.push(makeDeck()[8]);
  quadsi.push(makeDeck()[47]);
  quadsi.push(makeDeck()[21]);
  console.log(`quasi`, quadsi);
  console.log(`fourOfAKind outcome on quasi: `, hasFourOfKind(quadsi)); // true

  console.log(`random test: `, hasFlush(royalty)); // false
};
// ********************//
// BUTTONS//

const instruction = document.querySelector('#instruction');
instruction.innerText =
  '1. Click on the bet (`Standard` or `Power Up` or `Double`) you want to play.';

const betStandardButton = document.querySelector('#betStandard');
betStandardButton.onclick = () => {
  if (mode === 'choose bet') {
    earnings = betStandard;
    document.getElementById('betStandard').style.background = 'red';
    document.getElementById('betPower').style.background = 'goldenrod';
    document.getElementById('betDouble').style.background = 'goldenrod';
    instruction.innerText = '2. Click on `Start` button.';
    mode = 'start';
    return earnings;
  }
};

const betPowerdButton = document.querySelector('#betPower');
betPowerdButton.onclick = () => {
  if (mode === 'choose bet') {
    earnings = betPower;
    document.getElementById('betStandard').style.background = 'goldenrod';
    document.getElementById('betPower').style.background = 'red';
    document.getElementById('betDouble').style.background = 'goldenrod';
    instruction.innerText = '2. Click on `Start` button.';
    mode = 'start';
    return earnings;
  }
};

const betDoubleButton = document.querySelector('#betDouble');
betDoubleButton.onclick = () => {
  if (mode === 'choose bet') {
    earnings = betDouble;
    document.getElementById('betStandard').style.background = 'goldenrod';
    document.getElementById('betPower').style.background = 'goldenrod';
    document.getElementById('betDouble').style.background = 'red';
    instruction.innerText = '2. Click on `Start` button.';
    mode = 'start';
    return earnings;
  }
};
const buttonsArea = document.getElementById('choose');
// Start Game Button
const startbutton = document.createElement('button');
startbutton.innerText = 'Start';

// startbutton.type = "start"
startbutton.onclick = () => {
  if (mode === 'start') {
    startClick();
    instruction.innerText =
      '3. Click on the cards to hold. To change your mind, click again on card that is on hold. When done, click on the `Swap` button';
    mode = 'swap';
  }
};
buttonsArea.appendChild(startbutton);

// Swap Cards Button
const swapbutton = document.createElement('button');
swapbutton.innerText = 'Swap';

// swapbutton.type = "swap"
swapbutton.onclick = function () {
  if (mode === 'swap') {
    console.log('swap');
    // first identify positions where status is changed
    allCards = ['1', '1', '1', '1', '1'];
    let priorSwapHoldArray = getHoldArray();
    let diffArray = findDivergence(allCards, priorSwapHoldArray);
    console.log(`index position to swap`, diffArray);

    // draw new cards to replace in DOM element
    diffArray.forEach((element) => {
      let newCardObj = deck.pop();
      hand.splice(element, 1, newCardObj);
    });
    // clear everything
    let container = document.querySelector('#cards-container');
    container.innerHTML = '';
    // reattached the hand with swap cards
    for (i = 0; i < hand.length; i++) {
      // display each card
      let cardPiece = createCard(hand[i]);
      container.appendChild(cardPiece);
      let cardElem = document.createElement('div');
      cardElem.id = `cardElem${i}`;
      cardElem.setAttribute('data-hold', 0);
      console.log(`cardPiece`, `cardPiece${i}`);

      cardPiece.appendChild(cardElem);
    }
    instruction.innerText = '4. Click `Submit` to see your new credit balance.';
    mode = 'submit';
  }
};
buttonsArea.appendChild(swapbutton);

// Submit Game Button
const submitbutton = document.createElement('button');
submitbutton.innerText = 'Submit';

// submitbutton.type = "submit"
submitbutton.onclick = function () {
  if (mode === 'submit') {
    // sorting(hand);
    // console.log(`hand submitted`, hand)
    let displayBal = document.getElementById('wallet');
    let updateBalance = evaluateEarnings(hand);
    displayBal.innerText = updateBalance;
    instruction.innerText =
      '5. Click `Replay` to clear the cards and play again.';
    mode = 'replay';
  }
};
buttonsArea.appendChild(submitbutton);

// replay Game Button
const replaybutton = document.createElement('button');
replaybutton.innerText = 'Replay';

// replaybutton.type = "replay"
replaybutton.onclick = function () {
  if (mode === 'replay' && credits >= 0) {
    console.log('replay');
    document.querySelector('#cardsTable').innerHTML = '';
    layCardsCover();
    //reinitialise all globals except credits
    deck = shuffleCards(makeDeck());
    hand = [];
    cardNameTally = {};
    cardSuitTally = {};
    allCards = ['1', '1', '1', '1', '1'];
    holdAray = [];
    document.getElementById('betStandard').style.background = 'goldenrod';
    document.getElementById('betPower').style.background = 'goldenrod';
    document.getElementById('betDouble').style.background = 'goldenrod';
    instruction.innerText =
      '1. Click on the bet (`Standard` or `Power Up` or `Double`) you want to play';
    mode = 'choose bet';
  }
  if (mode === 'replay' && credits === 'Game Over') {
    instruction.innerText = '6. Sorry your run out of credits. Refresh the browser to start over or pay me to get more credits';
    mode = 'game over';
  }
};
buttonsArea.appendChild(replaybutton);

// ********************//
// SHOW HAND//
// Create a visual card from sample card
const createCard = (cardInfo) => {
  const card = document.createElement('div');
  card.classList.add('card');

  const suit = document.createElement('div');
  suit.classList.add('suit', cardInfo.colour);
  suit.innerText = cardInfo.suitSymbol;

  const name = document.createElement('div');
  name.classList.add(cardInfo.displayName, cardInfo.colour);
  name.innerText = cardInfo.displayName;

  card.appendChild(name);
  card.appendChild(suit);

  return card;
};

// Function to display the created card //

const startClick = () => {
  let table = document.getElementById('cardsTable');
  document.querySelector('#cardsTable').innerHTML = '';
  let container = document.createElement('div');
  container.classList.add('card-container');
  container.setAttribute('id', 'cards-container');
  table.appendChild(container);
  for (i = 0; i < allCards.length; i++) {
    hand.push(deck.pop());
    // display each card
    let cardPiece = createCard(hand[i]);
    container.appendChild(cardPiece);
    // liam elem ID creation step 2
    // assign an ID to each of the items (ie. the cards)
    let cardElem = document.createElement('div');
    cardElem.id = `cardElem${i}`;
    cardElem.setAttribute('data-hold', 0);
    console.log(`cardPiece`, `cardPiece${i}`);

    cardPiece.appendChild(cardElem);
    console.log(
      `document cardElem id`,
      document.getElementById(`cardElem${i}`)
    );
    // add eventListener to each card
    cardPiece.addEventListener('click', () => {
      console.log(`cardElem`, cardElem);
      let holdStatus = cardElem.getAttribute(`data-hold`);
      // update hold status each time the card is clicked
      if (holdStatus === '0') {
        holdStatus = 1;
        cardElem.innerText = 'hold';
        cardElem.setAttribute('data-hold', holdStatus);

        holdAray.push(holdStatus);
      }
      if (holdStatus === '1') {
        holdStatus = 0;
        cardElem.innerText = '';
        cardElem.setAttribute('data-hold', holdStatus);
        holdAray.push(holdStatus);
      }
      console.log(`ddddd`, holdStatus);
    });
  }
  console.log(`hand created`, hand);
};

// obtain new array of status of hold on each cardelem
const getHoldArray = () => {
  holdAray = [];
  for (let i = 0; i < allCards.length; i++) {
    let cardElem = document.querySelector(`#cardElem${i}`);
    let toSwapStatus = cardElem.getAttribute(`data-hold`);
    holdAray.push(toSwapStatus);
  }
  console.log(`getHoldArray`, holdAray);
  return holdAray;
};

// compare 2 arrays to find index where there is a change
const findDivergence = function (a1, a2) {
  var result = [],
    longerLength = a1.length >= a2.length ? a1.length : a2.length;
  for (i = 0; i < longerLength; i++) {
    if (a1[i] !== a2[i]) {
      result.push(i);
    }
  }
  console.log(result);
  return result;
};

// ********************//
//CALCULATE EARNINGS //
const betStandard = {
  flushRoyal: 250,
  flushStraight: 150,
  kindOfFour: 100,
  houseFull: 80,
  flushClassic: 60,
  straight: 45,
  kindOfThree: 32,
  pairDual: 25,
  pairSolo: 10,
  lose: -5,
};

const betPower = {
  flushRoyal: 375,
  flushStraight: 225,
  kindOfFour: 150,
  houseFull: 120,
  flushClassic: 90,
  straight: 68,
  kindOfThree: 48,
  pairDual: 38,
  pairSolo: 15,
  lose: -10,
};

const betDouble = {
  flushRoyal: 500,
  flushStraight: 300,
  kindOfFour: 200,
  houseFull: 160,
  flushClassic: 120,
  straight: 90,
  kindOfThree: 64,
  pairDual: 50,
  pairSolo: 20,
  lose: -20,
};

/**
 * A function that updates credit on hand
 * @param  hand {array} array of cards in hand
 * @return {number} which reflect the updated credits on hand
 */
const evaluateEarnings = (hand) => {
  hasRoyalFlush(hand);
  hasStraightFlush(hand);
  hasFourOfKind(hand);
  hasFullHouse(hand);
  hasFlush(hand);
  hasStraight(hand);
  hasThreeOfKind(hand);
  hasTwoPairs(hand);
  hasOnePair(hand);

  if (hasRoyalFlush(hand) === true) {
    credits += earnings.flushRoyal;
    console.log(`royalflush`, credits);
    return credits;
  } else if (hasStraightFlush(hand) === true) {
    credits += earnings.flushStraight;
    console.log(`straightflush`, credits);
    return credits;
  } else if (hasFourOfKind(hand) === true) {
    credits += earnings.kindOfFour;
    console.log(`4 of a kind`, credits);
    return credits;
  } else if (hasFullHouse(hand) === true) {
    credits += earnings.houseFull;
    console.log(`fullhouse`, credits);
    return credits;
  } else if (hasFlush(hand) === true) {
    credits += earnings.flushClassic;
    console.log(`flush`, credits);
    return credits;
  } else if (hasStraight(hand) === true) {
    credits += earnings.straight;
    console.log(`straights`, credits);
    return credits;
  } else if (hasThreeOfKind(hand) === true) {
    credits += earnings.kindOfThree;
    console.log(`3 of a kind`, credits);
    return credits;
  } else if (hasTwoPairs(hand) === true) {
    credits += earnings.pairDual;
    console.log(`hasTwoPairs`, credits);
    return credits;
  } else if (hasOnePair(hand) === true) {
    credits += earnings.pairSolo;
    console.log(`one pair`, credits);
    return credits;
  } else {
    credits += earnings.lose;
    console.log(`loss`, credits);
    if (credits < 0) {
      credits = 'Game Over';
      // mode = 'game over';
      return credits;
    } else {
      console.log(`positive loss`, credits);
      return credits;
    }
  }
};
