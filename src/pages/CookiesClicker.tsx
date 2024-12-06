import React, { useState, useEffect } from "react";
import cookies from "../data/cookies.json";
import "../CookiesClicker.css";

const idTheme: number = 0;

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
  // récuperer l'evenement
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

let theme = cookies.lstThemes[idTheme];

let nomIndex = theme.lstNomBonus.findIndex(
  (evenement) => evenement.idBonus === partieObject.lstEvenement[0].idEvenement
);
let nomBouton = [theme.lstNomBonus[nomIndex].nom];

const CookiesClicker: React.FC = () => {
  const [count, setCount] = useState<number>(0);

  const evenements = cookies.lstEvenement;

  if (count >= evenements[partieObject.lstEvenement.length - 1].prix) {
    partieObject.lstEvenement.push({
      idEvenement: evenements[partieObject.lstEvenement.length].idEvenement,
      niveau: 1,
      prix: evenements[partieObject.lstEvenement.length].prix,
    });
    nomIndex = theme.lstNomBonus.findIndex(
      (evenement) =>
        evenement.idBonus ===
        evenements[partieObject.lstEvenement.length].idEvenement
    );
    nomBouton.push(theme.lstNomBonus[nomIndex].nom);
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

    // Nettoyage de l'intervalle lorsque le composant est démonté
    return () => clearInterval(interval);
  }, []);

  partieObject.score = count;

  return (
    <div className="cookies-clicker">
      <div className="header">
        <h1>Cookies Clicker ({theme.nomTheme})</h1>
      </div>
      <div className="cookie-info">
        <div className="stats">
          <label>
            {theme.cookie} : <span></span>
            <input type="text" value={count} readOnly />
          </label>
          <p>
            Génération de {theme.cookie} par click :{" "}
            <b>{partieObject.clickValue}</b>
          </p>
          <p>
            Génération de {theme.cookie} par seconde : <b>{partieObject.cps}</b>
          </p>
        </div>
        <div className="button-container">
          {/* <button onClick={handleClick}>Augmenter</button> */}
          <img
            src={"../src/img/" + theme.image}
            alt="cookie"
            className="cookie"
            onClick={handleClick}
          />
        </div>
      </div>
      <div className="improvements">
        <h2>Améliorations</h2>
        {evenementsAchetables.map((evenement) => (
          <div key={evenement[0].idEvenement}>
            <div className="div-name">
              <h3>{nomBouton[evenementsAchetables.indexOf(evenement)]}</h3>
            </div>
            <div className="amelioration">
              <p>
                Description : <b>{evenement[0].descriptif}</b>
              </p>
              <p>
                Niveau :{" "}
                <b>
                  {
                    partieObject.lstEvenement[
                      partieObject.lstEvenement.findIndex(
                        (evenement2) =>
                          evenement2.idEvenement === evenement[0].idEvenement
                      )
                    ].niveau
                  }
                </b>
              </p>
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
                            evenementReduc.idEvenement ===
                            evenement[0].idEvenement
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
                        production[1] = evenement[0].temps
                          ? evenement[0].temps
                          : 0;
                        break;
                    }
                  }
                }}
              >
                {partieObject.lstEvenement[
                  partieObject.lstEvenement.findIndex(
                    (evenement2) =>
                      evenement2.idEvenement === evenement[0].idEvenement
                  )
                ].prix +
                  " " +
                  theme.cookie}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CookiesClicker;
