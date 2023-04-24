import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AboutGame from "./components/AboutGame/AboutGame";
import Game from "./components/Game/Game";
import BestScore from "./components/BestScore/BestScore";
import Header from "./components/Layout/Header/Header";
import Settings from "./components/Settings/Setings";

function App() {
  const [isRegisterShown, setIsRegisterShown] = useState(false);
  const [isRegistered, setIsRegistered] = useState(true);
  const [isGameOn, setIsGameOn] = useState(false);
  const [cardsSet, setCardsSet] = useState("retro");
  const [cardsAmount, setCardsAmount] = useState(2);

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
    console.log('game Started');
    setIsGameOn(true);
  };

  const stopGameHandler = () => {
    setIsGameOn(false);
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
            <Game stopGame={stopGameHandler} startGame={startGameHandler} cardsSet={cardsSet} cardsAmount={cardsAmount}/>
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
        <Route path="/best-score" element={<BestScore />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
