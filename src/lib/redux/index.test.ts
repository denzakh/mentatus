import { fieldOf, radioOptionsOf, radioSelectedOf, textOf } from "./index";
import type { Schema } from "../../types/schema";
import type { StatusState } from "../../types/status";

/*
Тесты хелперов чтения стора (`src/lib/redux`): по имени поля они находят
его срез через `reducers/sections` и возвращают значение нужной формы.
*/

const state = {
  sostoyanie: {
    pol: { isChecked: true },
    vozrast: { text: "42" },
    kritika: { number: 0 },
    mestoOsmotra: { number: 3 }
  }
} as unknown as StatusState;

const dataBase: Schema = {
  mestoOsmotra: {
    data: [
      { id: 0, label: "на дому", phrase: "на дому" },
      { id: 3, label: "другое", phrase: "" }
    ]
  },
  vozrast: { section: "sostoyanie", type: "text" }
};

describe("fieldOf", () => {
  it("находит поле в его срезе", () => {
    expect(fieldOf(state, "pol")).toEqual({ isChecked: true });
  });

  it("возвращает undefined для неизвестного поля", () => {
    expect(fieldOf(state, "netTakogo")).toBeUndefined();
  });
});

describe("textOf", () => {
  it("возвращает текст поля", () => {
    expect(textOf(state, "vozrast")).toBe("42");
  });

  it("возвращает пустую строку, если текста нет", () => {
    expect(textOf(state, "pol")).toBe("");
    expect(textOf(state, "netTakogo")).toBe("");
  });
});

describe("radioSelectedOf", () => {
  it("возвращает номер выбранного пункта", () => {
    expect(radioSelectedOf(state, "mestoOsmotra")).toBe(3);
  });

  it("возвращает 0 для незаполненного поля и для отсутствующего", () => {
    expect(radioSelectedOf(state, "kritika")).toBe(0);
    expect(radioSelectedOf(state, "netTakogo")).toBe(0);
  });

  it("возвращает undefined, если поле есть, но номер не задан", () => {
    expect(radioSelectedOf(state, "pol")).toBeUndefined();
  });
});

describe("radioOptionsOf", () => {
  it("берёт пункты группы из схемы", () => {
    const options = radioOptionsOf(state, "mestoOsmotra", dataBase);

    expect(options.map(option => option.id)).toEqual([0, 3]);
  });

  it("возвращает пустой список, если группы в схеме нет", () => {
    expect(radioOptionsOf(state, "kritika", dataBase)).toEqual([]);
    expect(radioOptionsOf(state, "mestoOsmotra")).toEqual([]);
  });
});
