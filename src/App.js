import React, { useState } from "react";
import { db } from "./firebase";
import { doc } from "firebase/firestore";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AboutGame from "./components/AboutGame/AboutGame";
import RegisterModal from "./components/RegisterModal/RegisterModal";
import Game from "./components/Game/Game";
import BestScore from "./components/BestScore/BestScore";
import Header from "./components/Layout/Header/Header";
import Settings from "./components/Settings/Setings";

function App() {
  const userKey = JSON.parse(window.localStorage.getItem("user"));
  const [isStopwatchRunning, setIsStopwatchRunning] = useState(false);
  const [isRegisterShown, setIsRegisterShown] = useState(false);
  const [isRegistered, setIsRegistered] = useState(userKey);
  const [isGameOn, setIsGameOn] = useState(false);
  const [cardsSet, setCardsSet] = useState("retro");
  const [cardsAmount, setCardsAmount] = useState(16);

  const userRef = doc(db, "users", `${userKey}`);

  const showRegisterHandler = () => {
    setIsRegisterShown(true);
  };

  const hideRegisterHandler = () => {
    setIsRegisterShown(false);
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
        onCloseRegister={hideRegisterHandler}
        isRegistered={isRegistered}
        onStartGame={startGameHandler}
        onStopGame={stopGameHandler}
        isGameOn={isGameOn}
      />
      {isRegisterShown && (
        <RegisterModal
          onCloseModal={hideRegisterHandler}
          onRegister={registeredHandler}
        />
      )}
      <Routes>
        <Route
          index
          path="/about-game"
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
        <Route path="/best-score" element={<BestScore userKey={userKey} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
