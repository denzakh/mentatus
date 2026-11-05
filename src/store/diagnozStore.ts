import type { StatusSection } from "../types/status";

const store = {
  diagnozMkb10: {
    text: ""
  },
  diagnozKlin: {
    text: ""
  },
  diagnozDopolnenie: {
    text: ""
  },
  reqilech: {
    text: ""
  }
} satisfies StatusSection;

export default store;
