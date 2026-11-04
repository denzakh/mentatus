import { collectVisibility, blockKey } from "./index";

const layout = [
  {
    type: "box",
    blocks: [
      { type: "field", name: "a" },
      { type: "group", cicle: "b", visibleWhen: slice => slice.b.isChecked }
    ]
  },
  {
    type: "col",
    visibleWhen: slice => slice.c.number === 2,
    blocks: [{ type: "br" }]
  }
];

describe("blockKey", () => {
  it("склеивает путь индексов блока", () => {
    expect(blockKey([])).toBe("");
    expect(blockKey([0, 1, 2])).toBe("0.1.2");
  });
});

describe("collectVisibility", () => {
  it("собирает все блоки с visibleWhen в плоский объект", () => {
    expect(
      collectVisibility(layout, { b: { isChecked: true }, c: { number: 0 } })
    ).toEqual({ "0.1": true, "1": false });
  });

  it("пересчитывает условия при изменении среза", () => {
    expect(
      collectVisibility(layout, { b: { isChecked: false }, c: { number: 2 } })
    ).toEqual({ "0.1": false, "1": true });
  });

  it("не падает на пустом layout и пустом срезе", () => {
    expect(collectVisibility([], {})).toEqual({});
    expect(collectVisibility(undefined, {})).toEqual({});
  });
});
