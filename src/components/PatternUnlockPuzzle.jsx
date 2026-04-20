import { useState, useRef } from "react";

export default function PatternUnlockPuzzle({ puzzle, onSuccess }) {
  const [pattern, setPattern] = useState([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [error, setError] = useState(false);

  const containerRef = useRef();

  function startDraw(id) {
    setIsDrawing(true);
    setPattern([id]);
    setError(false);
  }

  function enterDot(id) {
    if (!isDrawing) return;

    setPattern((prev) => {
      if (prev.includes(id)) return prev;
      return [...prev, id];
    });
  }

  function endDraw() {
    setIsDrawing(false);

    const code = pattern.join("");

    if (code === puzzle.answer) {
      setTimeout(() => {
        onSuccess(code);
      }, 500);
    } else {
      setError(true);
      setPattern([]);
    }
  }

  return (
    <div style={{ textAlign: "center" }}>

      {puzzle.description && (
        <p style={{ fontStyle: "italic", color: "#666" }}>
        {puzzle.description}
        </p>
      )}
      <h2>🔐 {puzzle.question}</h2>

      <div
        ref={containerRef}
        onMouseUp={endDraw}
        onMouseLeave={endDraw}
        onTouchEnd={endDraw}
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 80px)",
          gap: "20px",
          justifyContent: "center",
          margin: "40px 0",
        }}
      >
        {[1,2,3,4,5,6,7,8,9].map((id) => (
          <div
            key={id}
            onMouseDown={() => startDraw(id)}
            onMouseEnter={() => enterDot(id)}
            onTouchStart={() => startDraw(id)}
            onTouchMove={(e) => {
              const touch = e.touches[0];
              const el = document.elementFromPoint(
                touch.clientX,
                touch.clientY
              );

              if (el?.dataset?.id) {
                enterDot(Number(el.dataset.id));
              }
            }}
            data-id={id}
            style={{
              width: "80px",
              height: "80px",
              borderRadius: "50%",
              border: "2px solid black",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "20px",
              background: pattern.includes(id) ? "#4caf50" : "white",
              color: pattern.includes(id) ? "white" : "black",
              userSelect: "none",
            }}
          >
            {id}
          </div>
        ))}
      </div>

      <p>Code : {pattern.join(" → ")}</p>

      {error && (
        <p style={{ color: "red" }}>
          ❌ Mauvais motif
        </p>
      )}
    </div>
  );
}