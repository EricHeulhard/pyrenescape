import TextPuzzle from "./TextPuzzle";
import DragPuzzle from "./DragPuzzle";
import PatternUnlockPuzzle from "./PatternUnlockPuzzle";

export default function PuzzleHistoryItem({ puzzle, result }) {
  return (
    <div
      style={{
        opacity: 0.4,
        pointerEvents: "none",
        marginBottom: "20px",
        border: "1px solid #ccc",
        padding: "10px",
        borderRadius: "8px"
      }}
    >
      {puzzle.type === "text" && (
        <TextPuzzle
          puzzle={puzzle}
          onSuccess={() => {}}
          defaultValue={result.answer}
        />
      )}

      {puzzle.type === "drag" && (
        <DragPuzzle
          puzzle={puzzle}
          onSuccess={() => {}}
          initialDrops={result.drops}
        />
      )}

      {puzzle.type === "pattern" && (
        <PatternUnlockPuzzle
          puzzle={puzzle}
          onSuccess={() => {}}
          initialValue={result.answer}
        />
      )}
    </div>
  );
}