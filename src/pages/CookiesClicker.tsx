import React from "react";

const CookiesClicker: React.FC = () => {
  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h1>Cookies Clicker</h1>
      <button
        onClick={() => alert("Jeu lancé !")}
        style={{ marginRight: "1rem" }}
      >
        Lancer le Jeu
      </button>
    </div>
  );
};

export default CookiesClicker;
