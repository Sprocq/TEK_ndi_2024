import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

// Exemple de données JSON
const data = {
  lstthemes: [
    {
      id: "1",
      nomTheme: "Corps Humain",
      couleurFond: "#C41515",
      couleurTexte: "#000000",
      lstEnnemis: [
        {
          nomEnnemi: "Virus Alpha",
          niveauEnnemi: 1,
          descriptif: "Un virus dangereux pour le système immunitaire.",
          image: "https://via.placeholder.com/150",
          source: ["Source 1", "Source 2"],
        },
        {
          nomEnnemi: "Bactérie Beta",
          niveauEnnemi: 2,
          descriptif: "Une bactérie qui attaque les poumons.",
          image: "https://via.placeholder.com/150",
          source: ["Source 3", "Source 4"],
        },
        {
          nomEnnemi: "Champignon Gamma",
          niveauEnnemi: 3,
          descriptif: "Un champignon qui provoque des infections sévères.",
          image: "https://via.placeholder.com/150",
          source: ["Source 5", "Source 6"],
        },
      ],
    },
    {
      id: "2",
      nomTheme: "Océan",
      couleurFond: "#2CDBEB",
      couleurTexte: "#FFFFFF",
      lstEnnemis: [
        {
          nomEnnemi: "Méduse Mortelle",
          niveauEnnemi: 1,
          descriptif: "Une méduse très toxique.",
          image: "https://via.placeholder.com/150",
          source: ["Source 7", "Source 8"],
        },
        {
          nomEnnemi: "Requin Alpha",
          niveauEnnemi: 2,
          descriptif: "Un prédateur marin redoutable.",
          image: "https://via.placeholder.com/150",
          source: ["Source 9", "Source 10"],
        },
        {
          nomEnnemi: "Kraken Légendaire",
          niveauEnnemi: 3,
          descriptif: "Une créature mythique des profondeurs.",
          image: "https://via.placeholder.com/150",
          source: ["Source 11", "Source 12"],
        },
      ],
    },
    {
      id: "3",
      nomTheme: "Cyber",
      couleurFond: "#000000",
      couleurTexte: "#00FF00",
      lstEnnemis: [
        {
          nomEnnemi: "Malware Alpha",
          niveauEnnemi: 1,
          descriptif: "Un programme malveillant de type spyware.",
          image: "https://via.placeholder.com/150",
          source: ["Source 13", "Source 14"],
        },
        {
          nomEnnemi: "Virus Informatique Beta",
          niveauEnnemi: 2,
          descriptif: "Un virus capable de voler des données sensibles.",
          image: "https://via.placeholder.com/150",
          source: ["Source 15", "Source 16"],
        },
        {
          nomEnnemi: "AI Corrompue",
          niveauEnnemi: 3,
          descriptif: "Une intelligence artificielle devenue incontrôlable.",
          image: "https://via.placeholder.com/150",
          source: ["Source 17", "Source 18"],
        },
      ],
    },
  ],
};

const WikiPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedTheme, setSelectedTheme] = useState(data.lstthemes[0]);
  const [selectedLevel, setSelectedLevel] = useState(1);

  const handleLevelClick = (level) => {
    setSelectedLevel(level);
  };

  const handleGoToHome = () => {
    navigate('/');
  };

  const currentEnemy =
    selectedTheme.lstEnnemis.find((enemy) => enemy.niveauEnnemi === selectedLevel) || {};

  // Fonction pour déterminer le filtre CSS basé sur le thème sélectionné
  const getLogoFilter = () => {
    switch (selectedTheme.nomTheme) {
      case "Océan":
        return "invert(100%) brightness(100%)"; // Filtre pour le thème Océan
      case "Cyber":
        return "brightness(0) saturate(100%) invert(28%) sepia(100%) saturate(5000%) hue-rotate(90deg) brightness(200%)"; // Filtre pour le thème Cyber
      default:
        return "none"; // Pas de filtre pour les autres thèmes (ex. Corps Humain)
    }
  };

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Header */}
      <div
        style={{
          backgroundColor: selectedTheme.couleurFond,
          padding: "10px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", cursor: "pointer" }} onClick={handleGoToHome}>
          <img
            src="../src/images/tek.png"
            alt="Logo"
            style={{
              marginRight: "1rem",
              width: "71.57px",
              height: "50px",
              filter: getLogoFilter(), // Application du filtre dynamique
            }}
          />
          <h1 style={{ margin: 0, color: selectedTheme.couleurTexte }}>TEK Nuit De l'Info 2024</h1>
        </div>
      </div>

      <div style={{ flex: 1, display: "flex" }}>
        {/* Colonne gauche */}
        <div style={{ width: "20%", display: "flex", flexDirection: "column" }}>
          {data.lstthemes.map((theme) => (
            <button
              key={theme.id}
              onClick={() => setSelectedTheme(theme)}
              style={{
                flex: 1,
                backgroundColor: theme.couleurFond,
                color: theme.couleurTexte,
                border: "1px solid #ddd",
                cursor: "pointer",
                fontWeight: selectedTheme.id === theme.id ? "bold" : "normal",
              }}
            >
              {theme.nomTheme}
            </button>
          ))}
        </div>

        {/* Contenu principal */}
        <div style={{ flex: 1, padding: "20px", backgroundColor: "#fff" }}>
          {/* Navigation des niveaux */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              marginBottom: "20px",
              padding: "10px",
            }}
          >
            {[1, 2, 3].map((level) => (
              <button
                key={level}
                onClick={() => handleLevelClick(level)}
                style={{
                  fontWeight: selectedLevel === level ? "bold" : "normal",
                  backgroundColor: selectedLevel === level ? selectedTheme.couleurFond : "#fff",
                  color: selectedLevel === level ? selectedTheme.couleurTexte : "#000",
                  border: "1px solid #ddd",
                  borderRadius: "5px",
                  cursor: "pointer",
                  flex: 1,
                  margin: "0 5px",
                }}
              >
                Niveau {level}
              </button>
            ))}
          </div>

          {/* Affichage des informations de l'ennemi */}
          <div style={{ display: "flex" }}>
            <div style={{ flex: 1 }}>
              {currentEnemy.image && (
                <img
                  src={currentEnemy.image}
                  alt={currentEnemy.nomEnnemi}
                  style={{ width: "100%" }}
                />
              )}
            </div>
            <div style={{ flex: 1, paddingLeft: "20px", textAlign: "left" }}>
              <h2>Nom : {currentEnemy.nomEnnemi || "Aucun ennemi"}</h2>
              <p>Descriptif : {currentEnemy.descriptif || "Pas de description"}</p>
              <p>
                Sources :{" "}
                {currentEnemy.source
                  ? currentEnemy.source.join(", ")
                  : "Pas de sources disponibles"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WikiPage;