import { useState } from "react";
import "./App.css";

const secretWord = ["b", "a", "n", "a", "n", "a"];
const wrongSign = ["(", "凸 ", "ಠ", "益", " ಠ", ")", "凸"];

function App() {
  //   // the array begins with only _
  const [guessedLetters, setGuessedLetters] = useState([
    "_",
    "_",
    "_",
    "_",
    "_",
    "_",
  ]);

  const [guessPosition, setGuessPosition] = useState(0);
  const [error, setError] = useState("");
  const [errorCount, setErrorCount] = useState(0);

  const handleChange = (event) => {
    const userInput = event?.target?.value?.slice(-1);

    console.log("guessPosition", guessPosition, userInput);
    if (secretWord[guessPosition] === userInput) {
      const nextPosition = guessPosition + 1;
      setGuessedLetters((current) => {
        return [
          ...current.slice(0, guessPosition),
          userInput,
          ...current.slice(guessPosition + 1),
        ];
      });
      setGuessPosition(nextPosition);
      // setError("");
      if (nextPosition === secretWord.length) {
        setError(`Win already`);
      }
    } else {
      setErrorCount(errorCount + 1);

      const msg = <>
          {userInput} is not correct.<br/>
          {wrongSign.slice(0, errorCount)}<br/>
          {errorCount + 1} wrong tries
        </>;
      setError(msg);

      if (errorCount === wrongSign.length) {
        setError(`Game Over`);
      }
    }
  };

  return (
    <div className="App">
      <h3>Guess the Word</h3>

      <input
        label="word"
        value={guessedLetters.filter((a) => a !== "_").join("")}
        onChange={handleChange}
      ></input>
      <br />
      <br />
      <h4>{error}</h4>
      <br />
      <br />

    </div>
  );
}

export default App;
