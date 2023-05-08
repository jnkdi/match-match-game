import { useState, useRef } from "react";
import { db, storage } from "../../firebase";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import Modal from "../UI/Modal";

const AuthModal = (props) => {
  const [userAvatar, setUserAvatar] = useState("");

  const usersCollectionRef = collection(db, "users");

  const userNameRef = useRef();

  const imageChangeHandler = (event) => {
    setUserAvatar(event.target.files[0]);
  };

  const addUserHandler = async () => {
    const userData = {
      name: userNameRef.current.value,
      image: "",
      score: 0,
      id: Math.random().toString(),
    };

    if (!userAvatar) {
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
        console.log("photo");
        getDownloadURL(uploadImage.snapshot.ref)
          .then((url) => {
            userData.image = url;
            return addDoc(usersCollectionRef, { userData });
          });
      }
    );

    props.onRegister();
    props.onCloseModal();
  };

  return (
    <Modal
      onCloseModal={props.onCloseModal}
      modalTitle={"Register new Player"}
      firstButtonAction={addUserHandler}
      firstButtonContent={"Add new user"}
      thirdButtonAction={props.onCloseModal}
      thirdButtonContent={"cancel"}
    >
      <form className="user-modal__form">
        <input placeholder="Username..." ref={userNameRef} />
        <input onChange={imageChangeHandler} type="file" name="file" />
      </form>
    </Modal>
  );
};

export default AuthModal;
