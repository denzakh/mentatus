import { isKritikaEmpty } from "./kritika";

describe("isKritikaEmpty", () => {
  it("считает критику незаполненной при 0", () => {
    expect(isKritikaEmpty({ kritika: { number: 0 } })).toBe(true);
  });

  it("считает критику заполненной при любом другом значении", () => {
    expect(isKritikaEmpty({ kritika: { number: 2 } })).toBe(false);
  });

  it("понимает значение, пришедшее строкой", () => {
    expect(isKritikaEmpty({ kritika: { number: "3" } })).toBe(false);
  });
});
