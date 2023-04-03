import "./RegisterModal.scss";
import { useState } from "react";
import styled from "styled-components";
import Card from "../UI/Card";
import Button from "../UI/Button";

const Modal = (props) => {
  const [enteredName, setEnteredName] = useState("");
  const [enteredLastName, setEnteredLastName] = useState("");
  const [enteredEmail, setEnteredEmail] = useState("");
  const [error, setError] = useState(false);

  const ModalError = styled.div`
    display: ${error ? "block" : "none"};
    opactiy: ${error ? "1" : "10"};
  `;

  const nameChangeHandler = (event) => {
    setEnteredName(event.target.value);
  };

  const lastNameChangeHandler = (event) => {
    setEnteredLastName(event.target.value);
  };

  const emailChangeHandler = (event) => {
    setEnteredEmail(event.target.value);
  };

  const addUserHandler = () => {
    if (
      enteredName.trim().length === 0 ||
      enteredLastName.trim().length === 0 ||
      enteredEmail.trim().length === 0
    ) {
      setError(true);
      return;
    }

    const userData = {
      name: enteredName,
      lastName: enteredLastName,
      email: enteredEmail,
      id: Math.random().toString(),
    }

    setError(false);
    props.onCloseModal();
    console.log(userData);
  };

  return (
    <div className={"modal"} onClick={props.onCloseModal}>
      <div className="backdrop" />
      <Card className="user-modal" onClick={(e) => e.stopPropagation()}>
        <h2 className="user-modal__title">Register new Player</h2>
        <form className="user-modal__form">
          <input
            onChange={nameChangeHandler}
            type="text"
            placeholder="First Name"
          />
          <input
            onChange={lastNameChangeHandler}
            type="text"
            placeholder="Last Name"
          />
          <input
            onChange={emailChangeHandler}
            type="text"
            placeholder="E-mail"
          />
          <ModalError className="user-modal__error">Enter all data</ModalError>
        </form>
        <div className="actions">
          <Button type='submit' onClick={addUserHandler}>Add user</Button>
          <Button onClick={props.onCloseModal}>cancel</Button>
        </div>
      </Card>
    </div>
  );
};

export default Modal;
