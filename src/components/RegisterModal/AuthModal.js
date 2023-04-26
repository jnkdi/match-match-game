import { useState, useRef } from "react";
import { signUp, signIn, useAuth, db, storage } from "../../firebase";
// import { updateProfile } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import Modal from "../UI/Modal";

const AuthModal = (props) => {
  const [userAvatar, setUserAvatar] = useState("");
  const [error, setError] = useState(false);

  // const currentUser = useAuth();
  const usersCollectionRef = collection(db, "users");

  // const emailRef = useRef();
  // const passwordRef = useRef();
  const userNameRef = useRef();

  const imageChangeHandler = (event) => {
    setUserAvatar(event.target.files[0]);
  };

  const addUserHandler = async () => {
    const userData = {
      name: userNameRef.current.value,
      // email: emailRef.current.value,
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
        console.log('photo');
        getDownloadURL(uploadImage.snapshot.ref)
          // .then((url) => url.json())
          .then((url) => {
            userData.image = url;
            return addDoc(usersCollectionRef, { userData });
          });
      }
    );

    props.onRegister();
    props.onCloseModal();
  };

  // const handleSignUp = async () => {
  //   try {
  //     await signUp(emailRef.current.value, passwordRef.current.value);
  //     updateProfile(currentUser, {
  //       displayName: userNameRef.current.value,
  //     });
  //   } catch {
  //     alert("Error!");
  //   }
  //   props.onRegister();
  //   props.onCloseModal();
  //   props.onPassUser(currentUser);
  //   addUserHandler();
  // }

  // const handleSignIn = async () => {
  //   try {
  //     await signIn(emailRef.current.value, passwordRef.current.value);
  //     updateProfile(currentUser, {
  //       displayName: userNameRef.current.value,
  //     });
  //     console.log("you signed in");
  //     console.log(emailRef.current.value);
  //     console.log(passwordRef.current.value);
  //   } catch {
  //     alert("Error!");
  //   }
  //   props.onRegister();
  //   props.onCloseModal();
  //   props.onPassUser(currentUser);
  // }

  return (
    <Modal
      onCloseModal={props.onCloseModal}
      modalTitle={"Register new Player"}
      firstButtonAction={addUserHandler}
      firstButtonContent={"Add new user"}
      // secondButtonAction={handleSignIn}
      // secondButtonContent={"Sign in"}
      thirdButtonAction={props.onCloseModal}
      thirdButtonContent={"cancel"}
    >
      <form className="user-modal__form">
        <input placeholder="Username..." ref={userNameRef} />
        {/* <input placeholder="Email..." ref={emailRef} />
        <input placeholder="Password..." type="password" ref={passwordRef} /> */}
        <input onChange={imageChangeHandler} type="file" name="file"/>
      </form>
    </Modal>
  );
};

export default AuthModal;
