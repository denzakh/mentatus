import { isKritikaEmpty } from "./kritika";

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
