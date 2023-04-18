import "./Card.scss";

function Card(props) {
  return (
    <div
      className={`card ${props.className}`}
      onClick={props.onClick}
      style={props.style}
      id={props.id}
    >
      {props.children}
    </div>
  );
}

export default Card;
