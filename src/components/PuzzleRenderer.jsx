import TextPuzzle from "./TextPuzzle";
import DragPuzzle from "./DragPuzzle";
import SequenceUnlockPuzzle from "./SequenceUnlockPuzzle";
import PatternUnlockPuzzle from "./PatternUnlockPuzzle";

export default function PuzzleRenderer({ puzzle, onSuccess }) {
  if (!puzzle) return null;

  switch (puzzle.type) {
    case "text":
      return (
        <TextPuzzle puzzle={puzzle} onSuccess={onSuccess} />
      );

    case "drag":
      return (
        <DragPuzzle puzzle={puzzle} onSuccess={onSuccess} />
      );

    case "sequence_unlock":
      return (
        <SequenceUnlockPuzzle puzzle={puzzle} onSuccess={onSuccess} />
      );

    case "pattern":
      return (
        <PatternUnlockPuzzle
          puzzle={puzzle}
          onSuccess={onSuccess}
        />
      );

    default:
      return (
        <div style={{ color: "red", textAlign: "center" }}>
          ❌ Type d’énigme inconnu : {puzzle.type}
        </div>
      );
  }
}