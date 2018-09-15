const data = {
  "soznanie": {
    data: [
      { 
        id: 0,
        label: "ясное",
        phrase: "Сознание ясное"
      },
      { 
        id: 1,
        label: "оглушение",
        phrase: "Сознание помрачно по типу оглушения"
      },
      { 
        id: 2,
        label: "делирий",
        phrase: "Сознание помрачно по типу делирия"
      },
      { 
        id: 3,
        label: "психическая спутанность",
        phrase: "Наблюдается состояние психической спутанности"
      },
      { 
        id: 4,
        label: "заторможенность",
        phrase: "Наблюдается состояние психомоторной заторможенности"
      },
      { 
        id: 5,
        label: "возбуждение",
        phrase: "Наблюдается состояние психомоторного возбуждения"
      },
      { 
        id: 6,
        label: "мед. загруженность",
        phrase: "Наблюдается состояние медицинской загруженности"
      }
    ],
    label: "Сознание",    
    type: "radio",
    section: "sostoyanie",
    before: "",
    after: ". "
  },
  "kontakt": {
    data: [
      { 
        id: 0,
        label: "сохранен",
        phrase: "Контакту доступна",
        phraseM: "Контакту доступен"
      },
      { 
        id: 1,
        label: "формальный",
        phrase: "Контакт формальный"
      },
      { 
        id: 2,
        label: "недоступен",
        phrase: "Контакту недоступна",
        phraseM: "Контакту недоступен"
      }
    ],
    label: "Контакт",    
    type: "radio",
    section: "sostoyanie",
    before: "",
    after: ". "
  },
  "kontaktSluh": {
    label: "снижения слуха",
    phrase: "снижения слуха",
    section: "sostoyanie",
    cicle: "zatrud",
    type: "boolean",
    hint: ""
  },  
  "kontaktKognit": {
    label: "когнитивных нарушений",
    phrase: "когнитивных нарушений",
    section: "sostoyanie",
    cicle: "zatrud",
    type: "boolean",
    hint: ""
  }, 
  "kontaktSostoyanie": {
    label: "тяжести общего состояния",
    phrase: "тяжести общего состояния",
    section: "sostoyanie",
    cicle: "zatrud",
    type: "boolean",
    hint: ""
  }, 
  "kontaktSoznanie": {
    label: "не вполне ясного сознания",
    phrase: "не вполне ясного сознания",
    section: "sostoyanie",
    cicle: "zatrud",
    type: "boolean",
    hint: ""
  }, 
  "zatrudBefore": {
    phrase: "затруднен из-за",
    section: "sostoyanie",
    type: "string"
  },
  "zatrudAfter": {
    phrase: "",
    section: "sostoyanie",
    type: "string"
  },
  "zatrudNot": {
    phrase: "",
    section: "sostoyanie",
    type: "string"
  },
  "vpechatleniePodozrit": {
    label: "подозрительность",
    phrase: "Подозрительна, насторожена",
    phraseM: "Подозрителен, насторожен",
    section: "sostoyanie",
    cicle: "vpech",
    type: "boolean",
    hint: ""
  },
  "vpechatlenieDistancia": {
    label: "бездистантность",
    phrase: "Не соблюдает дистанцию",
    section: "sostoyanie",
    cicle: "vpech",
    type: "boolean",
    hint: ""
  },
  "vpechatlenieNavyazchiv": {
    label: "навязчивость",
    phrase: "Навязчива",
    phraseM: "Навязчив",
    section: "sostoyanie",
    cicle: "vpech",
    type: "boolean",
    hint: ""
  },
  "vpechatlenieDurash": {
    label: "дурашливость",
    phrase: "Дурашлива",
    phraseM: "Дурашлив",
    section: "sostoyanie",
    cicle: "vpech",
    type: "boolean",
    hint: ""
  },
  "vpechatlenieProtivorechia": {
    label: "противоречивые высказывания",
    phrase: "Много противоречивых высказываний",
    section: "sostoyanie",
    cicle: "vpech",
    type: "boolean",
    hint: ""
  },
  "vpechatlenieNeraskryvaet": {
    label: "не раскрывает",
    phrase: "Переживания раскрывает неохотно",
    section: "sostoyanie",
    cicle: "vpech",
    type: "boolean",
    hint: ""
  },
  "vpechatlenieLucshe": {
    label: "истерия",
    phrase: "Старается представить себя в лучшем свете",
    section: "sostoyanie",
    cicle: "vpech",
    type: "boolean",
    hint: ""
  },
  "vpechatlenieGordost": {
    label: "гордость",
    phrase: "Поведение с подчеркнутым чувством собственного достоинства",
    section: "sostoyanie",
    cicle: "vpech",
    type: "boolean",
    hint: ""
  },
  "vpechatlenieKoketstvo": {
    label: "кокетливость",
    phrase: "Кокетлива",
    phraseM: "Кокетлив",
    section: "sostoyanie",
    cicle: "vpech",
    type: "boolean",
    hint: ""
  },
  "vpechatlenieDissimulacia": {
    label: "диссимуляция",
    phrase: "Создается впечатление о диссимуляции психических нарушений",
    section: "sostoyanie",
    cicle: "vpech",
    type: "boolean",
    hint: ""
  },
  "kritika": {
    data: [
      { 
        id: 0,
        label: "сохранена",
        phrase: "сохранена",
      },
      { 
        id: 1,
        label: "формальная",
        phrase: "формальная",
      },
      { 
        id: 2,
        label: "несколько снижена",
        phrase: "несколько снижена",
      },
      { 
        id: 3,
        label: "снижена",
        phrase: "снижена",
      },
      { 
        id: 4,
        label: "отсутствует",
        phrase: "отсутствует",
      }
    ],
    label: "Критика ",    
    type: "radio",
    section: "sostoyanie",
    before: "Критика ",
    after: ". "
  }
};

export default data;