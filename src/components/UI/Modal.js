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
          {props.firstButtonContent && (
            <Button type="submit" onClick={props.firstButtonAction}>
              {props.firstButtonContent}
            </Button>
          )}

          {props.secondButtonContent && (
            <Button onClick={props.secondButtonAction}>
              {props.secondButtonContent}
            </Button>
          )}

          {props.thirdButtonContent && (
            <Button onClick={props.thirdButtonAction}>
              {props.thirdButtonContent}
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
};

export default Modal;
