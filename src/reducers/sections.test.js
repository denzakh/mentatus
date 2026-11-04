import sections, { fieldSections } from "./sections";
import createSectionReducer from "./createSectionReducer";

describe("sections", () => {
  it("содержит только живые разделы", () => {
    expect(Object.keys(sections)).toEqual([
      "zhaloby",
      "anamnez",
      "sostoyanie",
      "affekt",
      "rech",
      "kognit",
      "pp",
      "diagnoz"
    ]);
  });

  it("каждое поле принадлежит ровно одному срезу", () => {
    const seen = {};

    Object.keys(sections).forEach(section => {
      Object.keys(sections[section]).forEach(field => {
        expect(seen[field]).toBeUndefined();
        seen[field] = section;
      });
    });

    expect(Object.keys(seen).length).toBe(Object.keys(fieldSections).length);
  });

  it("индекс fieldSections указывает на срез, где поле реально лежит", () => {
    Object.keys(fieldSections).forEach(field => {
      expect(sections[fieldSections[field]][field]).toBeDefined();
    });
  });
});

describe("createSectionReducer", () => {
  const reducer = createSectionReducer({
    flag: { isChecked: false },
    text: { text: "" },
    radio: { number: 0 }
  });

  it("переключает флаг своего поля", () => {
    const next = reducer(undefined, { type: "SET_SYMPTOM", name: "flag" });
    expect(next.flag.isChecked).toBe(true);
    expect(
      reducer(next, { type: "SET_SYMPTOM", name: "flag" }).flag.isChecked
    ).toBe(false);
  });

  it("пишет текст своего поля", () => {
    expect(
      reducer(undefined, { type: "SET_TEXT", name: "text", text: "x" }).text
        .text
    ).toBe("x");
  });

  it("ставит номер радиогруппы", () => {
    expect(
      reducer(undefined, { type: "SET_RADIO", name: "radio", number: 2 }).radio
        .number
    ).toBe(2);
  });

  it("игнорирует экшены для чужих полей и других разделов", () => {
    const state = {
      flag: { isChecked: false },
      text: { text: "" },
      radio: { number: 0 }
    };

    expect(reducer(state, { type: "SET_SYMPTOM", name: "чужое" })).toBe(state);
    expect(reducer(state, { type: "SET_TEXT", name: "flag", text: "x" })).toBe(
      state
    );
    expect(reducer(state, { type: "SET_RADIO", name: "text", number: 1 })).toBe(
      state
    );
  });

  it("возвращает тот же state при неизвестном экшене", () => {
    const state = { flag: { isChecked: false } };
    expect(reducer(state, { type: "UNKNOWN" })).toBe(state);
  });
});
