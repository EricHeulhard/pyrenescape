import { useState } from "react";

export default function DragPuzzle({
  puzzle,
  onSuccess,
  initialDrops = null,
}) {
  // zoneId -> plantId
  const [drops, setDrops] = useState(initialDrops || {});
  const [draggedItem, setDraggedItem] = useState(null);

  const isLocked = initialDrops !== null;

  // 👉 drag start
  function handleDragStart(itemId) {
    if (isLocked) return;
    setDraggedItem(itemId);
  }

  // 👉 drop sur une zone
  function handleDrop(zoneId) {
    if (isLocked || !draggedItem) return;

    setDrops((prev) => ({
      ...prev,
      [zoneId]: draggedItem, // 🔥 REMPLACEMENT GARANTI
    }));

    setDraggedItem(null);
  }

  // 👉 validation
  function checkSolution() {
    if (isLocked) return;

    const isCorrect = puzzle.items
      .filter((item) => item.correct) // ignore distracteurs
      .every((item) => drops[item.correct] === item.id);

    if (isCorrect) {
      onSuccess(drops);
    } else {
      alert("❌ Mauvaise réponse");
    }
  }

  return (
    <div
      style={{
        opacity: isLocked ? 0.4 : 1,
        textAlign: "center",
      }}
    >
      {/* QUESTION */}
      <h2>{puzzle.question}</h2>

      {/* DESCRIPTION */}
      {puzzle.description && (
        <p style={{ fontStyle: "italic", color: "#666" }}>
          {puzzle.description}
        </p>
      )}

      {/* ITEMS (PLANTES) */}
      <div style={{ marginBottom: "20px" }}>
        {puzzle.items.map((item) => (
          <img
            key={item.id}
            src={item.image}
            draggable={!isLocked}
            onDragStart={() => handleDragStart(item.id)}
            style={{
              width: "80px",
              margin: "10px",
              cursor: isLocked ? "default" : "grab",
              opacity: draggedItem === item.id ? 0.5 : 1,
            }}
          />
        ))}
      </div>

      {/* ZONES (COULEURS / POTS) */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "20px",
        }}
      >
        {puzzle.zones.map((zone) => (
          <div
            key={zone.id}
            onDragOver={(e) => !isLocked && e.preventDefault()}
            onDrop={() => handleDrop(zone.id)}
            style={{
              width: "120px",
              height: "120px",
              backgroundColor: zone.color,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "2px solid black",
              borderRadius: "10px",
            }}
          >
            {/* PLANTE DANS LA ZONE */}
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

      {/* VALIDATION */}
      <button onClick={checkSolution} disabled={isLocked}>
        Valider
      </button>
    </div>
  );
}