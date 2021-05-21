import React, { useState } from "react";
import MaterialIcon from "material-icons-react";
import { sendWord } from "./wordcheck.js";
import Timer from "./Timer";
import WinnerPoints from "./winner";
import { useFirestoreDocData } from "reactfire";
import Points from "./points.js";
import Surrender from "./surrender";
import "./session.css";

export default function Session({ gameRef, player, setIsCreating }) {
  const [word, setWord] = useState("");
  const [words, setWords] = useState([]);

  const points = useFirestoreDocData(gameRef).data[`p${player}Points`];
  const letterArray = useFirestoreDocData(gameRef).data?.letters;
  const over = useFirestoreDocData(gameRef).data?.over;
  const [isSurrender, SetisSurrender] = useState(false);

  async function checkWord() {
    const result = await sendWord(word);
    if (result) {
      setWords([...words, document.getElementById("wordDisplay").innerHTML]);
      gameRef.set(
        {
          [`p${player}Points`]: points + word.length,
        },
        { merge: true }
      );
      document.getElementById("wordDisplay").style.borderBottom =
        "7px solid #2ecc71";
    } else {
      document.getElementById("wordDisplay").style.borderBottom =
        "7px solid #e74c3c";
    }
    setWord("");
  }

  function backspace() {
    setWord((prev) => prev.substring(0, prev.length - 1));
  }

  function handleAddLetter(e) {
    document.getElementById("wordDisplay").style.borderBottom =
      "7px solid black";
    setWord((prev) => prev + e.target.value);
  }

  return (
    <div className='session'>
      {over && (
        <WinnerPoints
          over={over}
          setIsCreating={setIsCreating}
          gameRef={gameRef}
          player={player}
        />
      )}
      {isSurrender && (
        <Surrender
          SetisSurrender={SetisSurrender}
          gameRef={gameRef}
          player={player}
        />
      )}
      <div className='points'>
        <Points gameRef={gameRef} id='player1' player='1' />
        <Points gameRef={gameRef} id='player2' player='2' />
      </div>
      <Timer minutes={500} seconds={30} gameRef={gameRef}></Timer>
      <button type='button' onClick={() => SetisSurrender(true)}>
        Surrender
      </button>
      <h2 className='instruct'>Form Words Using These Letters</h2>
      <div className='wordControls'>
        <h2 id='wordDisplay'>{word || <>&nbsp;</>}</h2>
        <button
          id='backspace'
          className='wordButton'
          type='button'
          onClick={backspace}
        >
          <MaterialIcon icon='backspace' invert />
        </button>
        <button
          id='submitWord'
          className='wordButton'
          type='button'
          onClick={checkWord}
        >
          <MaterialIcon icon='keyboard_return' invert />
        </button>
      </div>
      {letterArray && (
        <div className='grid-cointainer'>
          <button onClick={handleAddLetter} value={letterArray[0]}>
            {letterArray[0]}
          </button>
          <button onClick={handleAddLetter} value={letterArray[1]}>
            {letterArray[1]}
          </button>
          <button onClick={handleAddLetter} value={letterArray[2]}>
            {letterArray[2]}
          </button>
          <button onClick={handleAddLetter} value={letterArray[3]}>
            {letterArray[3]}
          </button>
          <button onClick={handleAddLetter} value={letterArray[4]}>
            {letterArray[4]}
          </button>
          <button onClick={handleAddLetter} value={letterArray[5]}>
            {letterArray[5]}
          </button>
        </div>
      )}
    </div>
  );
}
