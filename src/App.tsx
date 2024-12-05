import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import WikiPage from './pages/WikiPage';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/wiki" element={<WikiPage />} />
    </Routes>
  );
};

export default App;