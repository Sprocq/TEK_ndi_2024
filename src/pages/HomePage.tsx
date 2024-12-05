import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>Page Principale</h1>
      <button
        onClick={() => alert('Jeu lancé !')}
        style={{ marginRight: '1rem' }}
      >
        Lancer le Jeu
      </button>
      <button onClick={() => navigate('/wiki')}>Aller au Wiki</button>
    </div>
  );
};

export default HomePage;