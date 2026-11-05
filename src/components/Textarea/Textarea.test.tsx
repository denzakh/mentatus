import { fireEvent } from "@testing-library/react";
import { setText } from "../../actions/fieldActions";
import {
  createStatusStore,
  renderWithStatus
} from "../../testUtils/statusStore";
import Textarea from "./index";

/*
Тесты Textarea: разметка общего `TextField` (variant="textarea"),
свои стили поля и отправка SET_TEXT при вводе.
*/

describe("Textarea", () => {
  it("рисует многострочное поле и подпись", () => {
    const store = createStatusStore();
    const { container } = renderWithStatus(
      <Textarea name="vozrast" label="Возраст" style={{ width: "40%" }} />,
      store
    );

    expect(container.querySelector(".textarea__label")?.textContent).toBe(
      "Возраст"
    );

    const input = container.querySelector(
      "textarea.textarea__input"
    ) as HTMLTextAreaElement;

    expect(input).not.toBeNull();
    expect(input.name).toBe("vozrast");
    expect(input.value).toBe("");
    expect(input.getAttribute("style")).toContain("width: 40%");
  });

  it("берёт значение из стора", () => {
    const store = createStatusStore();
    store.dispatch(setText("vozrast", "42"));

    const { container } = renderWithStatus(
      <Textarea name="vozrast" label="Возраст" />,
      store
    );

    expect(
      (container.querySelector("textarea") as HTMLTextAreaElement).value
    ).toBe("42");
  });

  it("ввод текста отправляет SET_TEXT", () => {
    const store = createStatusStore();
    const { container } = renderWithStatus(
      <Textarea name="vozrast" label="Возраст" />,
      store
    );

    fireEvent.change(container.querySelector("textarea") as Element, {
      target: { value: "42" }
    });

    expect(store.getState().sostoyanie.vozrast.text).toBe("42");
  });
});
