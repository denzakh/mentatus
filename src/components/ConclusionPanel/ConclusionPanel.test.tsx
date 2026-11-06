import { fireEvent } from "@testing-library/react";
import { setText } from "../../actions/fieldActions";
import {
  createStatusStore,
  renderWithStatus
} from "../../testUtils/statusStore";
import type { StatusStore } from "../../testUtils/statusStore";
import ConclusionPanel from "./index";

/*
Тесты ConclusionPanel: кнопки «Копировать», «Печать» и «Сбросить».

Копирование берёт текст узла `#conclusion`; если Clipboard API нет или он
не сработал, узел выделяется и вызывается `document.execCommand("copy")`.
`window.print`, `window.confirm` и Clipboard API в jsdom не реализованы,
поэтому в тестах они подменяются.
*/

// подменённые свойства возвращаются к исходным после каждого теста
const restores: (() => void)[] = [];

function stub(target: object, name: string, value: unknown) {
  const original = Object.getOwnPropertyDescriptor(target, name);

  Object.defineProperty(target, name, {
    value,
    configurable: true,
    writable: true
  });

  restores.push(() => {
    if (original) {
      Object.defineProperty(target, name, original);
    } else {
      delete (target as Record<string, unknown>)[name];
    }
  });
}

afterEach(() => {
  while (restores.length) {
    const restore = restores.pop();
    if (restore) {
      restore();
    }
  }
});

// кнопка панели по подписи
function button(container: HTMLElement, label: string): HTMLElement {
  const found = Array.from(container.querySelectorAll("button")).find(
    item => item.textContent === label
  );

  if (!found) {
    throw new Error(`нет кнопки «${label}»`);
  }

  return found as HTMLElement;
}

// панель и узел заключения, текст которого копируется
function renderPanel(store: StatusStore = createStatusStore()) {
  return renderWithStatus(
    <>
      <div id="conclusion">Текст заключения</div>
      <ConclusionPanel />
    </>,
    store
  );
}

describe("ConclusionPanel", () => {
  it("копирует текст заключения через Clipboard API", () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    stub(navigator, "clipboard", { writeText });

    const { container } = renderPanel();

    fireEvent.click(button(container, "Копировать"));

    expect(writeText).toHaveBeenCalledTimes(1);
  });

  it("выделяет заключение и копирует через execCommand без Clipboard API", () => {
    const execCommand = vi.fn(() => true);
    stub(document, "execCommand", execCommand);

    const { container } = renderPanel();

    fireEvent.click(button(container, "Копировать"));

    expect(execCommand).toHaveBeenCalledWith("copy");
  });

  it("переходит на execCommand, если Clipboard API отклонил запись", async () => {
    const writeText = vi.fn().mockRejectedValue(new Error("denied"));
    stub(navigator, "clipboard", { writeText });
    const execCommand = vi.fn(() => true);
    stub(document, "execCommand", execCommand);

    const { container } = renderPanel();

    fireEvent.click(button(container, "Копировать"));
    // отказ обрабатывается в промисе-колбэке
    await Promise.resolve();

    expect(execCommand).toHaveBeenCalledWith("copy");
  });

  it("ничего не копирует, если выделение недоступно", () => {
    const execCommand = vi.fn(() => true);
    stub(document, "execCommand", execCommand);
    stub(window, "getSelection", () => null);

    const { container } = renderPanel();

    fireEvent.click(button(container, "Копировать"));

    expect(execCommand).not.toHaveBeenCalled();
  });

  it("не падает и не копирует без узла заключения", () => {
    const writeText = vi.fn();
    stub(navigator, "clipboard", { writeText });

    const { container } = renderWithStatus(
      <ConclusionPanel />,
      createStatusStore()
    );

    expect(() =>
      fireEvent.click(button(container, "Копировать"))
    ).not.toThrow();
    expect(writeText).not.toHaveBeenCalled();
  });

  it("печатает страницу", () => {
    const print = vi.fn();
    stub(window, "print", print);

    const { container } = renderPanel();

    fireEvent.click(button(container, "Печать"));

    expect(print).toHaveBeenCalledTimes(1);
  });

  it("сбрасывает поля после подтверждения", () => {
    stub(
      window,
      "confirm",
      vi.fn(() => true)
    );

    const store = createStatusStore();
    store.dispatch(setText("vozrast", "42"));

    const { container } = renderPanel(store);
    fireEvent.click(button(container, "Сбросить"));

    expect(store.getState().sostoyanie.vozrast.text).toBe("");
  });

  it("не сбрасывает поля при отказе", () => {
    stub(
      window,
      "confirm",
      vi.fn(() => false)
    );

    const store = createStatusStore();
    store.dispatch(setText("vozrast", "42"));

    const { container } = renderPanel(store);
    fireEvent.click(button(container, "Сбросить"));

    expect(store.getState().sostoyanie.vozrast.text).toBe("42");
  });

  it("предупреждает, если execCommand не сработал", () => {
    stub(document, "execCommand", () => {
      throw new Error("denied");
    });
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});

    const { container } = renderPanel();
    fireEvent.click(button(container, "Копировать"));

    expect(warn).toHaveBeenCalledWith(
      "Не удалось скопировать заключение:",
      "denied"
    );

    warn.mockRestore();
  });

  it("передаёт в предупреждение не-Error как есть", () => {
    stub(document, "execCommand", () => {
      throw "denied";
    });
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});

    const { container } = renderPanel();
    fireEvent.click(button(container, "Копировать"));

    expect(warn).toHaveBeenCalledWith(
      "Не удалось скопировать заключение:",
      "denied"
    );

    warn.mockRestore();
  });

  it("выделяет узел через selectAllChildren без addRange", () => {
    const selectAllChildren = vi.fn();
    stub(window, "getSelection", () => ({
      removeAllRanges: vi.fn(),
      selectAllChildren
    }));
    stub(
      document,
      "execCommand",
      vi.fn(() => true)
    );

    const { container } = renderPanel();
    fireEvent.click(button(container, "Копировать"));

    expect(selectAllChildren).toHaveBeenCalledWith(
      container.querySelector("#conclusion")
    );
  });

  it("копирует без выделения, если Selection API неполный", () => {
    const execCommand = vi.fn(() => true);
    stub(window, "getSelection", () => ({ removeAllRanges: vi.fn() }));
    stub(document, "execCommand", execCommand);

    const { container } = renderPanel();
    fireEvent.click(button(container, "Копировать"));

    // выделить узел нечем, но само копирование всё равно вызывается
    expect(execCommand).toHaveBeenCalledWith("copy");
  });
});
