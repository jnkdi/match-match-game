import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AboutGame from "./components/AboutGame/AboutGame";
import BestScore from "./components/BestScore/BestScore";
import Header from "./components/Layout/Header/Header";
import Settings from "./components/Settings/Setings";

function App() {
  return (
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route index element={<AboutGame />} />
        <Route path='/settings' element={<Settings/>}/>
        <Route path='/best-score' element={<BestScore/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
