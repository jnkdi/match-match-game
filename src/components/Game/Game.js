import "./Game.scss";
import Card from "../UI/Card";
import Stopwatch from "./Stopwatch";
import GameCards from "./GameCards";
import WinModal from "./WinModal";
import { useState } from "react";

const Game = (props) => {
  const cardsAmount = 12;
  const cardsSet = "animals";
  const showTime = 5;
  const [turns, setTurns] = useState(0);
  const [time, setTime] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);

  let points = 1000 - turns * 10 - Math.round(time) * 5;

  const winHandler = () => {
    setIsGameOver(true);
    props.setIsStopwatchRunning(false);
  };

  return (
    <main>
      <Card className="game">
        {isGameOver && <WinModal points={points} />}
        <Stopwatch
          className="game__stopwatch"
          isRunning={props.isStopwatchRunning}
          setTime={setTime}
        />
        <GameCards
          cardsAmount={cardsAmount}
          cardsSet={cardsSet}
          showTime={showTime}
          time={time}
          turns={turns}
          setIsStopwatchRunning={props.setIsStopwatchRunning}
          setTurns={setTurns}
          endGame={winHandler}
        />
      </Card>
    </main>
  );
};

export default Game;
