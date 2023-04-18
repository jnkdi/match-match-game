import "./Game.scss";
import Card from "../UI/Card";
import Stopwatch from "./Stopwatch";
import GameCards from "./GameCards";
import { useState } from "react";

const Game = (props) => {
  const cardsAmount = 12;
  const cardsSet = "animals";
  const showTime = 5;
  const [turns, setTurns] = useState(0);

  return (
    <main>
      <Card className="game">
        <Stopwatch
          className="game__stopwatch"
          isRunning={props.isStopwatchRunning}
        />
        <GameCards
          cardsAmount={cardsAmount}
          cardsSet={cardsSet}
          showTime={showTime}
          setIsStopwatchRunning={props.setIsStopwatchRunning}
          setTurns={setTurns}
        />
      </Card>
    </main>
  );
};

export default Game;
