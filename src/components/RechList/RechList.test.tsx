import { fireEvent } from "@testing-library/react";
import { setRadio, setSymptom } from "../../actions/fieldActions";
import {
  createStatusStore,
  renderWithStatus
} from "../../testUtils/statusStore";
import type { StatusStore } from "../../testUtils/statusStore";
import RechList from "./index";

/*
Тесты RechList: пункт «Мышление и речь» выводит ответы по существу,
односложные ответы, «не отвечает» и скрывает основную часть, когда
контакт недоступен (`kontakt = 2`).
*/

// текст пункта заключения при заданных значениях стора
function rechText(
  configure?: (store: StatusStore) => void,
  onToggle?: () => void
): string {
  const store = createStatusStore();

  if (configure) {
    configure(store);
  }

  const { container } = renderWithStatus(
    <RechList toggleTab={onToggle} />,
    store
  );

  return container.textContent || "";
}

describe("RechList", () => {
  it("выводит выбранный вариант ответов", () => {
    expect(rechText()).toContain("Ответы по существу");
  });

  it("добавляет односложные ответы", () => {
    expect(
      rechText(store => store.dispatch(setSymptom("rechOdnosloj")))
    ).toContain("односложные");
  });

  it("заменяет ответы фразой «не отвечает»", () => {
    const text = rechText(store =>
      store.dispatch(setSymptom("rechNeotvechaet"))
    );

    expect(text).toContain("На вопросы не отвечает");
    expect(text).not.toContain("Ответы по существу");
  });

  it("скрывает основную часть при недоступном контакте", () => {
    const text = rechText(store => store.dispatch(setRadio("kontakt", 2)));

    expect(text).not.toContain("Ответы по существу");
  });

  it("оставляет фразу «не отвечает» в скрытой части", () => {
    const text = rechText(store => {
      store.dispatch(setRadio("kontakt", 2));
      store.dispatch(setSymptom("rechNeotvechaet"));
    });

    expect(text).toContain("На вопросы не отвечает");
  });

  it("открывает вкладку раздела по клику", () => {
    const onToggle = vi.fn();
    const store = createStatusStore();
    const { container } = renderWithStatus(
      <RechList toggleTab={onToggle} />,
      store
    );

    fireEvent.click(container.firstElementChild as HTMLElement);

    expect(onToggle).toHaveBeenCalledTimes(1);
  });
});
