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

  it("открывает «О проекте» и возвращается на рабочий экран по заголовку", () => {
    const store = createStatusStore();
    const { container } = renderWithStatus(<App />, store);

    fireEvent.click(
      container.querySelector('.app__header-menu [data-id="about"]') as Element
    );

    // рабочий экран заменён информационной страницей
    expect(container.querySelector(".tab-render")).toBeNull();
    expect(container.querySelector(".static-page__title")?.textContent).toBe(
      "О проекте"
    );
    expect(
      container
        .querySelector('.app__header-menu [data-id="about"]')
        ?.getAttribute("aria-current")
    ).toBe("page");

    // заголовок app__title ведёт на главную
    fireEvent.click(
      container.querySelector('.app__title [data-id="home"]') as Element
    );

    expect(container.querySelector(".static-page")).toBeNull();
    expect(container.querySelector(".tab-render")).not.toBeNull();
    expect(
      container
        .querySelector('.app__header-menu [data-id="about"]')
        ?.getAttribute("aria-current")
    ).toBeNull();
  });

  it("открывает «Помощь» и возвращает раздел по клику в меню", () => {
    const store = createStatusStore();
    const { container } = renderWithStatus(<App />, store);

    fireEvent.click(
      container.querySelector('.app__header-menu [data-id="help"]') as Element
    );

    expect(container.querySelector(".static-page__title")?.textContent).toBe(
      "Помощь"
    );

    // меню разделов остаётся доступным и возвращает на рабочий экран
    fireEvent.click(
      container.querySelector('.tab-menu [data-id="zhaloby"]') as Element
    );

    expect(container.querySelector(".static-page")).toBeNull();
    expect(container.querySelector('[data-id="zhaloby"].is-active')).not.toBe(
      null
    );
  });

  it("пункты шапки — кнопки, активная помечена aria-current", () => {
    const store = createStatusStore();
    const { container } = renderWithStatus(<App />, store);

    const about = container.querySelector(
      '.app__header-menu [data-id="about"]'
    ) as HTMLElement;

    expect(about.tagName).toBe("BUTTON");
    expect(about.getAttribute("type")).toBe("button");
    expect(about.getAttribute("aria-current")).toBeNull();
  });

  it("переключает мобильный экран между вводом и заключением", () => {
    // в jsdom окно десктопное: сужаем его до мобильного
    const originalWidth = Object.getOwnPropertyDescriptor(window, "innerWidth");
    Object.defineProperty(window, "innerWidth", {
      value: 375,
      configurable: true,
      writable: true
    });

    try {
      const store = createStatusStore();
      const { container } = renderWithStatus(<App />, store);

      // на мобильном видна одна колонка — форма активного раздела
      expect(container.querySelector(".app__manager")).not.toBeNull();
      expect(container.querySelector(".app__conclusion")).toBeNull();

      const toggle = container.querySelector(".app__toggle-btn") as HTMLElement;

      expect(toggle.getAttribute("aria-label")).toBe("К заключению");

      fireEvent.click(toggle);

      expect(container.querySelector(".app__manager")).toBeNull();
      expect(container.querySelector(".app__conclusion")).not.toBeNull();
      expect(toggle.getAttribute("aria-label")).toBe("К вводу");

      fireEvent.click(toggle);

      expect(container.querySelector(".app__manager")).not.toBeNull();
      expect(container.querySelector(".app__conclusion")).toBeNull();
    } finally {
      if (originalWidth) {
        Object.defineProperty(window, "innerWidth", originalWidth);
      }
    }
  });
});

it("пункты меню — кнопки с aria-current у активной вкладки", () => {
  const store = createStatusStore();
  const { container } = renderWithStatus(<App />, store);

  const tab = container.querySelector(
    '.tab-menu [data-id="zhaloby"]'
  ) as HTMLElement;

  expect(tab.tagName).toBe("BUTTON");
  expect(tab.getAttribute("type")).toBe("button");
  expect(
    container
      .querySelector('.tab-menu [data-id="sostoyanie"]')
      ?.getAttribute("aria-current")
  ).toBe("page");
});
