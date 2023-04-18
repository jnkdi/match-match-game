import Card from "../UI/Card";

const GameCard = (props) => {
  const handleClick = () => {
    if (!props.disabled) {
      props.handleChoice(props.card);
    }
  };

  return (
    <div className="card__container" id={props.id}>
      <Card
        className={`game__card ${props.flippedFront ? " " : "flipped"}`}
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
