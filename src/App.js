import React from "react";
import MemoryGame from "./MemoryGame"; // Assure-toi que le chemin est correct selon où est placé le fichier
import "./App.css"; // Fichier CSS pour un style de base de l’application

function App() {
  return (
    <div className="App">
      <h1>Bienvenue dans le Jeu de Mémoire</h1>
      <MemoryGame />
    </div>
  );
}

export default App;
