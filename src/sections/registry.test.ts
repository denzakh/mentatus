import sections from "../reducers/sections";
import { sectionsRegistry, tabOrder, conclusionOrder } from "./registry";
import type { Layout, LayoutBlock } from "../types/layout";
import type { SectionName } from "../types/status";

/*
Тесты реестра разделов (`src/sections/registry.ts`) — единственного места,
где перечислены разделы.

Проверяют, что реестр не разошёлся с тем, что реально лежит в сторе
(`reducers/sections`) и с порядком, который был
в UI до рефакторинга: вкладки в `TabMenu` и абзацы в `Conclusion`.
*/

// порядок вкладок в меню, как он был в TabMenu до реестра
const UI_TAB_ORDER: SectionName[] = [
  "sostoyanie",
  "anamnez",
  "zhaloby",
  "affekt",
  "rech",
  "kognit",
  "pp",
  "diagnoz"
];

// порядок списков в заключении, как он был в Conclusion до реестра
// (`kognit` дважды: «Ориентировка» до «Аффекта», `KognitList` после «Речи»)
const UI_CONCLUSION_ORDER: SectionName[] = [
  "anamnez",
  "sostoyanie",
  "zhaloby",
  "kognit",
  "affekt",
  "rech",
  "kognit",
  "pp",
  "diagnoz"
];

const registryNames = Object.keys(sectionsRegistry) as SectionName[];

// имена custom-блоков, которые layout раздела ждёт в карте components
function customNames(blocks: Layout | undefined): string[] {
  const names: string[] = [];

  (blocks || []).forEach((block: LayoutBlock) => {
    if (block.type === "custom" && block.component) {
      names.push(block.component);
    }

    names.push(...customNames(block.blocks));
  });

  return names;
}

/*
react-redux 9 возвращает мемоизированный компонент, поэтому «компонентность»
проверяется не через `typeof === "function"`, а через наличие `$$typeof`
у функции либо у объекта (`React.memo`).
*/
function isRenderable(component: unknown): boolean {
  return (
    typeof component === "function" ||
    (typeof component === "object" &&
      component !== null &&
      "$$typeof" in component)
  );
}

// коды символов строки: проверка, что вкладка не «поправила» буквы символа
function charCodes(text: string): number[] {
  return [...text].map(char => char.charCodeAt(0));
}

describe("sectionsRegistry", () => {
  it("описывает ровно те разделы, что есть в сторе", () => {
    expect([...registryNames].sort()).toEqual(Object.keys(sections).sort());
    expect(registryNames.length).toBe(8);
  });

  it("у каждой записи имя совпадает с ключом, вкладка подписана", () => {
    registryNames.forEach(name => {
      const entry = sectionsRegistry[name];

      expect(entry.name).toBe(name);
      expect(entry.tab.symbol.length).toBeGreaterThan(0);
      expect(entry.tab.title.length).toBeGreaterThan(0);
    });
  });

  it("для form: \"section\" задаёт layout, иначе — компонент формы", () => {
    registryNames.forEach(name => {
      const entry = sectionsRegistry[name];

      if (entry.form === "section") {
        expect(entry.layout).toBeDefined();
      } else {
        expect(isRenderable(entry.form)).toBe(true);
        expect(entry.layout).toBeUndefined();
      }
    });
  });

  it("custom-блоки layout и карта components согласованы", () => {
    registryNames.forEach(name => {
      const entry = sectionsRegistry[name];

      expect(Object.keys(entry.custom || {}).sort()).toEqual(
        customNames(entry.layout).sort()
      );
    });
  });
});

describe("tabOrder", () => {
  it("содержит 8 уникальных имён в прежнем порядке вкладок", () => {
    expect(tabOrder).toEqual(UI_TAB_ORDER);
    expect(new Set(tabOrder).size).toBe(8);
  });

  it("каждое имя есть в реестре", () => {
    tabOrder.forEach(name => {
      expect(sectionsRegistry[name]).toBeDefined();
    });
  });

  it("символы вкладок не изменились посимвольно", () => {
    // «ОC» и «АH» — кириллическая буква + латинская, как в TabMenu до реестра
    expect(charCodes(sectionsRegistry.sostoyanie.tab.symbol)).toEqual([
      0x41e, 0x43
    ]);
    expect(charCodes(sectionsRegistry.anamnez.tab.symbol)).toEqual([
      0x410, 0x48
    ]);
  });
});

describe("conclusionOrder", () => {
  it("порядок разделов совпадает с прежним UI", () => {
    expect(conclusionOrder.map(item => item.section)).toEqual(
      UI_CONCLUSION_ORDER
    );
  });

  it("каждый элемент выводится в известном абзаце и содержит компонент", () => {
    conclusionOrder.forEach(item => {
      expect([1, 2, 3]).toContain(item.paragraph);
      expect(isRenderable(item.List)).toBe(true);
      expect(sectionsRegistry[item.section]).toBeDefined();
    });
  });

  it("в заключении присутствуют все 8 разделов", () => {
    const used = new Set(conclusionOrder.map(item => item.section));

    expect(used.size).toBe(8);
    registryNames.forEach(name => {
      expect(used.has(name)).toBe(true);
    });
  });
});
