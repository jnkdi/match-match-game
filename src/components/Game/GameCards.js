import { useState, useEffect, useRef } from "react";
import { db } from "../../firebase";
import { getDocs, collection } from "firebase/firestore";
import GameCard from "./GameCard";

const GameCards = (props) => {
  const [cardList, setCardList] = useState([]);
  const [isFlipped, setIsFlipped] = useState(true);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const matchAmount = useRef(0);

  const cardsCollectionRef = collection(db, props.cardsSet);

  useEffect(() => {
    const getCardsList = async () => {
      try {
        const data = await getDocs(cardsCollectionRef);
        const filteredData = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));

        setCardList(
          filteredData
            .slice(props.cardsAmount / 2 - 1)
            .concat(filteredData.slice(props.cardsAmount / 2 - 1))
            .sort(() => Math.random() - 0.5)
            .map((card) => ({ ...card, id: Math.random() }))
        );

        setChoiceOne(null);
        setChoiceTwo(null);
        props.setTurns(0);
      } catch (err) {
        console.log(err);
      }
    };

    getCardsList();
    shuffleCards();
    setTimeout(() => {
      setIsFlipped(false);
      setDisabled(false);
      props.setIsStopwatchRunning(true);
    }, props.showTime * 1000);
  }, []);

  const shuffleCards = () => {
    const shuffledCards = cardList;
    setChoiceOne(null);
    setChoiceTwo(null);
    setCardList(shuffledCards);
    props.setTurns(0);
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
        if (matchAmount.current === props.cardsAmount) {
          props.endGame();
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
    props.setTurns((prevTurns) => prevTurns + 1);
    // props.setPoints(1 / (props.turns * Math.round(props.time)) * 10000);
    // props.setPoints(1000 - props.turns * 10 - Math.round(props.time) * 5);
    setDisabled(false);
  };

  //stop game and calculate points
  // const endGame = () => {
  //   props.setIsStopwatchRunning(false);
  //   // props.setPoints(1000 / (props.turns * Math.round(props.time)));
  //   // props.setPoints(1000 - props.turns * 10 - Math.round(props.time) * 5);
  // };

  return (
    <div className="game__cards">
      {cardList.map((card) => (
        <GameCard
          src={card.src}
          key={card.id}
          card={card}
          handleChoice={handleChoice}
          flippedFront={
            card === choiceOne ||
            card === choiceTwo ||
            card.matched ||
            isFlipped
          }
          disabled={disabled}
        />
      ))}
    </div>
  );
};

export default GameCards;
