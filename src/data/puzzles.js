import Laurier from "../assets/Laurier.jpg";
import Ail from "../assets/Ail.jpg";
import Persil from "../assets/Persil.jpg";
import Espelette from "../assets/Espelette.jpg"
import Thym from "../assets/Thym.jpg"

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
    answer: "avalanche"
  },
  {
    id: 3,
    type: "drag",
    description: "Les Pyrénennées sont connues pour leur plantes aux senteurs reconnaissables, elle parfument les repas des habitants de la région.",
    question: "Associe chaque plante à la bonne couleur",

    zones: [
      { id: "yellow", color: "yellow", label: "Pot jaune" },
      { id: "green", color: "green", label: "Pot vert" },
      { id: "red", color: "red", label: "Pot rouge" },
      { id: "blue", color: "blue", label: "Pot bleu" },
    ],

    items: [
      // 🌿 BONNES PLANTES 
      { id: "Laurier", image: Laurier, correct: "red", real: true },
      { id: "Ail", image: Ail, correct: "yellow", real: true },
        { id: "Persil", image: Persil, correct: "blue", real: true },
      { id: "Espelette", image: Espelette, correct: "green", real: true },

      // ❌ DISTRACTEURS 

      { id: "Thym", image: Thym, correct: null, real: false }
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