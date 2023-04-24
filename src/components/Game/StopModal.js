import Modal from "../UI/Modal";
import { Link } from "react-router-dom";

const StopModal = (props) => {
  return (
    <Modal
      onCloseModal={props.onCloseModal}
      modalTitle={`Game stopped`}
      firstButtonAction={props.startNewGame}
      firstButtonContent={"Play again"}
      secondButtonAction={props.onCloseModal}
      secondButtonContent={<Link to="/settings">change settings</Link>}
      thirdButtonAction={props.onCloseModal}
      thirdButtonContent={<Link to="/best-score">go to best score</Link>}
    />
  );
};

export default StopModal;
