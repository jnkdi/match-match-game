import Modal from "../UI/Modal";
import { Link } from "react-router-dom";

const WinModal = (props) => {
  return (
    <Modal
      onCloseModal={props.onCloseModal}
      modalTitle={`You win! Your score is ${props.points}`}
      firstButtonAction={props.startNewGame}
      firstButtonContent={"Play again"}
      secondButtonAction={props.onCloseModal}
      secondButtonContent={<Link to="/settings">change settings</Link>}
      thirdButtonAction={props.onCloseModal}
      thirdButtonContent={<Link to="/best-score">go to best score</Link>}
    />
  );
};

export default WinModal;
