import TextPuzzle from "./TextPuzzle";
import DragPuzzle from "./DragPuzzle";

export default function PuzzlePreview({ puzzle, result }) {
  if (!puzzle) return <div>⚠️ Puzzle introuvable</div>;

  return (
    <div style={{ opacity: 0.7 }}>
      <h3>✔ Résolue</h3>

      <p>
        <b>Question :</b> {puzzle.question}
      </p>

      <p>
        <b>Réponse :</b> {result.answer}
      </p>
    </div>
  );
}