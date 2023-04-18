import Card from "../UI/Card";
import { useState } from "react";

const GameCard = (props) => {
  // const [flipped, setFlipped] = useState(props.flipped);


  // useEffect(() => {
  //   setClassName(props.className);
  // }, [props.className]);

  // const flipToFront = (e) => {
  //   setIsFlipped(false);
  //   setClassName('');
  // }

  // const flipToBack = (e) => {
  //   setIsFlipped(true);
  //   setClassName('flipped');
  // }

  // const handleClick = (e) => {
  //   console.log(e.currentTarget.id);
  //   if(!props.disabled) {
  //     console.log('here');
  //     console.log(props.flipped);
  //     // props.handleChoice(props.card);
  //     setClassName(props.flipped ? 'flipped' : '');
  //   }

  // };

  // const handleClick = () => {
  //   if (!props.disabled) {
  //     console.log(props.isFront);
  //     setClassName(props.isFront ? '' : 'flipped');
  //     console.log(className);
  //     props.handleChoice(props.card);
  //   }
  // };

  const handleClick = () => {
    if (!props.disabled) {
      props.handleChoice(props.card);
    }
  };
  console.log(props.card);

  return (
    <div className="card__container" id={props.id}>
      <Card
        className={`game__card ${props.flipped ? "" : "flipped"}`}
        id={props.card.id}
        onClick={handleClick}
      >
        <div className="game__card card__back" />
        <div
          className="game__card card__front"
          style={{
            backgroundImage: `url(${props.src})`,
          }}
        />
      </Card>
    </div>
  );
};

export default GameCard;
