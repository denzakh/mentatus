const data = {
  "nastroyeniye": {
    data: [
      { 
        id: 0,
        label: "ровное",
        phrase: "ровное"
      },
      { 
        id: 1,
        label: "ближе к ровному",
        phrase: "ближе к ровному"
      },
      { 
        id: 2,
        label: "несколько снижено",
        phrase: "несколько снижено"
      },
      { 
        id: 3,
        label: "снижено",
        phrase: "снижено"
      },
      { 
        id: 4,
        label: "несколько повышено",
        phrase: "несколько повышено"
      },
      { 
        id: 5,
        label: "повышено",
        phrase: "повышено"
      },      
      { 
        id: 6,
        label: "неустойчивое",
        phrase: "неустойчивое",
        hint: "жалобы на неустойчивое настроение"
      },
      { 
        id: 7,
        label: "не определить",
        phrase: "не определить"       
      }
    ],
    label: "Настроение",    
    type: "radio",
    section: "affekt",
    before: "Настроение ",
    after: ""
  },

  "nastroyeniyePsikhotravma": {
    label: "психотравмой",
    phrase: "психотравмирующей ситуацией",
    section: "affekt",
    type: "boolean",
    cicle: "vSvyazi",
    hint: "жалобы на трудности в жизни"
  },
  "nastroyeniyeBoli": {
    label: "болью",
    phrase: "болевым синдромом",
    section: "affekt",
    type: "boolean",
    cicle: "vSvyazi",
    hint: "жалобы на боли"
  },
  "nastroyeniyeSomatika": {
    label: "соматикой",
    phrase: "c общим соматическим состоянием",
    section: "affekt",
    type: "boolean",
    cicle: "vSvyazi",
    hint: "жалобы на соматику"
  },
  "vSvyaziBefore": {
    phrase: ", в связи с ",
    section: "affekt",
    type: "string"
  },
  "vSvyaziAfter": {
    phrase: "",
    section: "affekt",
    type: "string"
  },
  "vSvyaziNot": {
    phrase: "",
    section: "affekt",
    type: "string"
  },

  "nastroyeniyeToska": {
    label: "преобладанием тоски",
    phrase: "преобладанием тоски",
    section: "affekt",
    type: "boolean",
    cicle: "s",
    hint: ""
  },
  "nastroyeniyeUgnetenie": {
    label: "угнетенностью",
    phrase: "угнетенностью",
    section: "affekt",
    type: "boolean",
    cicle: "s",
    hint: ""
  },
  "nastroyeniyeNejelanie": {
    label: "нежеланием ничего делать",
    phrase: "нежеланием ничего делать",
    section: "affekt",
    type: "boolean",
    cicle: "s",
    hint: ""
  },
  "nastroyeniyeSlabost": {
    label: "слабостью",
    phrase: "слабостью",
    section: "affekt",
    type: "boolean",
    cicle: "s",
    hint: "жалобы на слабость"
  },
  "nastroyeniyeUtomlenie": {
    label: "утомляемостью",
    phrase: "быстрой утомляемостью",
    section: "affekt",
    type: "boolean",
    cicle: "s",
    hint: ""
  },
  "nastroyeniyeAngedonia": {
    label: "явлениями ангедонии",
    phrase: "явлениями ангедонии",
    section: "affekt",
    type: "boolean",
    cicle: "s",
    hint: ""
  },
  "nastroyeniyeRazdrajit": {
    label: "раздражительностью",
    phrase: "раздражительностью",
    section: "affekt",
    type: "boolean",
    cicle: "s",
    hint: ""
  },
  "nastroyeniyeNaprajenie": {
    label: "напряженностью",
    phrase: "напряженностью",
    section: "affekt",
    type: "boolean",
    cicle: "s",
    hint: ""
  },
  "nastroyeniyeObidchivost": {
    label: "обидчивостью",
    phrase: "повышенной обидчивостью",
    section: "affekt",
    type: "boolean",
    cicle: "s",
    hint: ""
  },
  "nastroyeniyeIpohondria": {
    label: "ипохондрией",
    phrase: "ипохондрической фиксацией",
    section: "affekt",
    type: "boolean",
    cicle: "s",
    hint: ""
  },
  "nastroyeniyeSenestopatia": {
    label: "сенестопатиями",
    phrase: "сенестопатическими ощущениями",
    section: "affekt",
    type: "boolean",
    cicle: "s",
    hint: ""
  },
  "nastroyeniyeVozbujdenie": {
    label: "возбуждением",
    phrase: "признаками возбуждения",
    section: "affekt",
    type: "boolean",
    cicle: "s",
    hint: ""
  },
  "nastroyeniyBlagodushie": {
    label: "благодушием",
    phrase: "оттенком благодушия",
    section: "affekt",
    type: "boolean",
    cicle: "s",
    hint: ""
  },
  "nastroyeniyeDurashlivost": {
    label: "дурашливостью",
    phrase: "дурашливостью",
    section: "affekt",
    type: "boolean",
    cicle: "s",
    hint: ""
  },
  "nastroyeniyeRasteryannost": {
    label: "растерянностью",
    phrase: "аффектом растерянности",
    section: "affekt",
    type: "boolean",
    cicle: "s",
    hint: ""
  },
  "nastroyeniyeKolebania": {
    label: "суточными колебаниями",
    phrase: "суточными колебаниями настроения",
    section: "affekt",
    type: "boolean",
    cicle: "s",
    hint: ""
  },
  "sBefore": {
    phrase: ", с ",
    section: "affekt",
    type: "string"
  },
  "sAfter": {
    phrase: "",
    section: "affekt",
    type: "string"
  },
  "sNot": {
    phrase: "",
    section: "affekt",
    type: "string"
  },

  "nastroyeniyeKolebaniaPodrobno": {
    data: [
      { 
        id: 0,
        label: "хуже утром",
        phrase: "с ухудшением в утренние часы"
      },
      { 
        id: 1,
        label: "хуже вечером",
        phrase: "с ухудшением к вечеру"
      },
      { 
        id: 2,
        label: "другое",
        phrase: "без определенной суточной динамики"
      }
    ],
    label: "суточная динамика",    
    type: "radio",
    section: "affekt",
    before: " (",
    after: ")"
  },
  "nastroyeniyeOtricaet": {
    label: "снижение отрицает",
    phrase: "Субъективно снижение настроения отрицает",
    section: "affekt",
    type: "boolean",
    cicle: "nastroyenieSeparate",
    hint: ""
  },
  "nastroyeniyeOdinochestvo": {
    label: "одиночество",
    phrase: "Отмечает чувство одиночества",
    section: "affekt",
    type: "boolean",
    cicle: "nastroyenieSeparate",
    hint: ""
  },
  "nastroyeniyeLabilnost": {
    label: "эмоц. лабильность",
    phrase: "Эмоционально лабильна",
    phraseW: "Эмоционально лабильна",
    phraseM: "Эмоционально лабилен",
    section: "affekt",
    type: "boolean",
    cicle: "nastroyenieSeparate",
    hint: "связь с неустойчивым настроением"
  },
  "nastroyeniyePlaksivost": {
    label: "плаксивость",
    phrase: "Плаксива",
    phraseW: "Плаксива",
    phraseM: "Плаксив",
    section: "affekt",
    type: "boolean",
    cicle: "nastroyenieSeparate",
    hint: "связь с неустойчивым настроением"
  },
  "nastroyeniyeText": {
    section: "affekt",
    type: "string"
  },

  "trevoga": {
    data: [
      { 
        id: 0,
        label: "нет",
        phrase: "Тревоги не наблюдается"
      },
      { 
        id: 1,
        label: "небольшая",
        phrase: "Наблюдается небольшая тревожность"
      },
      { 
        id: 2,
        label: "умеренная",
        phrase: "Наблюдается умеренная тревожность"
      },
      { 
        id: 3,
        label: "ажитация",
        phrase: "Наблюдается выраженная тревога с ажитацией"
      }
    ],
    label: "Тревога",    
    type: "radio",
    section: "affekt"
  },

  "trevogaMysli": {
    label: "тревожные мысли",
    phrase: "Сообщает про навязчивые мысли тревожного содержания",
    section: "affekt",
    type: "boolean",
    cicle: "trevogaSeparate",
    hint: ""
  },
  "trevogaAtaki": {
    label: "панические атаки",
    phrase: "Отмечает периодические приступы тревоги по типу панических атак",
    section: "affekt",
    type: "boolean",
    cicle: "trevogaSeparate",
    hint: ""
  },
  "trevogaText": {
    section: "affekt",
    type: "string"
  },

  "sonPoverh": {
    label: "поверхностный",
    phrase: "поверхностный",
    section: "affekt",
    type: "boolean",
    cicle: "son",
    hint: ""
  },
  "sonZasypanie": {
    label: "с затрудненным засыпанием",
    phrase: "с затрудненным засыпанием",
    section: "affekt",
    type: "boolean",
    cicle: "son",
    hint: ""
  },
  "sonProbNoch": {
    label: "с пробуждениями ночью",
    phrase: "с пробуждениями ночью",
    section: "affekt",
    type: "boolean",
    cicle: "son",
    hint: ""
  },
  "sonProbUtro": {
    label: "с ранним пробуждением",
    phrase: "с ранним пробуждением",
    section: "affekt",
    type: "boolean",
    cicle: "son",
    hint: ""
  },
  "sonKoshmar": {
    label: "с кошмарными сновидениями",
    phrase: "с кошмарными сновидениями",
    section: "affekt",
    type: "boolean",
    cicle: "son",
    hint: ""
  },
  "sonKrik": {
    label: "с разговорами (криками) во сне",
    phrase: "с разговорами (криками) во сне",
    section: "affekt",
    type: "boolean",
    cicle: "son",
    hint: ""
  },
  "sonSonliv": {
    label: "с сонливостью в течение дня",
    phrase: "с сонливостью в течение дня",
    section: "affekt",
    type: "boolean",
    cicle: "son",
    hint: ""
  },
  "sonBefore": {
    phrase: "Сон ",
    section: "affekt",
    type: "string"
  },
  "sonAfter": {
    phrase: "",
    section: "affekt",
    type: "string"
  },
  "sonNot": {
    phrase: "Сон достаточный",
    section: "affekt",
    type: "string"
  },
  "sonInversia": {
    label: "Cмещен режим сна и бодрствования",
    phrase: "Cмещен режим сна и бодрствования",
    section: "affekt",
    type: "boolean",
    cicle: "sonSeparate",
    hint: ""
  },
  "sonSnotvor": {
    label: "Принимает снотворные препараты",
    phrase: "Принимает снотворные препараты",
    section: "affekt",
    type: "boolean",
    cicle: "sonSeparate",
    hint: ""
  },
  "sonDizorientir": {
    label: "Дезориентировка в ночное время",
    phrase: "Отмечались эпизоды дезориентировки в ночное время",
    section: "affekt",
    type: "boolean",
    cicle: "sonSeparate",
    hint: ""
  },
  "sonText": {
    section: "affekt",
    type: "string"
  },

  "appetit": {
    data: [
      { 
        id: 0,
        label: "достаточный",
        phrase: "достаточный"
      },
      { 
        id: 1,
        label: "снижен",
        phrase: "несколько снижен"
      },
      { 
        id: 2,
        label: "отсутствует",
        phrase: "практически отсутствует"
      },
      { 
        id: 3,
        label: "повышен",
        phrase: "повышен"
      }
    ],
    label: "Аппетит",    
    type: "radio",
    section: "affekt",
    before: "Аппетит ",
    after: ""
  },
  "appetitPohudel": {
    section: "affekt",
    type: "string",
    before: " (потеря веса около ",
    after: " кг)"
  },
  "appetitText": {
    section: "affekt",
    type: "string"
  }

};

export default data;

