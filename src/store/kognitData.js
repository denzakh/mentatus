const data = {
  "orientir": {
    label: "тревогу",
    orientir000: "Степень ориентировки определить не удается.",
    orientir111: "В месте, времени и собственной личности ориентирована верно.",
    orientir112: "В месте и времени  ориентирована верно, в собственной личности - приблизительно.",
    orientir113: "В месте и времени ориентирована верно, дезориентирована в собственной личности.",
    orientir121: "Приблизительно ориентирована в месте, верно - во времени и собственной личности.",
    orientir122: "Верно ориентирована во времени, приблизительно - в месте и собственной личности.",
    orientir123: "Верно ориентирована во времени, частично - в месте, дезориентирована в собственной личности.",
    orientir131: "Дезориентирована в месте, верно ориентирована во времени и собственной личности.",
    orientir132: "Дезориентирована в месте нахождения, во времени ориентирована верно, в собственной личности - частично.",
    orientir133: "Верно ориентирована во времени, дезориентирована в месте нахождения и собственной личности.",
    orientir211: "Приблизительно ориентирована во времени, верно ориентирована в месте и собственной личности.",
    orientir212: "Верно ориентирована во времени и собственной личности, частично - в месте.",
    orientir213: "Верно ориентирована в месте, частично - во времени. дезориентирована в собственной личности.",
    orientir221: "В месте и времени ориентирована приблизительно, в собственной личности - верно.",
    orientir222: "Частично ориентирована в месте, времени и собственной личности.",
    orientir223: "Частично ориентирована в месте и времени, дезориентирована в собственной личности.",
    orientir232: "Дезориентирована в месте, частично ориентирована во времени и собственной личности.",
    orientir233: "Дезориентирована в месте и собственной личности, частично ориентирована во времени. ",
    orientir311: "Дезориентирована во времени, верно ориентирована в месте и собственной личности.",
    orientir312: "Дезориентирована во времени. В собственной личности ориентирована частично, в месте - полностью.",
    orientir313: "Дезориентирована во времени и собственной личности, в месте ориентирована  верно.",
    orientir321: "Дезориентирована во времени, частично ориентирована в месте, полностью - в собственной личности.",
    orientir322: "Дезориентирована во времени, частично ориентирована в месте и собственной личности.",
    orientir323: "Дезориентирована во времени и собственной личности, частично ориентирована в месте нахождения.",
    orientir333: "Дезориентирована во времени, месте и собственной личности."
  },
  "orientirVremia": {
    data: [
      { 
        id: 1,
        label: "полностью",
        phrase: ""       
      },
      { 
        id: 2,
        label: "частично",
        phrase: ""       
      },
      { 
        id: 3,
        label: "отсутст.",
        phrase: ""       
      },
    ],
    label: "Во времени",    
    type: "radio",
    section: "kognit",
    before: "",
    after: ""
  },
  "orientirMesto": {
    data: [
      { 
        id: 1,
        label: "полностью",
        phrase: ""       
      },
      { 
        id: 2,
        label: "частично",
        phrase: ""       
      },
      { 
        id: 3,
        label: "отсутст.",
        phrase: ""       
      },
    ],
    label: "Во времени",    
    type: "radio",
    section: "kognit",
    before: "",
    after: ""
  },
  "orientirLichnost": {
    data: [
      { 
        id: 1,
        label: "полностью",
        phrase: ""       
      },
      { 
        id: 2,
        label: "частично",
        phrase: ""       
      },
      { 
        id: 3,
        label: "отсутст.",
        phrase: ""       
      },
    ],
    label: "Во времени",    
    type: "radio",
    section: "kognit",
    before: "",
    after: ""
  },
 "orientirText": {
    section: "kognit",
    type: "string"
  },
  "kognitTekusch": {
    label: "снижение памяти на текущие события",
    phrase: "снижение памяти на текущие события",
    section: "kognit",
    type: "boolean",
    cicle: "otmech",
    hint: ""
  },
  "kognitProshl": {
    label: "снижение памяти на прошлые события",
    phrase: "снижение памяти на прошлые события",
    section: "kognit",
    type: "boolean",
    cicle: "otmech",
    hint: ""
  },
  "kognitDismnes": {
    label: "когнитивное снижение по дисмнестическому типу",
    phrase: "когнитивное снижение по дисмнестическому типу",
    section: "kognit",
    type: "boolean",
    cicle: "otmech",
    hint: ""
  },
  "kognitAbstrag": {
    label: "снижение абстрагирования",
    phrase: "снижение уровня абстрагирования",
    section: "kognit",
    type: "boolean",
    cicle: "otmech",
    hint: ""
  },
  "kognitOgrub": {
    label: "общее огрубление личности",
    phrase: "общее огрубление личности",
    section: "kognit",
    type: "boolean",
    cicle: "otmech",
    hint: ""
  },
  "kognitDazadapt": {
    label: "социальная дезадаптация",
    phrase: "социальная дезадаптация",
    section: "kognit",
    type: "boolean",
    cicle: "otmech",
    hint: ""
  },
  "kognitScet": {
    label: "нарушение счета",
    phrase: "нарушение счета",
    section: "kognit",
    type: "boolean",
    cicle: "otmech",
    hint: ""
  },
  "kognitPismo": {
    label: "аграфия",
    phrase: "аграфия",
    section: "kognit",
    type: "boolean",
    cicle: "otmech",
    hint: ""
  },
  "kognitAprak": {
    label: "апраксия",
    phrase: "апраксия",
    section: "kognit",
    type: "boolean",
    cicle: "otmech",
    hint: ""
  },
  "kognitAgnoz ": {
    label: "агнозия",
    phrase: "зрительно-пространственная агнозия",
    section: "kognit",
    type: "boolean",
    cicle: "otmech",
    hint: ""
  },
  "kognitAfazia": {
    label: "амнестическая афазия",
    phrase: "амнестическая афазия",
    section: "kognit",
    type: "boolean",
    cicle: "otmech",
    hint: ""
  },
  "kognitFinger": {
    label: "фингерагнозия",
    phrase: "фингерагнозия",
    section: "kognit",
    type: "boolean",
    cicle: "otmech",
    hint: ""
  },
  "kognitOsnivnoi": {
    data: [
      { 
        id: 0,
        label: "без видимого снижения",
        phrase: "без видимого снижения"
      },
      { 
        id: 1,
        label: "несколько снижены",
        phrase: "несколько снижены"
      },
      { 
        id: 2,
        label: "умеренно снижены",
        phrase: "умеренно снижены"
      },
      { 
        id: 3,
        label: "заметно снижены",
        phrase: "заметно снижены"
      },
      { 
        id: 4,
        label: "проверить не удалось",
        phrase: "проверить не удалось"
      },
    ],
    label: "Интелл-мнест. функции",    
    type: "radio",
    section: "kognit",
    before: "Интеллектуально-мнестически функции ",
    after: ""
  },
  "kognitKonfab": {
    label: "конфабуляции",
    phrase: "Выявляются конфабуляторные переживания.",
    section: "kognit",
    cicle: "otdel",
    type: "boolean",
    hint: ""
  },  
  "kognitDissim": {
    label: "скрывает нарушения памяти",
    phrase: "Диссимулирует имеющиеся нарушения памяти.",
    section: "kognit",
    cicle: "otdel",
    type: "boolean",
    hint: ""
  }, 
  "kognitFingerN": {
    section: "kognit",
    type: "string"
  },
  "kognitText": {
    section: "kognit",
    type: "string"
  }


};

export default data;
