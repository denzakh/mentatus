const data = {
  mestoOsmotra: {
    data: [
      {
        id: 0,
        label: "на дому",
        phrase: "на дому"
      },
      {
        id: 1,
        label: "в ПНД",
        phrase: "в ПНД"
      },
      {
        id: 2,
        label: "на отделении",
        phrase: "на отделении"
      },
      {
        id: 3,
        label: "другое",
        phrase: ""
      }
    ],
    label: "Осмотр",
    type: "radio",
    section: "sostoyanie",
    before: "",
    after: ". "
  },
  poNapravleniu: {
    label: "по направлению",
    phrase: "по направлению"
  },
  sIstorieiOznakomlen: {
    label: "c историей ознакомлен",
    phrase: "С историей ознакомлен"
  },
  nedobrovolno: {
    label: "недобровольно"
  },
  nedobrovolnoPrichiny: {
    data: [
      {
        id: 0,
        label: "отказ",
        phrase: "От беседы с психиатром отказывается. "
      },
      {
        id: 1,
        label: "когнитивные нарушения",
        phrase:
          "Осознанного письменного согласия на беседу с психиатром дать не может в силу грубых нарушений памяти и интеллекта. "
      },
      {
        id: 2,
        label: "психические нарушения",
        phrase:
          "Осознанного письменного согласия на беседу с психиатром дать не может из-за выраженных психических нарушений. "
      },
      {
        id: 3,
        label: "нарушения сознания",
        phrase:
          "Осознанного письменного согласия на беседу с психиатром дать не может из-за нарушенного сознания. "
      },
      {
        id: 4,
        label: "другое",
        phrase: ""
      }
    ],
    label: "Причины отказа",
    type: "radio",
    section: "sostoyanie",
    before: "",
    after: ". "
  },
  nedobrovolnoPunkt: {
    data: [
      {
        id: 0,
        label: "а (опасность)",
        punkt: "а",
        phrase: "непосредственную опасность для себя или окружающих"
      },
      {
        id: 1,
        label: "б (беспомощность)",
        punkt: "б",
        phrase:
          "беспомощность, то есть неспособность самостоятельно удовлетворять основные жизненные потребности"
      },
      {
        id: 2,
        label: "в (ухудшение состояния)",
        punkt: "в",
        phrase:
          "существенный вред здоровью вследствие ухудшения психического состояния, если лицо будет оставлено без психиатрической помощи"
      }
    ],
    label: "Осмотр",
    type: "radio",
    section: "sostoyanie",
    before: "",
    after: ". "
  },
  soznanie: {
    data: [
      {
        id: 0,
        label: "ясное",
        phrase: "Сознание ясное"
      },
      {
        id: 1,
        label: "оглушение",
        phrase: "Сознание нарушено по типу оглушения"
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
        phrase: "Наблюдается состояние медикаментозной загруженности"
      },
      {
        id: 7,
        label: "кома",
        phrase: "Наблюдается состояние комы"
      }
    ],
    label: "Сознание",
    type: "radio",
    section: "sostoyanie",
    before: "",
    after: ". "
  },
  kontakt: {
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
    after: ""
  },
  kontaktZatrudnen: {
    label: "затруднен"
  },
  kontaktSluh: {
    label: "снижения слуха",
    phrase: "снижения слуха",
    section: "sostoyanie",
    cicle: "zatrud",
    type: "boolean",
    hint: ""
  },
  kontaktKognit: {
    label: "когнитивных нарушений",
    phrase: "когнитивных нарушений",
    section: "sostoyanie",
    cicle: "zatrud",
    type: "boolean",
    hint: ""
  },
  kontaktSostoyanie: {
    label: "тяжести общего состояния",
    phrase: "тяжести общего состояния",
    section: "sostoyanie",
    cicle: "zatrud",
    type: "boolean",
    hint: ""
  },
  kontaktSoznanie: {
    label: "не вполне ясного сознания",
    phrase: "не вполне ясного сознания",
    section: "sostoyanie",
    cicle: "zatrud",
    type: "boolean",
    hint: ""
  },
  zatrudBefore: {
    phrase: ", затруднен из-за ",
    section: "sostoyanie",
    type: "string"
  },
  zatrudAfter: {
    phrase: ". ",
    section: "sostoyanie",
    type: "string"
  },
  zatrudNot: {
    phrase: ". ",
    section: "sostoyanie",
    type: "string"
  },
  vpechatleniePodozrit: {
    label: "подозрительность",
    phrase: "Подозрительна, насторожена",
    phraseM: "Подозрителен, насторожен",
    section: "sostoyanie",
    cicle: "vpech",
    type: "boolean",
    hint: ""
  },
  vpechatlenieDistancia: {
    label: "бездистантность",
    phrase: "Не соблюдает дистанцию",
    section: "sostoyanie",
    cicle: "vpech",
    type: "boolean",
    hint: ""
  },
  vpechatlenieNavyazchiv: {
    label: "навязчивость",
    phrase: "Навязчива",
    phraseM: "Навязчив",
    section: "sostoyanie",
    cicle: "vpech",
    type: "boolean",
    hint: ""
  },
  vpechatlenieDurash: {
    label: "дурашливость",
    phrase: "Дурашлива",
    phraseM: "Дурашлив",
    section: "sostoyanie",
    cicle: "vpech",
    type: "boolean",
    hint: ""
  },
  vpechatlenieProtivorechia: {
    label: "противоречивые высказывания",
    phrase: "Много противоречивых высказываний",
    section: "sostoyanie",
    cicle: "vpech",
    type: "boolean",
    hint: ""
  },
  vpechatlenieNeraskryvaet: {
    label: "не раскрывает",
    phrase: "Переживания раскрывает неохотно",
    section: "sostoyanie",
    cicle: "vpech",
    type: "boolean",
    hint: ""
  },
  vpechatlenieLucshe: {
    label: "истерия",
    phrase: "Старается представить себя в лучшем свете",
    section: "sostoyanie",
    cicle: "vpech",
    type: "boolean",
    hint: ""
  },
  vpechatlenieGordost: {
    label: "гордость",
    phrase: "Поведение с подчеркнутым чувством собственного достоинства",
    section: "sostoyanie",
    cicle: "vpech",
    type: "boolean",
    hint: ""
  },
  vpechatlenieKoketstvo: {
    label: "кокетливость",
    phrase: "Кокетлива",
    phraseM: "Кокетлив",
    section: "sostoyanie",
    cicle: "vpech",
    type: "boolean",
    hint: ""
  },
  vpechatlenieDissimulacia: {
    label: "диссимуляция",
    phrase: "Создается впечатление о диссимуляции психических нарушений",
    section: "sostoyanie",
    cicle: "vpech",
    type: "boolean",
    hint: ""
  },
  kritika: {
    data: [
      {
        id: 0,
        label: "сохранена",
        phrase: "сохранена"
      },
      {
        id: 1,
        label: "формальная",
        phrase: "формальная"
      },
      {
        id: 2,
        label: "несколько снижена",
        phrase: "несколько снижена"
      },
      {
        id: 3,
        label: "снижена",
        phrase: "снижена"
      },
      {
        id: 4,
        label: "отсутствует",
        phrase: "отсутствует"
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
