const data = {

  "myshleniePosled": {
    data: [
      { 
        id: 0,
        label: "последовательное",
        phrase: "последовательное"
      },
      { 
        id: 1,
        label: "не всегда последовательное",
        phrase: "не всегда последовательное"
      },
      { 
        id: 2,
        label: "чаще непоследовательное",
        phrase: "чаще непоследовательное"
      },
      { 
        id: 3,
        label: "непоследовательное",
        phrase: "непоследовательное"
      },
      { 
        id: 4,
        label: "непослед. на фоне истощения",
        phrase: "в целом последовательное, но на фоне истощения становится непоследовательным"
      }
    ],
    label: "Мышление",    
    type: "radio",
    section: "rech",
    before: "Мышление ",
    after: ""
  },
  "myshlenieTemp": {
    data: [
      { 
        id: 0,
        label: "обычное",
        phrase: "обычного темпа"
      },
      { 
        id: 1,
        label: "ускоренное",
        phrase: "ускоренного темпа"
      },
      { 
        id: 2,
        label: "замедленное",
        phrase: "замедленное по темпу"
      },
    ],
    label: "Темп",    
    type: "radio",
    section: "rech",
    before: ", ",
    after: ""
  },
  "myshlenieObstoyat": {
    label: "обстоятельное",
    phrase: "обстоятельное",
    section: "rech",
    type: "boolean",
    cicle: "myshlenie"
  },
  "myshlenieRigidnoe": {
    label: "ригидное",
    phrase: "ригидное",
    section: "rech",
    type: "boolean",
    cicle: "myshlenie"
  },
  "myshlenieKonkretnoe": {
    label: "конкретное",
    phrase: "конкретное",
    section: "rech",
    type: "boolean",
    cicle: "myshlenie"
  },
  "myshleniePoverh": {
    label: "поверхностное",
    phrase: "поверхностное",
    section: "rech",
    type: "boolean",
    cicle: "myshlenie"
  },
  "myshlenieAmorf": {
     label: "аморфное",
    phrase: "аморфное",
    section: "rech",
    type: "boolean",
    cicle: "myshlenie"
  },
  "myshlenieRezoner": {
    label: "с тенденцией к резонерству",
    phrase: "с тенденцией к резонерству",
    section: "rech",
    type: "boolean",
    cicle: "myshlenie"
  },
  "myshlenieSoskalzov": {
    label: "с соскальзываниями",
    phrase: "со смысловыми соскальзываниями",
    section: "rech",
    type: "boolean",
    cicle: "myshlenie"
  },
  "myshleniePersever": {
    label: "с персеверациями",
    phrase: "с персеверациями",
    section: "rech",
    type: "boolean",
    cicle: "myshlenie"
  },
  "myshlenieBefore": {
    phrase: ", ",
    section: "affekt",
    type: "string"
  },
  "myshlenieAfter": {
    phrase: "",
    section: "affekt",
    type: "string"
  },
  "myshlenieNot": {
    phrase: "",
    section: "affekt",
    type: "string"
  },
  "myshlenieText": {
    text: ""
  },

  "rechOtkl": {
    label: "отсутствует",
    phrase: "Речь отсутствует",
    section: "rech",
    type: "boolean",
    cicle: ""
  },
  "rechNeotvechaet": {
    label: "не отвечает",
    phrase: "На вопросы не отвечает",
    section: "rech",
    type: "boolean",
    cicle: ""
  },  
  "rechTemp": {
    data: [
      { 
        id: 0,
        label: "обычная",
        phrase: "обычного темпа"
      },
      { 
        id: 1,
        label: "ускоренная",
        phrase: "ускоренная"
      },
      { 
        id: 2,
        label: "замедленная",
        phrase: "замедленная"
      },
    ],
    label: "Темп речи",    
    type: "radio",
    section: "rech",
    before: "Речь ",
    after: ""
  },
  "rechSmaz": {
    label: "смазанная",
    phrase: "смазанная",
    section: "rech",
    type: "boolean",
    cicle: "rechOsob"
  },
  "rechMonolog": {
    label: "по типу монолога",
    phrase: "по типу монолога",
    section: "rech",
    type: "boolean",
    cicle: "rechOsob"
  },
  "rechOsobBefore": {
    phrase: ", ",
    section: "affekt",
    type: "string"
  },
  "rechOsobAfter": {
    phrase: "",
    section: "affekt",
    type: "string"
  },
  "rechOsobNot": {
    phrase: "",
    section: "affekt",
    type: "string"
  },
  "rechOdnosloj": {
    label: "односложные",
    phrase: "односложные",
    section: "rech",
    type: "boolean",
    cicle: ""
  },
  "rechSuschestvo": {
    data: [
      { 
        id: 0,
        label: "по существу",
        phrase: "ответы по существу"
      },
      { 
        id: 1,
        label: "в плане спрашиваемого",
        phrase: "ответы в плане спрашиваемого"
      },
      { 
        id: 2,
        label: "иногда не по существу",
        phrase: "ответы иногда не по существу"
      },
      { 
        id: 3,
        label: "чаще не по существу",
        phrase: "ответы чаще не по существу"
      }
    ],
    label: "ответы:",    
    type: "radio",
    section: "rech",
    before: "",
    after: ""
  },
  "rechPodbor": {
    label: "трудности в подборе слов",
    phrase: "трудности в подборе слов",
    section: "rech",
    type: "boolean",
    cicle: "rechOtmech"
  },
  "rechKategor": {
    label: "категоричные высказывания",
    phrase: "категоричные высказывания",
    section: "rech",
    type: "boolean",
    cicle: "rechOtmech"
  },
  "rechParafazii": {
    label: "парафазии",
    phrase: "парафазии",
    section: "rech",
    type: "boolean",
    cicle: "rechOtmech"
  },
  "rechOtmechBefore": {
    phrase: "Отмечаются ",
    section: "affekt",
    type: "string"
  },
  "rechOtmechAfter": {
    phrase: ". ",
    section: "affekt",
    type: "string"
  },
  "rechOtmechNot": {
    phrase: "",
    section: "affekt",
    type: "string"
  },
  "rechText": {
    text: ""
  },
  "rechNedoponimaet": {
    label: "речь недопонимает",
    phrase: "Обращенную речь недопонимает",
    section: "rech",
    type: "boolean",
    cicle: "rechGrub"
  },
  "rechBormochet": {
    label: "невнятно бормочет",
    phrase: "Что-то невнятно бормочет",
    section: "rech",
    type: "boolean",
    cicle: "rechGrub"
  }
};


export default data;
