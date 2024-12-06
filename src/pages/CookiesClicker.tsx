import React, { useState, useEffect } from "react";
import cookies from "../data/cookies.json";

let evenementsAchetables = [];

const CookiesClicker: React.FC = () => {
  const [count, setCount] = useState<number>(0);

  const idTheme: number = 0;
  const theme = cookies.lstThemes[idTheme];

  const evenements = cookies.lstEvenement;

  if (evenementsAchetables.length == 0) {
    evenementsAchetables.push(evenements[0]);
  } else {
    if (count >= evenements[evenementsAchetables.length - 1].prix) {
      evenementsAchetables.push(evenements[evenementsAchetables.length]);
    }
  }

  const handleClick = (): void => {
    setCount(count + 1);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevCount) => prevCount + 1);
    }, 1000);

    // Nettoyage de l'intervalle lorsque le composant est démonté
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <div>
        <h1>Cookies Clicker</h1>
        <div>
          <label>
            {theme.cookie} :
            <input type="text" value={count} readOnly />
          </label>
        </div>
        <button onClick={handleClick}>Augmenter</button>
      </div>
      <div>
        <h2>Améliorations</h2>
        {evenementsAchetables.map((evenement) => (
          <button
            onClick={() => {
              if (count >= evenement.prix) {
                setCount(count - evenement.prix);
              }
            }}
          >
            {evenement.descriptif}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CookiesClicker;
