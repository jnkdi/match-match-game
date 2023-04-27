import { Link } from "react-router-dom";
import Nav from "./Nav";
import Button from "../../UI/Button";
import "./Header.scss";
import about from "../../../assets/header/about-icon.svg";
import best from "../../../assets/header/best-score-icon.svg";
import settings from "../../../assets/header/settings-icon.svg";

const Header = (props) => {
  const navItems = [
    {
      id: Math.random().toString(),
      src: about,
      title: "About Game",
      href: "/about-game",
    },
    {
      id: Math.random().toString(),
      src: best,
      title: "Best Score",
      href: "/best-score",
    },
    {
      id: Math.random().toString(),
      src: settings,
      title: "Game Settings",
      href: "/settings",
    },
  ];

  return (
    <header className="header">
      <div className="header__logo">
        <p>match</p>
        <p>match</p>
      </div>
      <Nav navItems={navItems} stopGame={props.onStopGame} />
      {!props.isRegistered && (
        <Button onClick={props.onOpenRegister} className="header__button">
          register new player
        </Button>
      )}
      {props.isRegistered && !props.isGameOn && (
        <div className="header__right">
          <Button onClick={props.onStartGame} className="header__button">
            <Link to="/game">start game</Link>
          </Button>
          <img
            onClick={props.onOpenAvatarChange}
            className="header__avatar"
            alt="avatar"
            src={
              props.user.image ||
              "https://firebasestorage.googleapis.com/v0/b/match-match-game-9501e.appspot.com/o/images%2Falien.png?alt=media&token=aff509f7-d3c4-4dfb-ab44-58c1e485cd5b"
            }
          />
        </div>
      )}
      {props.isRegistered && props.isGameOn && (
        <div className="header__right">
          <Button onClick={props.onStopGame} className="header__button">
            stop game
          </Button>
          <img
            className="header__avatar"
            alt="avatar"
            src={
              props.user.image ||
              "https://firebasestorage.googleapis.com/v0/b/match-match-game-9501e.appspot.com/o/images%2Falien.png?alt=media&token=aff509f7-d3c4-4dfb-ab44-58c1e485cd5b"
            }
          />
        </div>
      )}
    </header>
  );
};

export default Header;
