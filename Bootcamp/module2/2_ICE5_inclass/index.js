import { readFile, writeFile } from 'fs';
import { add, read, write } from './jsonFileStorage.js';
import { shuffleCards, deal } from './customFunctions.js';
import cardDeck from './deck.js';

const action = process.argv[2];

const modifyJsonFile = (filename, key) => {
  const handleFileRead = (readErr, jsonContentStr) => {
    if (readErr) {
      console.log('Reading error', readErr);
    }

    // Convert data from string to Object
    let jsonContentObj = JSON.parse(jsonContentStr);
    const deckToModify = jsonContentObj[key];

    // Alter the Deck - Deal Cards
    if (action === 'alter') {
      const removedCard = deckToModify.pop();
      console.log(removedCard);
    }

    // Shuffle Existing Card Deck
    if (action === 'shuffle') {
      jsonContentObj[key] = shuffleCards(deckToModify);
    }

    // Deal Cards from Deck
    if (action === 'deal') {
      const freshDeck = shuffleCards(deckToModify)
      const currrentHand = deal(freshDeck, 2);
      console.log(currrentHand);
    }

    // Convert data from Object to string
    const updatedJsonContentStr = JSON.stringify(jsonContentObj);

    // Write updated data to file
    writeFile(filename, updatedJsonContentStr, (writeErr) => {
      if (writeErr) {
        console.log('writing error', writeErr);
      }
    });
  };

  // Read original data from file
  readFile(filename, 'utf-8', handleFileRead);
};

// Write New Card Deck
if (action === 'create') {
  add('data.json', 'cardDeck', cardDeck);
}

// Read Cards From Deck
if (action === 'read') {
  read('data.json');
}

if (action === 'alter' || action === 'shuffle' || action === 'deal') {
  modifyJsonFile('data.json', 'cardDeck');
}

if (action === 'reset') {
  write('data.json', {});
}
