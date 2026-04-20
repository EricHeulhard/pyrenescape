import { useState } from "react";

export default function UnlockPuzzle({
  puzzle,
  onSuccess,
  initialValue = "",
}) {
  const [code, setCode] = useState(initialValue);
  const [error, setError] = useState(false);
  const [unlocked, setUnlocked] = useState(false);

  const isLocked = initialValue !== "" || unlocked;

  function handleSubmit(e) {
    e.preventDefault();

    if (isLocked) return;

    // validation stricte 4 chiffres
    if (!/^\d{4}$/.test(code)) {
      setError(true);
      return;
    }

    if (code === puzzle.solution) {
      setError(false);
      setUnlocked(true);

      // petit délai pour effet "déverrouillage"
      setTimeout(() => {
        onSuccess(code);
      }, 800);
    } else {
      setError(true);
    }
  }

  return (
    <div
      style={{
        textAlign: "center",
        padding: "20px",
        opacity: isLocked ? 0.6 : 1,
      }}
    >
      {/* TITRE */}
      <h2>🔐 {puzzle.question}</h2>

      {/* DESCRIPTION */}
      {puzzle.description && (
        <p style={{ fontStyle: "italic", color: "#666" }}>
          {puzzle.description}
        </p>
      )}

      {/* ICÔNE LOCK */}
      <div
        style={{
          fontSize: "60px",
          margin: "20px 0",
          transition: "transform 0.3s",
          transform: unlocked ? "scale(1.2)" : "scale(1)",
        }}
      >
        {unlocked ? "🔓" : "🔒"}
      </div>

      {/* INPUT */}
      <form onSubmit={handleSubmit}>
        <input
          value={code}
          onChange={(e) => setCode(e.target.value)}
          disabled={isLocked}
          placeholder="____"
          maxLength={4}
          style={{
            padding: "10px",
            fontSize: "20px",
            letterSpacing: "10px",
            textAlign: "center",
            width: "140px",
          }}
        />

        <div style={{ marginTop: "10px" }}>
          <button type="submit" disabled={isLocked}>
            Déverrouiller
          </button>
        </div>
      </form>

      {/* ERREUR */}
      {error && !unlocked && (
        <p style={{ color: "red", marginTop: "10px" }}>
          ❌ Code incorrect
        </p>
      )}

      {/* SUCCESS */}
      {unlocked && (
        <p style={{ color: "green", marginTop: "10px" }}>
          ✔ Système déverrouillé
        </p>
      )}
    </div>
  );
}