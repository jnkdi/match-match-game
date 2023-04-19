import Modal from "../UI/Modal";
import { Link } from "react-router-dom";

const WinModal = (props) => {
  const newGame = () => {
    console.log("new game");
  };

  return (
    <Modal
      onCloseModal={props.onCloseModal}
      modalTitle={`You win! Your score is ${props.points}`}
      primaryButtonAction={newGame}
      primaryButtonContent={"Start new game"}
      secondaryButtonAction={props.onCloseModal}
      secondaryButtonContent={<Link to="/best-score">go to best score</Link>}
    />
  );
};

export default WinModal;
