import Card from "../UI/Card";
import Button from "../UI/Button";

const Modal = (props) => {
  return (
    <div className={"modal"} onClick={props.onCloseModal}>
      <div className="backdrop" />
      <Card className="user-modal" onClick={(e) => e.stopPropagation()}>
        <h2 className="user-modal__title">{props.modalTitle}</h2>
        {props.children}
        <div className="actions">
          <Button type="submit" onClick={props.primaryButtonAction}>
            {props.primaryButtonContent}
          </Button>
          <Button onClick={props.secondaryButtonAction}>
            {props.secondaryButtonContent}
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Modal;
