import "./AboutGame.scss";
import Card from "../UI/Card";
import Rules from "./Rules";
import pic01 from "../../assets/about/01.jpg";
import pic02 from "../../assets/about/02.jpg";
import pic03 from "../../assets/about/03.jpg";

const AboutGame = (props) => {
  const rules = [
    {
      id: 1,
      content: "Register new player in game by entering a name and uploading a photo (optional)",
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
        "Start you new game! Remember card positions and match it as quickly as possible with a minimum number of wrong answers",
      src: pic03,
    },
  ];

  return (
    <Card className="about-game">
      <h2 className="about-game__title">How to play?</h2>
      <Rules rules={rules}></Rules>
    </Card>
  );
};

export default AboutGame;
