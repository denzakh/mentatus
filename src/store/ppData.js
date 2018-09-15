const data = {
  "bredDepress": {
    label: "депрессивного характера",
    phrase: "депрессивного характера",
    section: "pp",
    type: "boolean",
    cicle: "bred"
  },
  "bredSam": {
    label: "самообвинения",
    phrase: "самообвинения",
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
    section: "pp",
    type: "string"
  },
  "bredAfter": {
    phrase: ". ",
    section: "affekt",
    type: "string"
  },
  "bredNot": {
    phrase: "Бредовых идей не высказывает. ",
    section: "pp",
    type: "string"
  },
  "bredOtkl": {
    label: "не показывать",
    phrase: "не показывать",
    section: "pp",
    type: "string"
  },
  "bredText": {
    text: ""
  },
  "gallSluh": {
    label: "слуховых",
    phrase: "слуховых",
    section: "pp",
    type: "boolean",
    cicle: "gall"
  },
  "gallZrit": {
    label: "зрительных",
    phrase: "зрительных",
    section: "pp",
    type: "boolean",
    cicle: "gall"
  },
  "gallTak": {
    label: "тактильных",
    phrase: "тактильных",
    section: "pp",
    type: "boolean",
    cicle: "gall"
  },
  "gallBefore": {
    phrase: "Обнаруживает признаки ",
    section: "pp",
    type: "string"
  },
  "gallAfter": {
    phrase: " обманов восприятия. ",
    section: "pp",
    type: "string"
  },
  "gallNot": {
    phrase: "Признаков обманов восприятия не обнаруживает. ",
    section: "pp",
    type: "string"
  },
  "gallOtkl": {
    label: "не показывать",
    phrase: "не показывать",
    section: "pp",
    type: "string"
  },
  "gallText": {
    text: false
  },

  "opasnye": {
    data: [
      { 
        id: 0,
        label: "нет",
        phrase: "Суицидальные мысли отрицает. Без опасных тенденций"
      },
      { 
        id: 1,
        label: "пассивная желательность смерти",
        phrase: "Отмечается сужение жизненной перспективы, пессимистическое восприятие дальнейшей жизни, при этом cуицидальные мысли и намерения отрицает"
      },
      { 
        id: 3,
        label: "суицидальные мысли",
        phrase: "Высказывает суицидальные мысли"
      },
      { 
        id: 4,
        label: "суицидальные планы",
        phrase: "Высказывает суицидальные мысли и планы"
      }
    ],
    label: "Опасные",    
    type: "radio",
    section: "pp",
    before: "",
    after: ". "
  },
  "opasnyeAgressia": {
    data: [
      { 
        id: 0,
        label: "нет",
        phrase: ""
      },
      { 
        id: 1,
        label: "агрессивные тенденции",
        phrase: "Выявляются агрессивные тенденции."
      },
      { 
        id: 2,
        label: "активная агрессия",
        phrase: "Проявляет агрессию к окружающим."
      }
    ],
    label: "Агрессия",    
    type: "radio",
    section: "pp",
    before: "",
    after: " "
  },
  "opasnyeOtkl": {
    label: "не показывать",
    phrase: "не показывать",
    section: "pp",
    type: "string"
  }
};

export default data;
