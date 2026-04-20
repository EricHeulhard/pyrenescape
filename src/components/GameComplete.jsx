import { useEffect, useState } from "react";

export default function GameComplete() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setVisible(true), 100);
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "linear-gradient(to top, #1e3c72, #2a5298)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        zIndex: 9999,
        overflow: "hidden"
      }}
    >
      {/* MONTAGNE */}
      <div
        style={{
          fontSize: "80px",
          transform: visible ? "scale(1)" : "scale(0.5)",
          opacity: visible ? 1 : 0,
          transition: "all 0.8s ease"
        }}
      >
        🏔️
      </div>

      {/* TITRE */}
      <h1
        style={{
          marginTop: "20px",
          transform: visible ? "translateY(0)" : "translateY(40px)",
          opacity: visible ? 1 : 0,
          transition: "all 0.8s ease 0.2s"
        }}
      >
        Bravo !
      </h1>

      {/* TEXTE */}
      <p
        style={{
          marginTop: "10px",
          opacity: visible ? 1 : 0,
          transition: "opacity 0.8s ease 0.4s"
        }}
      >
        On peut passer à l'apéro !!!
      </p>

      {/* CONFETTIS SIMPLES */}
      <div style={{ position: "absolute", inset: 0 }}>
        {[...Array(40)].map((_, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              width: "6px",
              height: "6px",
              background: "white",
              top: "-10px",
              left: Math.random() * 100 + "%",
              animation: `fall ${2 + Math.random() * 3}s linear infinite`,
              opacity: 0.7
            }}
          />
        ))}
      </div>

      {/* STYLE ANIMATION */}
      <style>
        {`
          @keyframes fall {
            to {
              transform: translateY(100vh);
            }
          }
        `}
      </style>
    </div>
  );
}