const data = {
  "bredDepress": {
    label: "депрессивного характера",
    phrase: "депрессивного характера",
    section: "pp",
    type: "boolean",
    cicle: "bred"
  },
  "bredSam": {
    label: "самообвинения и уничижения",
    phrase: "самообвинения и самоуничижения",
    section: "pp",
    type: "boolean",
    cicle: "bred"
  },
  "bredIpoh": {
    label: "ипохондрического содержания",
    phrase: "ипохондрического содержания",
    section: "pp",
    type: "boolean",
    cicle: "bred"
  },
  "bredPresl": {
    label: "преследования",
    phrase: "преследования",
    section: "pp",
    type: "boolean",
    cicle: "bred"
  },
  "bredVozd": {
    label: "воздействия",
    phrase: "воздействия",
    section: "pp",
    type: "boolean",
    cicle: "bred"
  },
  "bredMelk": {
    label: "мелкого ущерба",
    phrase: "мелкого ущерба",
    section: "pp",
    type: "boolean",
    cicle: "bred"
  },
  "bredEkspan": {
    label: "экспансивного характера",
    phrase: "экспансивного характера",
    section: "pp",
    type: "boolean",
    cicle: "bred"
  },
  "bredLubov": {
    label: "любовного очарования",
    phrase: "любовного очарования",
    section: "pp",
    type: "boolean",
    cicle: "bred"
  },
  "bredBefore": {
    phrase: "Выявляются бредовые идеи ",
    section: "affekt",
    type: "string"
  },
  "bredAfter": {
    phrase: ". ",
    section: "affekt",
    type: "string"
  },
  "bredNot": {
    phrase: "",
    section: "affekt",
    type: "string"
  },
  "bredText": {
    text: ""
  },
  "gall": {
    data: [
      { 
        id: 1,
        label: "слуховых",
        phrase: "слуховых"
      },
      { 
        id: 2,
        label: "зрительных ",
        phrase: "зрительных "
      },
      { 
        id: 3,
        label: "слуховых и зрительных",
        phrase: "слуховых и зрительных"
      },
      { 
        id: 0,
        label: "Признаков обманов восприятия не обнаруживает",
        phrase: "Признаков обманов восприятия не обнаруживает"
      }
    ],
    label: "Галлюцинации",    
    type: "radio",
    section: "kognit",
    before: "Обнаруживает признаки ",
    after: "обманов восприятия. "
  },
  "gallText": {
    text: false
  }
};

export default data;
