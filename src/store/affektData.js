const data = {
  "nastroyeniye": {
    data: [
      { 
        id: 1,
        label: "ровное",
        phrase: "ровное"
      },
      { 
        id: 2,
        label: "ближе к ровному",
        phrase: "ближе к ровному"
      },
      { 
        id: 3,
        label: "несколько снижено",
        phrase: "несколько снижено"
      },
      { 
        id: 4,
        label: "снижено",
        phrase: "снижено"
      },
      { 
        id: 5,
        label: "несколько повышено",
        phrase: "несколько повышено"
      },
      { 
        id: 6,
        label: "повышено",
        phrase: "повышено"
      },      
      { 
        id: 7,
        label: "неустойчивое",
        phrase: "неустойчивое",
        hint: "жалобы на неустойчивое настроение"
      },
      { 
        id: 8,
        label: "не определить",
        phrase: "не определить"       
      }
    ],
    label: "Настроение",    
    type: "radio",
    section: "affekt"
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
  "nastroyeniyeToska": {
    label: "преобладанием тоски",
    phrase: "преобладанием тоски",
    section: "affekt",
    type: "boolean",
    cicle: "s",
    hint: ""
  },
  "nastroyeniyeUgnetenie": {
    label: "угнетенностью ",
    phrase: "угнетенностью ",
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
    phrase: "утомляемостью",
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
  "nastroyeniyeKolebaniaPodrobno": {
    data: [
      { 
        id: 1,
        label: "с ухудшением в утренние часы",
        phrase: "с ухудшением в утренние часы"
      },
      { 
        id: 2,
        label: "с ухудшением к вечеру",
        phrase: "с ухудшением к вечеру"
      },
      { 
        id: 3,
        label: "без определенной суточной динамики",
        phrase: "без определенной суточной динамики"
      }
    ],
    label: "суточная динамика",    
    type: "radio",
    section: "affekt"
  },
  "nastroyeniyeOtricaet": {
    label: "Снижение настроения отрицает",
    phrase: "Снижение настроения отрицает",
    section: "affekt",
    type: "boolean",
    cicle: "",
    hint: ""
  },
  "nastroyeniyeOdinochestvo": {
    label: "Отмечает чувство одиночества",
    phrase: "Отмечает чувство одиночества",
    section: "affekt",
    type: "boolean",
    cicle: "",
    hint: ""
  },
  "nastroyeniyeLabilnost": {
    label: "Отмечает чувство одиночества",
    phraseW: "Эмоционально лабильна",
    phraseM: "Эмоционально лабилен",
    section: "affekt",
    type: "boolean",
    cicle: "",
    hint: "связь с неустойчивым настроением"
  },
  "nastroyeniyePlaksivost": {
    label: "Отмечает чувство одиночества",
    phraseW: "Плаксива",
    phraseM: "Плаксив",
    section: "affekt",
    type: "boolean",
    cicle: "",
    hint: "связь с неустойчивым настроением"
  }
};

export default data;
