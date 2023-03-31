import './Card.scss';

function Card(props) {
  return <div className={`card ${props.className}`} onClick={props.onClick}>{props.children}</div>
}

export default Card;