import GameCard from "./GameCard";

const GameCards = (props) => {
  return (
    <div className="game__cards">
      {props.cardList.map((card) => (
        <GameCard
          src={card.src}
          key={card.id}
          card={card}
          handleChoice={props.handleChoice}
          flippedFront={
            card === props.choiceOne ||
            card === props.choiceTwo ||
            card.matched ||
            props.isFlipped
          }
          disabled={props.disabled}
        />
      ))}
    </div>
  );
};

export default GameCards;
