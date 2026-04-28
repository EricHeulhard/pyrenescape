import { useState } from "react";

const WORDS = [
  "amour", "cœur", "rêve", "vie", "nuit", "jour",
  "bonheur", "désir", "ciel", "étoile", "soleil",
  "lune", "mer", "vent", "pluie", "feu",
  "part(ir)", "reviens(nir)", "tombe(r)", "danse(r)", "chante(r)",
  "pleure(r)", "oublie(r)",
  "encore", "jamais", "toujours", "pourquoi",
  "musique", "voix", "silence", "lumière", "refrain"
];

export default function HintGenerator() {
  const [word, setWord] = useState(null);

  function generateWord() {
    const random =
      WORDS[Math.floor(Math.random() * WORDS.length)];

    setWord(random);
  }

  return (
    <div
      style={{
        textAlign: "center",
        marginBottom: "20px",
        padding: "15px",
        border: "1px solid #ccc",
        borderRadius: "10px",
        background: "#f9f9f9"
      }}
    >
      <h3>💡 Besoin d’un indice ou d'un verre de vin 🍷 ?</h3>

      <button onClick={generateWord}>
        🎲 Générer un mot
      </button>

      {word && (
        <p
          style={{
            marginTop: "10px",
            fontSize: "20px",
            fontWeight: "bold"
          }}
        >
          {word}
        </p>
      )}
    </div>
  );
}