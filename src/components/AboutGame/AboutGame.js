import { Fragment } from "react";
import "./AboutGame.scss";
import Card from "../UI/Card";
import RegisterModal from "../RegisterModal/RegisterModal";
import Rules from "./Rules";
import pic01 from "../../assets/about/01.jpg";
import pic02 from "../../assets/about/02.jpg";
import pic03 from "../../assets/about/03.jpg";

const AboutGame = (props) => {
  const rules = [
    {
      id: 1,
      content: "Register new player in game",
      src: pic01,
    },
    {
      id: 2,
      content: "Configure your game settings",
      src: pic02,
    },
    {
      id: 3,
      content:
        "Start you new game! Remember card positions and match it before times up.",
      src: pic03,
    },
  ];

  return (
    <Fragment>
      {props.openRegister && (
        <RegisterModal
          onCloseModal={props.onCloseRegister}
          onRegister={props.onRegister}
        />
      )}
      <Card className="about-game">
        <h2 className="about-game__title">How to play?</h2>
        <Rules rules={rules}></Rules>
      </Card>
    </Fragment>
  );
};

export default AboutGame;
