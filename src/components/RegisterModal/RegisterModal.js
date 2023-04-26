import "./RegisterModal.scss";
import { useState } from "react";
import { storage, db } from "../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { setDoc, doc } from "firebase/firestore";
import { v4 } from "uuid";
import Modal from "../UI/Modal";

const RegisterModal = (props) => {
  const [userName, setUserName] = useState("");
  const [userAvatar, setUserAvatar] = useState("");
  const [error, setError] = useState(false);

  const userNameChangeHandler = (event) => {
    setUserName(event.target.value);
  };

  const imageChangeHandler = (event) => {
    setUserAvatar(event.target.files[0]);
  };

  const addUserHandler = async () => {

    if (userName.trim().length === 0) {
      setError(true);
      console.log("error");
      return;
    }

    const userData = {
      name: userName,
      image: "",
      score: 0,
    };

    const userKey = userName + v4();
    window.localStorage.setItem("user", JSON.stringify(userKey));

    if (!userAvatar) {
      setError(false);
      props.onRegister();
      props.onCloseModal();
      return setDoc(doc(db, "users", `${userKey}`), userData);
    }

    const imageRef = ref(storage, `images/${userAvatar.name + v4()}`);
    const uploadImage = uploadBytesResumable(imageRef, userAvatar);

    uploadImage.on(
      "state_changed",
      (snapshot) => {},
      (err) => console.log(err),
      () => {
        getDownloadURL(uploadImage.snapshot.ref)
          .then((url) => {
            userData.image = url;
            return setDoc(doc(db, "users", `${userKey}`), userData);
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
      firstButtonAction={addUserHandler}
      firstButtonContent={"Add user"}
      secondButtonAction={props.onCloseModal}
      secondButtonContent={"cancel"}
    >
      <form className="user-modal__form">
        <input onChange={userNameChangeHandler} type="text" placeholder="Username" />
        <input onChange={imageChangeHandler} type="file" name="file" />
        <span
          className="user-modal__error"
          style={{
            display: error ? "block" : "none",
          }}
        >
          Enter username
        </span>
      </form>
    </Modal>
  );
};

export default RegisterModal;
