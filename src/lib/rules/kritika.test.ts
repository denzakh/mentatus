import { autoKritikaForOption, isKritikaEmpty } from "./kritika";

describe("autoKritikaForOption", () => {
  it("знает пункты, снижающие критику", () => {
    expect(autoKritikaForOption(1)).toBe(2);
    expect(autoKritikaForOption(2)).toBe(3);
    expect(autoKritikaForOption(3)).toBe(4);
  });

  it("не меняет критику для неизвестного пункта", () => {
    expect(autoKritikaForOption(0)).toBeUndefined();
    expect(autoKritikaForOption(9)).toBeUndefined();
  });

  it("не меняет критику, если пункт не выбран", () => {
    expect(autoKritikaForOption(undefined)).toBeUndefined();
  });
});

describe("isKritikaEmpty", () => {
  it("считает критику незаполненной при 0", () => {
    expect(isKritikaEmpty({ number: 0 })).toBe(true);
  });

  it("считает критику заполненной при любом другом значении", () => {
    expect(isKritikaEmpty({ number: 2 })).toBe(false);
  });

  it("понимает значение, пришедшее строкой", () => {
    expect(isKritikaEmpty({ number: "3" })).toBe(false);
  });

  it("считает отсутствующее поле незаполненной критикой", () => {
    expect(isKritikaEmpty(undefined)).toBe(true);
  });
});
