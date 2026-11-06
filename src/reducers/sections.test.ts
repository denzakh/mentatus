import sections, { fieldSections } from "./sections";
import createSectionSlice from "./createSectionSlice";
import { setSymptom, setText, setRadio } from "../actions/fieldActions";
import { resetState } from "../actions/resetAction";
import type { SectionName, StatusSection } from "../types/status";

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
    const seen: Record<string, SectionName> = {};

    (Object.keys(sections) as SectionName[]).forEach(section => {
      Object.keys(sections[section]).forEach(field => {
        expect(seen[field]).toBeUndefined();
        seen[field] = section;
      });
    });

    expect(Object.keys(seen).length).toBe(Object.keys(fieldSections).length);
  });

  it("индекс fieldSections указывает на срез, где поле реально лежит", () => {
    Object.keys(fieldSections).forEach(field => {
      const slice = sections[fieldSections[field]] as StatusSection;

      expect(slice[field]).toBeDefined();
    });
  });
});

describe("createSectionSlice", () => {
  const reducer = createSectionSlice("test", {
    flag: { isChecked: false },
    text: { text: "" },
    radio: { number: 0 }
  }).reducer;

  // форма состояния среза: значения полей сужены до стартовых
  type TestState = Parameters<typeof reducer>[0];

  it("переключает флаг своего поля", () => {
    const next = reducer(undefined, setSymptom("flag"));
    expect(next.flag.isChecked).toBe(true);
    expect(reducer(next, setSymptom("flag")).flag.isChecked).toBe(false);
  });

  it("пишет текст своего поля", () => {
    expect(reducer(undefined, setText("text", "x")).text.text).toBe("x");
  });

  it("ставит номер радиогруппы", () => {
    expect(reducer(undefined, setRadio("radio", 2)).radio.number).toBe(2);
  });

  it("игнорирует экшены для чужих полей и других разделов", () => {
    const state: TestState = {
      flag: { isChecked: false },
      text: { text: "" },
      radio: { number: 0 }
    };

    expect(reducer(state, setSymptom("чужое"))).toBe(state);
    expect(reducer(state, setText("flag", "x"))).toBe(state);
    expect(reducer(state, setRadio("text", 1))).toBe(state);
  });

  it("возвращает тот же state при неизвестном экшене", () => {
    const state = { flag: { isChecked: false } } as TestState;
    expect(reducer(state, { type: "UNKNOWN" })).toBe(state);
  });

  it("сбрасывает срез к стартовым значениям", () => {
    const state = reducer(undefined, setSymptom("flag"));
    expect(state.flag.isChecked).toBe(true);

    const reset = reducer(state, resetState());

    expect(reset).toEqual({
      flag: { isChecked: false },
      text: { text: "" },
      radio: { number: 0 }
    });
  });
});
