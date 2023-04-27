import { useState } from "react";
import Modal from "../UI/Modal";
import { storage } from "../../firebase";
import { updateDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";

const AvatarChangeModal = (props) => {
  const [userAvatar, setUserAvatar] = useState("");

  const imageChangeHandler = (event) => {
    setUserAvatar(event.target.files[0]);
  };

  const changeAvatar = async () => {
    const imageRef = ref(storage, `images/${userAvatar.name + v4()}`);
    const uploadImage = uploadBytesResumable(imageRef, userAvatar);

    uploadImage.on(
      "state_changed",
      (snapshot) => {},
      (err) => console.log(err),
      () => {
        getDownloadURL(uploadImage.snapshot.ref).then((url) => {
          props.setAvatarUrl(url);
          updateDoc(props.userRef, {
            image:
              url ||
              "https://firebasestorage.googleapis.com/v0/b/match-match-game-9501e.appspot.com/o/images%2Falien.png?alt=media&token=aff509f7-d3c4-4dfb-ab44-58c1e485cd5b",
          });
        });
      }
    );
    props.onCloseModal();
  };

  return (
    <Modal
      onCloseModal={props.onCloseModal}
      modalTitle={"Set new avatar"}
      firstButtonAction={changeAvatar}
      firstButtonContent={"Set new avatar"}
      secondButtonAction={props.onCloseModal}
      secondButtonContent={"cancel"}
    >
      <form className="user-modal__form">
        <input onChange={imageChangeHandler} type="file" name="file" />
      </form>
    </Modal>
  );
};

export default AvatarChangeModal;
