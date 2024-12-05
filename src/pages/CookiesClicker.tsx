import React, { useState } from "react";
import cookies from "../data/cookies.json";

const CookiesClicker: React.FC = () => {
  const [count, setCount] = useState<number>(0); // État typé comme un nombre

  const handleClick = (): void => {
    setCount(count + 1); // Augmente la valeur de l'état
  };

  return (
    <div>
      <h1>Cookies Clicker</h1>
      <div>
        <label>
          Nombre de cookies :
          <input
            type="text"
            value={count}
            readOnly // Empêche la modification directe par l'utilisateur
          />
        </label>
      </div>
      <button onClick={handleClick}>Augmenter</button>
    </div>
  );
};

export default CookiesClicker;
