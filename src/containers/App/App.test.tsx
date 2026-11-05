import { fireEvent } from "@testing-library/react";
import { tabOrder } from "../../sections/registry";
import {
  createStatusStore,
  renderWithStatus
} from "../../testUtils/statusStore";
import App from "./index";

/*
Тесты App: каркас рабочего экрана на хуках — вкладки, форма активного
раздела и заключение справа. Проверяют, что после перехода с `connect`
на `useSelector` все 8 разделов рендерятся без ошибок и переключение
работает и из меню, и из заключения.
*/

describe("App", () => {
  it("открывает все вкладки разделов", () => {
    const store = createStatusStore();
    const { container } = renderWithStatus(<App />, store);

    tabOrder.forEach(name => {
      const tab = container.querySelector(
        `.tab-menu [data-id="${name}"]`
      ) as Element;

      fireEvent.click(tab);

      expect(container.querySelector(`[data-id="${name}"].is-active`)).not.toBe(
        null
      );
      expect(
        container.querySelector(".tab-render")?.children.length
      ).toBeGreaterThan(0);
    });
  });

  it("переключает раздел кликом по списку в заключении", () => {
    const store = createStatusStore();
    const { container } = renderWithStatus(<App />, store);

    // по умолчанию открыто «Общее состояние»
    expect(
      container.querySelector('[data-id="sostoyanie"].is-active')
    ).not.toBeNull();

    fireEvent.click(
      container.querySelector(
        '.conclusion__text [data-id="zhaloby"]'
      ) as Element
    );

    expect(container.querySelector('[data-id="zhaloby"].is-active')).not.toBe(
      null
    );
  });
});
