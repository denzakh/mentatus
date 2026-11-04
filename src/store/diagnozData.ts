import type { Schema } from "../types/schema";

const data: Schema = {
  diagnozMkb10: {
    label: "МКБ-10",
    phrase: "",
    section: "diagnoz",
    type: "text",
    cicle: ""
  },
  diagnozKlin: {
    label: "Диагноз",
    phrase: "",
    section: "diagnoz",
    type: "text",
    cicle: ""
  },
  diagnozDopolnenie: {
    label: "Дополнительный",
    phrase: "",
    section: "diagnoz",
    type: "text",
    cicle: ""
  },
  reqilech: {
    label: "Рекомендации и лечение",
    phrase: "",
    section: "diagnoz",
    type: "text",
    cicle: ""
  }
};

export default data;
