import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import WikiPage from "./pages/WikiPage";
import CookiesClicker from "./pages/CookiesClicker";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/wiki" element={<WikiPage />} />
      <Route path="/CookiesClicker" element={<CookiesClicker />} />
    </Routes>
  );
};

export default App;
