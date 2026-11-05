import { fireEvent } from "@testing-library/react";
import { setText } from "../../actions/fieldActions";
import {
  createStatusStore,
  renderWithStatus
} from "../../testUtils/statusStore";
import TextareaInline from "./index";

/*
Тесты TextareaInline: разметка общего `TextField` (variant="inline")
и отправка SET_TEXT при вводе.
*/

describe("TextareaInline", () => {
  it("рисует короткое поле в строку", () => {
    const store = createStatusStore();
    const { container } = renderWithStatus(
      <TextareaInline name="vozrast" label="Возраст" />,
      store
    );

    expect(container.querySelector(".textarea-inline")).not.toBeNull();
    expect(
      container.querySelector(".textarea-inline__label")?.textContent
    ).toBe("Возраст");

    const input = container.querySelector(
      "textarea.textarea-inline__input"
    ) as HTMLTextAreaElement;

    expect(input).not.toBeNull();
    expect(input.name).toBe("vozrast");
    expect(input.value).toBe("");
  });

  it("берёт значение из стора", () => {
    const store = createStatusStore();
    store.dispatch(setText("vozrast", "42"));

    const { container } = renderWithStatus(
      <TextareaInline name="vozrast" label="Возраст" />,
      store
    );

    expect(
      (container.querySelector("textarea") as HTMLTextAreaElement).value
    ).toBe("42");
  });

  it("ввод текста отправляет SET_TEXT", () => {
    const store = createStatusStore();
    const { container } = renderWithStatus(
      <TextareaInline name="vozrast" label="Возраст" />,
      store
    );

    fireEvent.change(container.querySelector("textarea") as Element, {
      target: { value: "42" }
    });

    expect(store.getState().sostoyanie.vozrast.text).toBe("42");
  });
});
