import { useState } from "react";

export default function DragPuzzle({
  puzzle,
  onSuccess,
  initialDrops = null,
}) {
  const [drops, setDrops] = useState(initialDrops || {});
  const [draggedItem, setDraggedItem] = useState(null);

  const isLocked = initialDrops !== null;

  // 👉 DRAG START
  function startDrag(id) {
    if (isLocked) return;
    setDraggedItem(id);
  }

  // 👉 DROP
  function dropOnZone(zoneId) {
    if (isLocked || !draggedItem) return;

    setDrops((prev) => ({
      ...prev,
      [zoneId]: draggedItem
    }));

    setDraggedItem(null);
  }

  // 👉 TOUCH MOVE (mobile)
  function handleTouchMove(e) {
    if (!draggedItem) return;

    const touch = e.touches[0];
    const el = document.elementFromPoint(
      touch.clientX,
      touch.clientY
    );

    if (el?.dataset?.zone) {
      dropOnZone(el.dataset.zone);
    }
  }

  // 👉 VALIDATION
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
    <div style={{ textAlign: "center" }}>
      <h2>{puzzle.question}</h2>

      {/* ITEMS */}
      <div>
        {puzzle.items.map((item) => (
          <img
            key={item.id}
            src={item.image}
            draggable={!isLocked}
            onDragStart={() => startDrag(item.id)}
            onTouchStart={() => startDrag(item.id)}
            onTouchMove={handleTouchMove}
            style={{
              width: "80px",
              margin: "10px",
              cursor: "grab"
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
            onDrop={() => dropOnZone(zone.id)}
            style={{
              width: "120px",
              height: "120px",
              backgroundColor: zone.color,
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
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

      <br />

      <button onClick={checkSolution}>
        Valider
      </button>
    </div>
  );
}