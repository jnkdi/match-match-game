import "./RegisterModal.scss";
import { useState, useEffect } from "react";
import { storage } from "../../firebase";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import {
  getDocs,
  collection,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import { db } from "../../firebase";
import { v4 } from "uuid";
import styled from "styled-components";
import Card from "../UI/Card";
import Button from "../UI/Button";

const Modal = (props) => {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userAvatar, setUserAvatar] = useState(null);
  const [error, setError] = useState(false);

  const ModalError = styled.div`
    display: ${error ? "block" : "none"};
    opactiy: ${error ? "1" : "10"};
  `;

  const nameChangeHandler = (event) => {
    setUserName(event.target.value);
  };

  const emailChangeHandler = (event) => {
    setUserEmail(event.target.value);
  };

  const imageChangeHandler = (event) => {
    setUserAvatar(event.target.files[0]);
  };

  const usersCollectionRef = collection(db, 'users');

  const addUserHandler = async () => {
    if (
      userName.trim().length === 0 ||
      userEmail.trim().length === 0
    ) {
      setError(true);
      return;
    }

    if(userAvatar) {
      const imageRef = ref(storage, `images/${userAvatar.name + v4()}`);
      uploadBytes(imageRef, userAvatar).then(() => {
        console.log('image uploaded');
      })
    }

    const userData = {
      name: userName,
      email: userEmail,
      // image: userAvatar,
      id: Math.random().toString(),
    };

    try {
      await addDoc(usersCollectionRef, {userData});
    } catch(err) {
      console.log(err);
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
            placeholder="Name"
          />
          <input
            onChange={emailChangeHandler}
            type="text"
            placeholder="E-mail"
          />
          <input onChange={imageChangeHandler} type="file" name="file" />
          <ModalError className="user-modal__error">Enter all data</ModalError>
        </form>
        <div className="actions">
          <Button type="submit" onClick={addUserHandler}>
            Add user
          </Button>
          <Button onClick={props.onCloseModal}>cancel</Button>
        </div>
      </Card>
    </div>
  );
};

export default Modal;
