import { useState } from "react";

export default function TextPuzzle({
  puzzle,
  onSuccess,
  defaultValue = "",
}) {
  const [input, setInput] = useState(defaultValue);
  const [error, setError] = useState(false);

  const isLocked = defaultValue !== "";

  function handleSubmit(e) {
    e.preventDefault();

    if (isLocked) return;

    if (input.trim() === puzzle.answer) {
      setError(false);
      onSuccess(input);
    } else {
      setError(true);
    }
  }

  return (
    <div style={{ opacity: isLocked ? 0.4 : 1 }}>
          {puzzle.description && (
                <p style={{ fontStyle: "italic", color: "#666" }}>
                {puzzle.description}
                </p>
            )}
      <h2>{puzzle.question}</h2>

      <form onSubmit={handleSubmit}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={isLocked}
          placeholder="Ta réponse..."
          style={{
            padding: "10px",
            fontSize: "16px",
            marginRight: "10px",
          }}
        />

        <button type="submit" disabled={isLocked}>
          Valider
        </button>
      </form>

      {error && !isLocked && (
        <p style={{ color: "red" }}>❌ Mauvaise réponse</p>
      )}
    </div>
  );
}