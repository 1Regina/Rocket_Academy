// import logo from './logo.svg';
import { useState, useEffect } from "react";
import { getRandomIndex, shuffleCards, makeDeck, compareCards } from "./cards_helper";
import "./App.css";

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;

// const deck = shuffleCards(makeDeck());

export default function App() {
  // Set the default value of the deck
  const [cardDeck, setCardDeck] = useState(shuffleCards(makeDeck()));

  // Set the default player hand as empty
  const [playerHand, setPlayerHand] = useState([]);

  // // set player 1 state
  // const [player1, setPlayer1] = useState('true');

  // // set player 2 state
  // const [player2, setPlayer2] = useState('false');

  // Deal 2 cards into the player's hand and update the deck
  const dealCards = () => {
    const hand = [cardDeck.pop(), cardDeck.pop()];
    setPlayerHand(hand);
    setCardDeck([...cardDeck]);
  };

  // Render cards in the player hand
  // Note that when this renders the first time and the hand is
  // empty, it does not require a special condition.
  const handElems = playerHand.map(({ name, suit }) => (
    <div>
      <span>
        {name} {suit}
      </span>
    </div>
  ));
  
  
  return (
    <div className="App">
      <div>
        <h3>Cards:</h3>
        {handElems}
      </div>
      <p>
        <button onClick={dealCards}>Deal</button>
      </p>
    <div>
      <h3>Results:</h3>
      <h4>{compareCards(playerHand)}</h4>
    </div>
    </div>
  );
}
