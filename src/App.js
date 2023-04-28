import React, { useState, useEffect } from "react";
import { db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AboutGame from "./components/AboutGame/AboutGame";
import RegisterModal from "./components/RegisterModal/RegisterModal";
import AvatarChangeModal from "./components/Layout/AvatarChangeModal";
import Game from "./components/Game/Game";
import BestScore from "./components/BestScore/BestScore";
import Header from "./components/Layout/Header/Header";
import Settings from "./components/Settings/Setings";

function App() {
  const userKey = JSON.parse(window.localStorage.getItem("user"));
  const [user, setUser] = useState({});
  const [isAvatarChangeShown, setIsAvatarChangeShown] = useState(false);
  const [isStopwatchRunning, setIsStopwatchRunning] = useState(false);
  const [isRegisterShown, setIsRegisterShown] = useState(false);
  const [isRegistered, setIsRegistered] = useState(userKey);
  const [isGameOn, setIsGameOn] = useState(false);
  const [cardsSet, setCardsSet] = useState("retro");
  const [cardsAmount, setCardsAmount] = useState(16);
  const [avatarUrl, setAvatarUrl] = useState("");

  const userRef = doc(db, "users", `${userKey}`);

  useEffect(() => {
    const getUser = async () => {
      const user = await getDoc(userRef).then((user) => ({
        ...user.data(),
      }));
      setUser(user);
    };
    getUser();
  }, [userKey, avatarUrl]);

  const showRegisterHandler = () => {
    setIsRegisterShown(true);
  };

  const hideRegisterHandler = () => {
    setIsRegisterShown(false);
  };

  const showAvatarChangeHandler = () => {
    setIsAvatarChangeShown(true);
  };

  const hideAvatarChangeHandler = () => {
    setIsAvatarChangeShown(false);
  };

  const registeredHandler = () => {
    setIsRegistered(true);
  };

  const startGameHandler = () => {
    setIsGameOn(true);
    setIsStopwatchRunning(false);
  };

  const stopGameHandler = () => {
    setIsGameOn(false);
    setIsStopwatchRunning(false);
  };

  return (
    <BrowserRouter>
      <Header
        onOpenRegister={showRegisterHandler}
        isRegistered={isRegistered}
        onOpenAvatarChange={showAvatarChangeHandler}
        onStartGame={startGameHandler}
        onStopGame={stopGameHandler}
        isGameOn={isGameOn}
        userKey={userKey}
        userRef={userRef}
        user={user}
      />
      {isRegisterShown && (
        <RegisterModal
          onCloseModal={hideRegisterHandler}
          onRegister={registeredHandler}
          setAvatarUrl={setAvatarUrl}
        />
      )}
      {isAvatarChangeShown && (
        <AvatarChangeModal
          onCloseModal={hideAvatarChangeHandler}
          onRegister={registeredHandler}
          setAvatarUrl={setAvatarUrl}
          userKey={userKey}
          userRef={userRef}
        />
      )}
      <Routes>
        <Route
          index
          path="/"
          element={
            <AboutGame
              onRegister={registeredHandler}
              openRegister={isRegisterShown}
              onCloseRegister={hideRegisterHandler}
            />
          }
        />
        <Route
          path="/game"
          element={
            <Game
              stopGame={stopGameHandler}
              startGame={startGameHandler}
              cardsSet={cardsSet}
              cardsAmount={cardsAmount}
              isGameOn={isGameOn}
              isStopwatchRunning={isStopwatchRunning}
              setIsStopwatchRunning={setIsStopwatchRunning}
              userKey={userKey}
              userRef={userRef}
            />
          }
        />
        <Route
          path="/settings"
          element={
            <Settings
              setCardsSet={setCardsSet}
              setCardsAmount={setCardsAmount}
              cardsSet={cardsSet}
              cardsAmount={cardsAmount}
            />
          }
        />
        <Route
          path="/best-score"
          element={<BestScore userKey={userKey} avatarUrl={avatarUrl} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
