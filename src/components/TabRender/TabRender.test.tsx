import { render } from "@testing-library/react";
import {
  createStatusStore,
  renderWithStatus
} from "../../testUtils/statusStore";
import TabRender from "./index";

/*
Тесты TabRender: форма активного раздела берётся из реестра — либо
декларативная `<Section>` (schema + layout), либо собственная форма.

Реестр подменён: в настоящем нет раздела с формой `"section"` без layout,
а защитную ветку «нет layout» нужно проверить отдельно.
*/

vi.mock("../../sections/registry", () => ({
  sectionsRegistry: {
    sostoyanie: {
      name: "sostoyanie",
      tab: { symbol: "ОС", title: "Общее состояние" },
      schema: {},
      layout: [{ type: "br" }],
      form: "section"
    },
    anamnez: {
      name: "anamnez",
      tab: { symbol: "АН", title: "Анамнез" },
      schema: {},
      form: "section"
    },
    diagnoz: {
      name: "diagnoz",
      tab: { symbol: "ДЗ", title: "Диагноз" },
      schema: {},
      form: () => null
    }
  }
}));

describe("TabRender", () => {
  it("ничего не рисует для неизвестной вкладки", () => {
    const { container } = render(<TabRender activeTab="unknown" />);

    expect(container.querySelector(".tab-render")?.children.length).toBe(0);
  });

  it("рисует заголовок и декларативную форму раздела", () => {
    const store = createStatusStore();
    const { container } = renderWithStatus(
      <TabRender activeTab="sostoyanie" />,
      store
    );

    expect(container.querySelector(".app__tab-title")?.textContent).toBe(
      "Общее состояние"
    );
    expect(container.querySelector(".tab-render br")).not.toBeNull();
  });

  it("не рисует раздел с формой section без layout", () => {
    const store = createStatusStore();
    const { container } = renderWithStatus(
      <TabRender activeTab="anamnez" />,
      store
    );

    expect(container.querySelector(".tab-render")?.children.length).toBe(0);
  });

  it("рисует собственную форму раздела", () => {
    const { container } = render(<TabRender activeTab="diagnoz" />);

    expect(container.querySelector(".app__tab-title")?.textContent).toBe(
      "Диагноз"
    );
    expect(container.querySelector(".tab-render")?.children.length).toBe(1);
  });
});
