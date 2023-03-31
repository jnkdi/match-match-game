import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AboutGame from "./components/AboutGame/AboutGame";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<AboutGame />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
