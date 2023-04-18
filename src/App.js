import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AboutGame from "./components/AboutGame/AboutGame";
import Game from "./components/Game/Game";
import BestScore from "./components/BestScore/BestScore";
import Header from "./components/Layout/Header/Header";
import Settings from "./components/Settings/Setings";

function App() {
  const [isRegisterShown, setIsRegisterShown] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [isGameOn, setIsGameOn] = useState(false);
  const [isStopwatchRunning, setIsStopwatchRunning] = useState(false);

  const showRegisterHandler = () => {
    setIsRegisterShown(true);
  };

  const hideRegisterHandler = () => {
    setIsRegisterShown(false);
  };

  const registeredHandler = () => {
    setIsRegistered(true)
  }

  const startGameHandler = () => {
    setIsGameOn(true);
  }

  const stopGameHandler = () => {
    setIsStopwatchRunning(false);
    setIsGameOn(false);
  }

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
        <Route index path='/about-game' element={<AboutGame onRegister={registeredHandler} openRegister={isRegisterShown} onCloseRegister={hideRegisterHandler} />} />
        <Route path="/game" element={<Game isStopwatchRunning={isStopwatchRunning} setIsStopwatchRunning={setIsStopwatchRunning}/>} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/best-score" element={<BestScore />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
