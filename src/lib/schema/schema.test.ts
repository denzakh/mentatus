import { optionById } from ".";

describe("optionById", () => {
  const group = {
    data: [
      { id: 0, label: "первый", phrase: "первый" },
      { id: 3, label: "третий", phrase: "третий" }
    ]
  };

  it("находит пункт по id, а не по позиции в массиве", () => {
    expect(optionById(group, 3)?.label).toBe("третий");
  });

  it("возвращает undefined для неизвестного номера", () => {
    expect(optionById(group, 1)).toBeUndefined();
  });

  it("возвращает undefined без группы, данных или номера", () => {
    expect(optionById(undefined, 0)).toBeUndefined();
    expect(optionById({}, 0)).toBeUndefined();
    expect(optionById(group, undefined)).toBeUndefined();
  });
});