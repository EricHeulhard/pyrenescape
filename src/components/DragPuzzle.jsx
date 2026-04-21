import { useState, useEffect } from "react";

export default function DragPuzzle({
  puzzle,
  onSuccess,
  initialDrops = null,
}) {
  const [drops, setDrops] = useState(initialDrops || {});
  const [draggedItem, setDraggedItem] = useState(null);
  const [ghostPos, setGhostPos] = useState({ x: 0, y: 0 });

  const isLocked = initialDrops !== null;

  function startDrag(id, e) {
    if (isLocked) return;

    setDraggedItem(id);

    if (e.touches) {
      const touch = e.touches[0];
      setGhostPos({ x: touch.clientX, y: touch.clientY });
    }
  }

  useEffect(() => {
    function handleTouchMove(e) {
      if (!draggedItem) return;

      e.preventDefault();

      const touch = e.touches[0];

      setGhostPos({
        x: touch.clientX,
        y: touch.clientY,
      });
    }

    function handleTouchEnd(e) {
      if (!draggedItem) return;

      const touch = e.changedTouches[0];
      const offsetX = 10;
      const offsetY = 10;

      const el = document.elementFromPoint(
        touch.clientX + offsetX,
        touch.clientY + offsetY
      );

      if (el?.dataset?.zone) {
        setDrops((prev) => ({
          ...prev,
          [el.dataset.zone]: draggedItem,
        }));
      }

      setDraggedItem(null);
    }

    document.addEventListener("touchmove", handleTouchMove, {
      passive: false,
    });

    document.addEventListener("touchend", handleTouchEnd);

    return () => {
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleTouchEnd);
    };
  }, [draggedItem]);

  function handleDrop(zoneId) {
    if (isLocked || !draggedItem) return;

    setDrops((prev) => ({
      ...prev,
      [zoneId]: draggedItem,
    }));

    setDraggedItem(null);
  }

  function checkSolution() {
    const isCorrect = puzzle.items
      .filter((i) => i.correct)
      .every((i) => drops[i.correct] === i.id);

    if (isCorrect) {
      onSuccess(drops);
    } else {
      alert("❌ Mauvaise réponse");
    }
  }

  return (
    <div style={{ textAlign: "center", touchAction: "none" }}>
      <h2>{puzzle.question}</h2>

      {/* ITEMS */}
      <div>
        {puzzle.items.map((item) => (
          <img
            key={item.id}
            src={item.image}
            draggable={!isLocked}
            onDragStart={() => setDraggedItem(item.id)}
            onTouchStart={(e) => startDrag(item.id, e)}
            style={{
              width: "80px",
              margin: "10px",
              opacity: draggedItem === item.id ? 0.3 : 1,
            }}
          />
        ))}
      </div>

      {/* ZONES */}
      <div style={{ display: "flex", justifyContent: "center", gap: "20px" }}>
        {puzzle.zones.map((zone) => (
          <div
            key={zone.id}
            data-zone={zone.id}
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => handleDrop(zone.id)}
            style={{
              width: "120px",
              height: "120px",
              backgroundColor: zone.color,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "2px solid black",
            }}
          >
            {drops[zone.id] && (
              <img
                src={
                  puzzle.items.find(
                    (i) => i.id === drops[zone.id]
                  )?.image
                }
                style={{ width: "70px" }}
              />
            )}
          </div>
        ))}
      </div>

      {/* 👻 GHOST */}
      {draggedItem && (
        <img
          src={
            puzzle.items.find((i) => i.id === draggedItem)?.image
          }
          style={{
            position: "fixed",
            left: ghostPos.x - 40,
            top: ghostPos.y - 40,
            width: "80px",
            pointerEvents: "none",
            opacity: 0.8,
            transform: "scale(1.1)",
            zIndex: 9999,
          }}
        />
      )}

      <br />

      <button onClick={checkSolution}>
        Valider
      </button>
    </div>
  );
}