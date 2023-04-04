import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AboutGame from "./components/AboutGame/AboutGame";
import BestScore from "./components/BestScore/BestScore";
import Header from "./components/Layout/Header/Header";
import Settings from "./components/Settings/Setings";

function App() {
  const [isRegisterShown, setIsRegisterShown] = useState(false);

  const showRegisterHandler = () => {
    setIsRegisterShown(true);
  };

  const hideRegisterHandler = () => {
    setIsRegisterShown(false);
  };

  return (
    <BrowserRouter>
      <Header
        onOpenRegister={showRegisterHandler}
        onCloseRegister={hideRegisterHandler}
      />
      <Routes>
        <Route index path='/about-game' element={<AboutGame openRegister={isRegisterShown} onCloseRegister={hideRegisterHandler} />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/best-score" element={<BestScore />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
