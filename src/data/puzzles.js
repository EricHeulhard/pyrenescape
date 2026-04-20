import rose from "../assets/rose.jpg";
import sunflower from "../assets/sunflower.jpg";
import leaf from "../assets/leaf.jpg";
import fern from "../assets/fern.jpg"
import lavender from "../assets/lavender.jpg"

const puzzles = [
  {
    id: 1,
    type: "text",
    description: "Les Pyrénnées sont une chaine de montagne très longue qui s'étend d'Est en Ouest. Il faut plusieurs semaines pour les parcourir",
    question: "On m'expulse quand on est malade (m)",
    answer: "2153"
  },
  {
    id: 2,
    type: "text",
    description: "En cas de forte chute de neige, prudence est de mise",
    question: "Retrouvez moi",
    answer: "Avalanche"
  },
  {
    id: 3,
    type: "drag",
    description: "Les Pyrénennées sont connues pour leur plantes aux senteurs reconnaissables, elle parfument les repas des habitants de la région.",
    question: "Associe chaque plante à la bonne couleur",

    zones: [
      { id: "red", color: "red", label: "Pot rouge" },
      { id: "yellow", color: "yellow", label: "Pot jaune" },
    ],

    items: [
      // 🌿 BONNES PLANTES 
      { id: "rose", image: rose, correct: "red", real: true },
      { id: "sunflower", image: sunflower, correct: "yellow", real: true },

      // ❌ DISTRACTEURS 
      { id: "leaf", image: leaf, correct: null, real: false },
      { id: "fern", image: fern, correct: null, real: false },
      { id: "lavender", image: lavender, correct: null, real: false }
    ]
  },
  {
    id: 4,
    type: "pattern",
    description: "En randonnée, le principal c'est d'avoir bien tracé son chemin",
    question: "3144334831922876",
    answer: "4963"
  }
];

export default puzzles;