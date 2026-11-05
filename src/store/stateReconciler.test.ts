import rootReducer from "../reducers";
import { hasSameForm, mergeSectionState, mergeSections } from "./stateReconciler";
import type { StatusSection } from "../types/status";

const initial: StatusSection = {
  flag: { isChecked: false },
  num: { number: 0 },
  str: { text: "" }
};

describe("hasSameForm", () => {
  it("совпадает для той же формы поля", () => {
    expect(hasSameForm({ isChecked: true }, initial.flag)).toBe(true);
  });

  it("не совпадает при смене формы поля", () => {
    expect(hasSameForm({ text: "x" }, initial.flag)).toBe(false);
  });

  it("не совпадает для мусора", () => {
    expect(hasSameForm(null, initial.flag)).toBe(false);
    expect(hasSameForm({}, initial.flag)).toBe(false);
    expect(hasSameForm({ a: 1, b: 2 }, initial.flag)).toBe(false);
    expect(hasSameForm("x", initial.flag)).toBe(false);
  });
});

describe("mergeSectionState", () => {
  it("накладывает сохранённые значения по полям", () => {
    const merged = mergeSectionState({ flag: { isChecked: true } }, initial);

    expect(merged.flag.isChecked).toBe(true);
  });

  it("оставляет стартовые значения у новых полей", () => {
    const merged = mergeSectionState({ flag: { isChecked: true } }, initial);

    expect(merged.num).toEqual({ number: 0 });
    expect(merged.str).toEqual({ text: "" });
  });

  it("отбрасывает поля, которых больше нет в срезе", () => {
    const merged = mergeSectionState({ removed: { text: "x" } }, initial);

    expect(Object.keys(merged).sort()).toEqual(["flag", "num", "str"]);
  });

  it("отбрасывает значение, если форма поля изменилась", () => {
    const merged = mergeSectionState({ num: { text: "x" } }, initial);

    expect(merged.num).toEqual({ number: 0 });
  });

  it("возвращает стартовые значения при пустом снапшоте", () => {
    expect(mergeSectionState(undefined, initial)).toEqual(initial);
    expect(mergeSectionState(null, initial)).toEqual(initial);
  });

  it("не мутирует исходный срез", () => {
    mergeSectionState({ flag: { isChecked: true } }, initial);

    expect(initial.flag.isChecked).toBe(false);
  });
});

describe("mergeSections", () => {
  const state = rootReducer(undefined, { type: "@@INIT" });

  it("сливает каждый срез и не добавляет незнакомые разделы", () => {
    const merged = mergeSections(
      { sostoyanie: { pol: { isChecked: true } }, unknown: { x: 1 } },
      state,
      state,
      {} as any
    );

    expect(merged.sostoyanie.pol.isChecked).toBe(true);
    expect(Object.keys(merged).sort()).toEqual(Object.keys(state).sort());
  });
});