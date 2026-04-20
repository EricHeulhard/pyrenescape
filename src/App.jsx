import { useState } from "react";
import puzzles from "./data/puzzles";
import PuzzleRenderer from "./components/PuzzleRenderer";
import PuzzleHistoryItem from "./components/PuzzleHistoryItem";
import GameComplete from "./components/GameComplete";
import pyrenees from "./assets/pyrenees.jpg";

export default function App() {

  const [currentIndex, setCurrentIndex] = useState(0);
  const [completed, setCompleted] = useState([]);

  const currentPuzzle = puzzles[currentIndex];

  const isGameFinished = Object.keys(completed).length === puzzles.length;

  function handleSuccess(userAnswer) {
    const solvedPuzzle = currentPuzzle;

    setCompleted((prev) => [
      ...prev,
      {
        id: solvedPuzzle.id,
        type: solvedPuzzle.type,
        answer: userAnswer
      }
    ]);

    setCurrentIndex((prev) => prev + 1);
  }

  return (

    
    
    <div style={{ padding: "40px" }}>
    <div style={{ position: "relative" }}>
      <img
        src={pyrenees}
        alt="Pyrénées"
        style={{
          width: "100%",
          height: "250px",
          objectFit: "cover",
          borderRadius: "12px",
          marginBottom: "20px",
        }}
      />

      <h1
        style={{
          position: "absolute",
          bottom: "20px",
          left: "20px",
          color: "white",
          fontSize: "32px",
          textShadow: "0 2px 10px rgba(0,0,0,0.7)",
        }}
      >
        🏔️ Pyr&cacpe
      </h1>
    </div>

      {/* HISTORIQUE GRISÉ */}
      {completed.map((item) => {
        const puzzle = puzzles.find((p) => p.id === item.id);
        if (!puzzle) return null;

        return (
          <PuzzleHistoryItem
            key={item.id}
            puzzle={puzzle}
            result={item}
          />
        );
      })}

      <hr />

      {/* ÉNIGME ACTUELLE */}
      {currentPuzzle && (
        <PuzzleRenderer
          puzzle={currentPuzzle}
          onSuccess={handleSuccess}
        />
      )}

      {isGameFinished && <GameComplete />}
    </div>

    
  );
}