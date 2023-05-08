import GameCard from "./GameCard";

const GameCards = (props) => {
  return (
    <div className="game__cards" style={props.style}>
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
          style={{
            maxWidth: `${
              props.grid === 6 ? "120px" : props.grid === 5 ? "150px" : "160px"
            }`,
          }}
        />
      ))}
    </div>
  );
};

export default GameCards;
