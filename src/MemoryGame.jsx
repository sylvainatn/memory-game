import React, { useState, useEffect } from "react";
import "./MemoryGame.css"; // Utilisez un fichier CSS pour le style de base

// Exemple de symboles ou d’images pour les paires de cartes
const cardSymbols = ["🍎", "🍌", "🍇", "🍉", "🍍", "🍒"];

function shuffleArray(array) {
   return array
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);
}

const MemoryGame = () => {
   // Mélange les cartes et double les symboles pour créer des paires
   const [cards, setCards] = useState(() =>
      shuffleArray([...cardSymbols, ...cardSymbols]).map((symbol, index) => ({
         id: index,
         symbol,
         isFlipped: false,
         isMatched: false,
      }))
   );
   const [flippedCards, setFlippedCards] = useState([]);
   const [matchedPairs, setMatchedPairs] = useState(0);

   // Gère le retournement de cartes
   const handleFlip = (index) => {
      // Empêche le clic si plus de deux cartes sont retournées ou si la carte est déjà retournée
      if (flippedCards.length === 2 || cards[index].isFlipped) return;

      const newCards = [...cards];
      newCards[index].isFlipped = true;
      setCards(newCards);
      setFlippedCards((prev) => [...prev, index]);
   };

   // Vérifie si les cartes forment une paire
   useEffect(() => {
      if (flippedCards.length === 2) {
         const [firstIndex, secondIndex] = flippedCards;
         const firstCard = cards[firstIndex];
         const secondCard = cards[secondIndex];

         if (firstCard.symbol === secondCard.symbol) {
            // Marque les cartes comme trouvées
            setCards((prevCards) =>
               prevCards.map((card, idx) =>
                  idx === firstIndex || idx === secondIndex
                     ? { ...card, isMatched: true }
                     : card
               )
            );
            setMatchedPairs((prev) => prev + 1);
         } else {
            // Retourne les cartes si elles ne sont pas identiques après un délai
            setTimeout(() => {
               setCards((prevCards) =>
                  prevCards.map((card, idx) =>
                     idx === firstIndex || idx === secondIndex
                        ? { ...card, isFlipped: false }
                        : card
                  )
               );
            }, 1000);
         }
         setFlippedCards([]);
      }
   }, [flippedCards, cards]);

   // Réinitialise le jeu
   const resetGame = () => {
      setCards(
         shuffleArray([...cardSymbols, ...cardSymbols]).map((symbol, index) => ({
            id: index,
            symbol,
            isFlipped: false,
            isMatched: false,
         }))
      );
      setMatchedPairs(0);
      setFlippedCards([]);
   };

   return (
      <div className="memory-game">
         <h1>Jeu de Mémoire</h1>
         <p>Paires trouvées : {matchedPairs} / {cardSymbols.length}</p>
         <button onClick={resetGame}>Réinitialiser le jeu</button>

         <div className="grid">
            {cards.map((card, index) => (
               <div
                  key={card.id}
                  className={`card ${card.isFlipped ? "flipped" : ""} ${card.isMatched ? "matched" : ""
                     }`}
                  onClick={() => handleFlip(index)}
               >
                  <div className="card-front">{card.symbol}</div>
                  <div className="card-back">❓</div>
               </div>
            ))}
         </div>

         {matchedPairs === cardSymbols.length && (
            <p>🎉 Félicitations ! Vous avez trouvé toutes les paires ! 🎉</p>
         )}
      </div>
   );
};

export default MemoryGame;
