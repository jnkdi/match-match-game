import './Game.scss';
import Card from '../UI/Card';
import Stopwatch from './Stopwatch';
import GameCards from './GameCards';

const Game = (props) => {
  return (
    <Card className="game">
      <Stopwatch className='game__stopwatch' isRunning={props.isStopwatchRunning}/>
      <GameCards/>
    </Card>
  )
}

export default Game;