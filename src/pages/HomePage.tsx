import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../HomePage.css';
import logo from '../images/tek.png'; // Ajout du logo

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [theme, setTheme] = useState<'corps' | 'ocean' | 'cyber'>('ocean');
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);
  const [Jeu_background, setJeu_background] = useState('../src/images/Jeu_Ocean.jpg');

  // Gérer le changement de thème
  const handleThemeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTheme(e.target.value as 'corps' | 'ocean' | 'cyber');
    handleImageChange(e.target.value as 'corps' | 'ocean' | 'cyber');
  };

  const handleImageChange = (p0: string) => {
    if(p0 == 'corps'){
      setJeu_background('../src/images/Jeu_Corps.png');
    }
    if(p0 == 'ocean'){
      setJeu_background('../src/images/Jeu_Ocean.jpg');
    }
    if(p0 == 'cyber'){
      setJeu_background('../src/images/Jeu_Cyber.jpg');
    }
  }

  const handleGoToWiki = () => {
    navigate('/wiki');
  };

  const handleGoToCookiesClicker = () => {
    navigate('/CookiesClicker');
  };

  return (
    <div className={`homepage ${theme}`}>
      {/* Header */}
      <header className="header">
        <img src={logo} alt="Logo TEK" className="logo" />
        <h1>TEK Nuit De l'Info 2024</h1>
        <select value={theme} onChange={handleThemeChange} className="theme-select">
          <option value="corps">Corps Humain</option>
          <option value="ocean">Océan</option>
          <option value="cyber">Cyber</option>
        </select>
      </header>

      {/* Conteneur des zones */}
      <div className="main-content">
        {/* Section Cookieclicker */}
        <div
          className={`section ${hoveredSection === 'cookieclicker' ? 'hovered' : ''}`}
          onMouseEnter={() => setHoveredSection('cookieclicker')}
          onMouseLeave={() => setHoveredSection(null)}
          style={{
            backgroundImage: `url(../src/images/logo_cookiecliker.png)`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            width: '100%',
            height: '100%'
          }}
        >
          <h2>Cookieclicker</h2>
          {hoveredSection === 'cookieclicker' && (
            <button
              className="action-button"
              onClick={handleGoToCookiesClicker}
            >
              Démarrer Cookieclicker
            </button>
          )}
        </div>

        {/* Section Jeu */}
        <div
          className={`section ${hoveredSection === 'jeu' ? 'hovered' : ''}`}
          onMouseEnter={() => setHoveredSection('jeu')}
          onMouseLeave={() => setHoveredSection(null)}
          style={{
            backgroundImage: `url(${Jeu_background})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            width: '100%',
            height: '100%'
          }}
        >
          <h2>Jeu</h2>
          {hoveredSection === 'jeu' && (
            <button
              className="action-button"
              onClick={() => alert('Jeu lancé !')}
            >
              Lancer le Jeu
            </button>
          )}
        </div>

        {/* Section Wiki */}
        <div
          className={`section ${hoveredSection === 'wiki' ? 'hovered' : ''}`}
          onMouseEnter={() => setHoveredSection('wiki')}
          onMouseLeave={() => setHoveredSection(null)}
          style={{
            backgroundImage: `url(../src/images/wiki.jpg)`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            width: '100%',
            height: '100%'
          }}
        >
          <h2>Wiki</h2>
          {hoveredSection === 'wiki' && (
            <button className="action-button" onClick={handleGoToWiki}>Explorer le Wiki</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;