import "./RegisterModal.scss";
import { useState } from "react";
import { storage } from "../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { v4 } from "uuid";
import Modal from "../UI/Modal";

const RegisterModal = (props) => {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userAvatar, setUserAvatar] = useState("");
  const [error, setError] = useState(false);

  const nameChangeHandler = (event) => {
    setUserName(event.target.value);
  };

  const emailChangeHandler = (event) => {
    setUserEmail(event.target.value);
  };

  const imageChangeHandler = (event) => {
    setUserAvatar(event.target.files[0]);
  };

  const usersCollectionRef = collection(db, "users");

  const addUserHandler = async () => {
    if (userName.trim().length === 0 || userEmail.trim().length === 0) {
      setError(true);
      console.log("error");
      return;
    }

    const userData = {
      name: userName,
      email: userEmail,
      image: "",
      id: Math.random().toString(),
    };

    if (!userAvatar) {
      setError(false);
      props.onRegister();
      props.onCloseModal();
      return addDoc(usersCollectionRef, { userData });
    }

    const imageRef = ref(storage, `images/${userAvatar.name + v4()}`);
    const uploadImage = uploadBytesResumable(imageRef, userAvatar);

    uploadImage.on(
      "state_changed",
      (snapshot) => {},
      (err) => console.log(err),
      () => {
        getDownloadURL(uploadImage.snapshot.ref)
          // .then((url) => url.json())
          .then((url) => {
            userData.image = url;
            return addDoc(usersCollectionRef, { userData });
          });
      }
    );

    setError(false);
    props.onRegister();
    props.onCloseModal();
  };

  return (
    <Modal
      onCloseModal={props.onCloseModal}
      modalTitle={"Register new Player"}
      primaryButtonAction={addUserHandler}
      primaryButtonContent={"Add user"}
      secondaryButtonAction={props.onCloseModal}
      secondaryButtonContent={"cancel"}
    >
      <form className="user-modal__form">
        <input onChange={nameChangeHandler} type="text" placeholder="Name" />
        <input onChange={emailChangeHandler} type="text" placeholder="E-mail" />
        <input onChange={imageChangeHandler} type="file" name="file" />
        <span
          className="user-modal__error"
          style={{
            display: error ? "block" : "none",
          }}
        >
          Enter all data
        </span>
      </form>
    </Modal>
  );
};

export default RegisterModal;
