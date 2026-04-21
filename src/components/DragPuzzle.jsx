import { useState, useEffect } from "react";

export default function DragPuzzle({
  puzzle,
  onSuccess,
  initialDrops = null,
}) {
  const [drops, setDrops] = useState(initialDrops || {});
  const [draggedItem, setDraggedItem] = useState(null);

  const isLocked = initialDrops !== null;

  // 👉 START DRAG
  function startDrag(id) {
    if (isLocked) return;
    setDraggedItem(id);
  }

  // 👉 GESTION MOBILE (touch global)
  useEffect(() => {
    function handleTouchMove(e) {
      if (!draggedItem) return;

      e.preventDefault(); // 🔥 bloque le scroll

      const touch = e.touches[0];
      const el = document.elementFromPoint(
        touch.clientX,
        touch.clientY
      );

      if (el?.dataset?.zone) {
        // tu peux ajouter un highlight ici si tu veux
      }
    }

    function handleTouchEnd(e) {
      if (!draggedItem) return;

      const touch = e.changedTouches[0];
      const el = document.elementFromPoint(
        touch.clientX,
        touch.clientY
      );

      if (el?.dataset?.zone) {
        setDrops((prev) => ({
          ...prev,
          [el.dataset.zone]: draggedItem, // ✔ remplace si déjà présent
        }));
      }

      setDraggedItem(null);
    }

    document.addEventListener("touchmove", handleTouchMove, {
      passive: false, // 🔥 indispensable
    });

    document.addEventListener("touchend", handleTouchEnd);

    return () => {
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleTouchEnd);
    };
  }, [draggedItem]);

  // 👉 DESKTOP DROP
  function handleDrop(zoneId) {
    if (isLocked || !draggedItem) return;

    setDrops((prev) => ({
      ...prev,
      [zoneId]: draggedItem,
    }));

    setDraggedItem(null);
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
    <div
      style={{
        textAlign: "center",
        touchAction: "none", // 🔥 bloque gestes navigateur
      }}
    >
      <h2>{puzzle.question}</h2>

      {/* ITEMS À DRAG */}
      <div>
        {puzzle.items.map((item) => (
          <img
            key={item.id}
            src={item.image}
            draggable={!isLocked}
            onDragStart={() => startDrag(item.id)}
            onTouchStart={() => startDrag(item.id)}
            style={{
              width: "80px",
              margin: "10px",
              opacity: draggedItem === item.id ? 0.5 : 1,
              cursor: "grab",
            }}
          />
        ))}
      </div>

      {/* ZONES DE DROP */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "20px",
          marginTop: "20px",
        }}
      >
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
              borderRadius: "8px",
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