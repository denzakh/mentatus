import { fireEvent } from "@testing-library/react";
import { setText } from "../../actions/fieldActions";
import {
  createStatusStore,
  renderWithStatus
} from "../../testUtils/statusStore";
import type { StatusStore } from "../../testUtils/statusStore";
import DiagnozList from "./index";

/*
Тесты DiagnozList: пункт заключения выводит МКБ-10, клинический диагноз,
дополнение и рекомендации; пустой раздел не рисует абзацев, а клик
по пункту открывает вкладку «Диагноз».
*/

// текст пункта заключения при заданных значениях стора
function diagnozText(
  configure?: (store: StatusStore) => void,
  onToggle?: () => void
) {
  const store = createStatusStore();

  if (configure) {
    configure(store);
  }

  const { container } = renderWithStatus(
    <DiagnozList toggleTab={onToggle} />,
    store
  );

  return container;
}

describe("DiagnozList", () => {
  it("не рисует абзацев, пока диагноз пуст", () => {
    const container = diagnozText();

    expect(container.textContent).toBe("");
    expect(container.querySelectorAll("p").length).toBe(0);
  });

  it("выводит МКБ-10, основной диагноз и дополнение", () => {
    const container = diagnozText(store => {
      store.dispatch(setText("diagnozMkb10", "20.1"));
      store.dispatch(setText("diagnozKlin", "Шизофрения"));
      store.dispatch(setText("diagnozDopolnenie", "F20.1"));
    });

    const text = container.textContent || "";

    expect(text).toContain("Диагноз:");
    expect(text).toContain("F 20.1");
    expect(text).toContain("Шизофрения");
    expect(text).toContain("F20.1");
  });

  it("не выводит «F» без кода МКБ-10", () => {
    const container = diagnozText(store =>
      store.dispatch(setText("diagnozKlin", "Шизофрения"))
    );

    expect(container.textContent || "").toContain("Шизофрения");
    expect(container.textContent || "").not.toContain("F ");
  });

  it("выводит рекомендации и лечение", () => {
    const container = diagnozText(store =>
      store.dispatch(setText("reqilech", "Наблюдение"))
    );

    expect(container.querySelector(".pre")?.textContent).toContain(
      "Наблюдение"
    );
    expect(container.textContent || "").toContain("Рекомендовано:");
  });

  it("открывает вкладку раздела по клику", () => {
    const onToggle = vi.fn();
    const container = diagnozText(undefined, onToggle);

    fireEvent.click(container.firstElementChild as HTMLElement);

    expect(onToggle).toHaveBeenCalledTimes(1);
  });
});
