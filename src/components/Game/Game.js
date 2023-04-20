import "./Game.scss";
import Card from "../UI/Card";
import Stopwatch from "./Stopwatch";
import GameCards from "./GameCards";
import WinModal from "./WinModal";
import { useState, useEffect, useRef } from "react";
import { db } from "../../firebase";
import { getDocs, collection } from "firebase/firestore";

const Game = (props) => {
  const cardsAmount = 4;
  const cardsSet = "animals";
  const showTime = 5;

  const [isStopwatchRunning, setIsStopwatchRunning] = useState(false);
  const [cardList, setCardList] = useState([]);
  const [isFlipped, setIsFlipped] = useState(true);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [turns, setTurns] = useState(0);
  const [time, setTime] = useState(0);
  const [isGameEnd, setIsGameEnd] = useState(false);

  const matchAmount = useRef(0);

  const cardsCollectionRef = collection(db, cardsSet);

  let points = Math.round(
    100 * cardsAmount +
      (turns - cardsAmount / 2) * 10 -
      (Math.round(time) * 5) / 100
  );

  useEffect(() => {
    getCardsList();
    startGame();
  }, []);

  const startGame = () => {
    setCardList(cardList.sort(() => Math.random() - 0.5));
    props.startGame();
    setIsGameEnd(false);
    setTime(0);
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns(0);
    setIsFlipped(true);
    setDisabled(true);
    matchAmount.current = 0;

    setCardList((prevCards) => {
      return prevCards.map((card) => {
        return { ...card, matched: false };
      });
    });

    setTimeout(() => {
      setIsFlipped(false);
      setDisabled(false);
      setIsStopwatchRunning(true);
    }, showTime * 1000);
  };

  const getCardsList = async () => {
    try {
      const data = await getDocs(cardsCollectionRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      setCardList(
        filteredData
          .slice(0, cardsAmount / 2)
          .concat(filteredData.slice(0, cardsAmount / 2))
          .map((card) => ({ ...card, id: Math.random() }))
      );
    } catch (err) {
      console.log(err);
    }
  };

  // handle a choice
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  // compare 2 selected cards
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);

      if (choiceOne.src === choiceTwo.src && choiceOne.id !== choiceTwo.id) {
        matchAmount.current += 2;
        if (matchAmount.current === cardsAmount) {
          endGameHandler();
        }
        setCardList((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  // reset choices & increase turn
  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prevTurns) => prevTurns + 1);
    setDisabled(false);
  };

  const endGameHandler = () => {
    props.stopGame();
    setIsGameEnd(true);
    setIsStopwatchRunning(false);
  };

  return (
    <main>
      <Card className="game">
        {isGameEnd && <WinModal points={points} startNewGame={startGame} />}
        <Stopwatch
          className="game__stopwatch"
          isRunning={isStopwatchRunning}
          setTime={setTime}
          time={time}
        />
        <GameCards
          cardList={cardList}
          handleChoice={handleChoice}
          choiceOne={choiceOne}
          choiceTwo={choiceTwo}
          isFlipped={isFlipped}
          disabled={disabled}
        />
      </Card>
    </main>
  );
};

export default Game;
