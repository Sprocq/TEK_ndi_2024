import React, { useState, useEffect } from "react";
import cookies from "../data/cookies.json";
import "../CookiesClicker.css";
import logo from '../images/tek.png'; // Ajout du logo
import { useNavigate } from "react-router-dom";  // Assurez-vous que `useNavigate` est importé correctement

const CookiesClicker: React.FC = () => {
  const [theme, setTheme] = useState<'corps' | 'ocean' | 'cyber'>('ocean');
  const [idTheme, setIdTheme] = useState<number>(0);  // Ajoute un état pour idTheme
  const navigate = useNavigate(); // Déplacez l'appel à useNavigate ici, dans le composant

  // Fonction pour aller à la page d'accueil
  const handleGoToHome = () => {
    navigate('/'); // Redirige vers la page d'accueil
  };

  // Gérer le changement de thème
  const handleThemeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedTheme = e.target.value as 'corps' | 'ocean' | 'cyber';
    setTheme(selectedTheme);

    // Mettre à jour l'idTheme en fonction du thème choisi
    const themeIndex = cookies.lstThemes.findIndex((t) => t.nomTheme === selectedTheme);
    setIdTheme(themeIndex); // Mettre à jour l'idTheme avec l'index du thème choisi
  };

  const partieObject = {
    idTheme: idTheme,
    score: 0,
    lstEvenement: [
      {
        idEvenement: 0,
        niveau: 0,
        prix: 0,
      },
    ],
    clickValue: 1,
    cps: 0,
  };

  // Initialisation première evenement
  partieObject.lstEvenement[0].idEvenement = cookies.lstEvenement[0].idEvenement;
  partieObject.lstEvenement[0].niveau = 1;
  partieObject.lstEvenement[0].prix = cookies.lstEvenement[0].prix;

  function updateCps(idEvenement: number) {
    let cps = partieObject.cps;
    const evenement = cookies.lstEvenement.find(
      (evenement) => evenement.idEvenement === idEvenement
    );
    if (evenement) {
      if (evenement.estBonus) {
        cps += evenement.value;
      } else {
        cps -= evenement.value;
      }
      partieObject.cps = cps;
    }
  }

  function updateDegats(idEvenement: number) {
    let clickValue = partieObject.clickValue;
    const evenement = cookies.lstEvenement.find(
      (evenement) => evenement.idEvenement === idEvenement
    );
    if (evenement) {
      if (evenement.estBonus) {
        clickValue = clickValue * evenement.value;
      } else {
        clickValue = clickValue / evenement.value;
      }
      partieObject.clickValue = clickValue;
    }
  }

  function updatePrix(idEvenement: number) {
    const evenement = cookies.lstEvenement.find(
      (evenement) => evenement.idEvenement === idEvenement
    );
    if (evenement) {
      const evenementIndex = partieObject.lstEvenement.findIndex(
        (evenement2) => evenement2.idEvenement === evenement.idEvenement
      );
      partieObject.lstEvenement[evenementIndex].prix =
        partieObject.lstEvenement[evenementIndex].prix * evenement.multPrix;
    }
  }

  const typeEvenement = ["Autoclick", "Degats", "Reduction", "Production"];

  let production = [1, 0];

  // Utilise idTheme pour accéder au thème choisi
  let themeData = cookies.lstThemes[idTheme];

  let nomIndex = themeData.lstNomBonus.findIndex(
    (evenement) => evenement.idBonus === partieObject.lstEvenement[0].idEvenement
  );
  let nomBouton = [themeData.lstNomBonus[nomIndex].nom];

  const [count, setCount] = useState<number>(0);

  const evenements = cookies.lstEvenement;

  if (count >= evenements[partieObject.lstEvenement.length - 1].prix) {
    partieObject.lstEvenement.push({
      idEvenement: evenements[partieObject.lstEvenement.length].idEvenement,
      niveau: 1,
      prix: evenements[partieObject.lstEvenement.length].prix,
    });
    nomIndex = themeData.lstNomBonus.findIndex(
      (evenement) =>
        evenement.idBonus ===
        partieObject.lstEvenement[partieObject.lstEvenement.length].idEvenement
    );
    nomBouton.push(themeData.lstNomBonus[nomIndex].nom);
  }

  let evenementsAchetables = [];

  for (let i = 0; i < partieObject.lstEvenement.length; i++) {
    evenementsAchetables.push(
      cookies.lstEvenement.filter(
        (evenement) =>
          evenement.idEvenement === partieObject.lstEvenement[i].idEvenement
      )
    );
  }

  const handleClick = (): void => {
    setCount(count + partieObject.clickValue);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevCount) => prevCount + partieObject.cps * production[0]);
      if (production[1] > 0) {
        production[1]--;
        if (production[1] === 0) {
          production[0] = 1;
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  partieObject.score = count;

  return (
    <div className="cookiesClicker">
      {/* Header */}
      <header className={`header ${theme}`}>
        <img src={logo} alt="Logo TEK" className="logo" onClick={handleGoToHome} />
        <h1 onClick={handleGoToHome}>TEK Nuit De l'Info 2024</h1>
        <select value={theme} onChange={handleThemeChange} className="theme-select">
          <option value="corps">Corps Humain</option>
          <option value="ocean">Océan</option>
          <option value="cyber">Cyber</option>
        </select>
      </header>
      <div className="cookies-clicker">
        <div className="header">
          <h1>Cookies Clicker ({themeData.nomTheme})</h1>
        </div>
        <div className="cookie-info">
          <div className="stats">
            <label>
              {themeData.cookie} : <span></span>
              <input type="text" value={count} readOnly />
            </label>
            <p>
              Génération de {themeData.cookie} par click :{" "}
              <b>{partieObject.clickValue}</b>
            </p>
            <p>
              Génération de {themeData.cookie} par seconde : <b>{partieObject.cps}</b>
            </p>
          </div>
          <div className="button-container">
            <img
              src={"../src/img/" + themeData.image}
              alt="cookie"
              className="cookie"
              onClick={handleClick}
            />
          </div>
        </div>
        <div className="improvements">
          <h2>Améliorations</h2>
          {evenementsAchetables.map((evenement) => (
            <button
              className="button-improvement"
              onClick={() => {
                const evenementIndex = partieObject.lstEvenement.findIndex(
                  (evenement2) =>
                    evenement2.idEvenement === evenement[0].idEvenement
                );
                if (count >= partieObject.lstEvenement[evenementIndex].prix) {
                  partieObject.lstEvenement[evenementIndex].niveau++;
                  setCount(
                    count - partieObject.lstEvenement[evenementIndex].prix
                  );
                  updatePrix(evenement[0].idEvenement);
                  switch (evenement[0].type) {
                    case typeEvenement[0]:
                      updateCps(evenement[0].idEvenement);
                      break;
                    case typeEvenement[1]:
                      updateDegats(evenement[0].idEvenement);
                      break;
                    case typeEvenement[2]:
                      const evenementReduc = cookies.lstEvenement.find(
                        (evenementReduc) =>
                          evenementReduc.idEvenement === evenement[0].idEvenement
                      );
                      if (evenementReduc) {
                        let soustraire = Math.round(
                          count * (evenementReduc.value / 100)
                        );
                        setCount((prevCount) => prevCount - soustraire);
                      }
                      break;
                    case typeEvenement[3]:
                      production[0] = evenement[0].value;
                      production[1] = evenement[0].temps ? evenement[0].temps : 0;
                      break;
                  }
                }
              }}
            >
              {nomBouton[evenementsAchetables.indexOf(evenement)]}
            </button>
          ))} 
        </div>
      </div>
    </div>
  );
};

export default CookiesClicker;
