import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

// Importer les données JSON depuis le fichier local
import wikiJson from "../data/wiki.json";

const WikiPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedTheme, setSelectedTheme] = useState(null);
  const [selectedLevel, setSelectedLevel] = useState(1);

  // Charger les données du fichier JSON dans l'état
  useEffect(() => {
    setSelectedTheme(wikiJson.lstthemes[0]); // Charger le premier thème par défaut
  }, []);

  const handleLevelClick = (level) => {
    setSelectedLevel(level);
  };

  const handleGoToHome = () => {
    navigate('/');
  };

  // Fonction pour déterminer le filtre CSS du logo en fonction du thème
  const getLogoFilter = () => {
    if (!selectedTheme) return "none";
    switch (selectedTheme.nomTheme) {
      case "Océan":
        return "invert(100%) brightness(100%)";
      case "Cyber":
        return "brightness(0) saturate(100%) invert(28%) sepia(100%) saturate(5000%) hue-rotate(90deg) brightness(200%)";
      default:
        return "none";
    }
  };

  // Fonction pour récupérer le champ parallèle en fonction du thème et de l'ennemi
  const getParalleleField = (enemy) => {
    if (!selectedTheme) return "";
    if (selectedTheme.nomTheme === "Océan") {
      return enemy.parallele || "Pas de parallèle disponible";
    } else if (selectedTheme.nomTheme === "Corps Humain" || selectedTheme.nomTheme === "Cyber") {
      return enemy.paralleleOcean || "Pas de parallèle disponible";
    }
    return "";
  };

  // Trouver l'ennemi correspondant au niveau sélectionné
  const currentEnemy =
    selectedTheme?.lstEnnemis.find((enemy) => enemy.niveauEnnemi === selectedLevel) || {};

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Header */}
      <div
        style={{
          backgroundColor: selectedTheme?.couleur || "#fff",
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
          <h1 style={{ margin: 0, color: "#000" }}>TEK Nuit De l'Info 2024</h1>
        </div>
      </div>

      <div style={{ flex: 1, display: "flex" }}>
        {/* Colonne gauche */}
        <div style={{ width: "20%", display: "flex", flexDirection: "column" }}>
          {wikiJson.lstthemes.map((theme) => (
            <button
              key={theme.id}
              onClick={() => setSelectedTheme(theme)}
              style={{
                flex: 1,
                backgroundColor: theme.couleur,
                color: "#000",
                border: "1px solid #ddd",
                cursor: "pointer",
                fontWeight: selectedTheme?.id === theme.id ? "bold" : "normal",
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
                  backgroundColor: selectedLevel === level ? selectedTheme?.couleur : "#fff",
                  color: selectedLevel === level ? "#000" : "#000",
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
                Parallèle :{" "}
                <span dangerouslySetInnerHTML={{ __html: getParalleleField(currentEnemy) }} />
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WikiPage;