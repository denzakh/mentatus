import { fireEvent } from "@testing-library/react";
import { setText } from "../../actions/fieldActions";
import {
  createStatusStore,
  renderWithStatus
} from "../../testUtils/statusStore";
import InputDate from "./index";

/*
Тесты InputDate: разметка общего `TextField` (variant="date"),
свои стили не применяются (как и раньше), ввод отправляет SET_TEXT.
*/

describe("InputDate", () => {
  it("рисует поле даты и подпись", () => {
    const store = createStatusStore();
    const { container } = renderWithStatus(
      <InputDate name="dataOsmotra" label="Дата осмотра" />,
      store
    );

    expect(container.querySelector(".date__label")?.textContent).toBe(
      "Дата осмотра"
    );

    const input = container.querySelector(
      "input.date__input"
    ) as HTMLInputElement;

    expect(input).not.toBeNull();
    expect(input.type).toBe("date");
    expect(input.name).toBe("dataOsmotra");
    expect(input.value).toBe(store.getState().sostoyanie.dataOsmotra.text);
  });

  it("не применяет style (в отличие от Textarea)", () => {
    const store = createStatusStore();
    const { container } = renderWithStatus(
      <InputDate
        name="dataOsmotra"
        label="Дата осмотра"
        style={{ width: "40%" }}
      />,
      store
    );

    expect(
      container.querySelector("input.date__input")?.getAttribute("style")
    ).toBeNull();
  });

  it("берёт значение из стора", () => {
    const store = createStatusStore();
    store.dispatch(setText("dataOsmotra", "2020-05-05"));

    const { container } = renderWithStatus(
      <InputDate name="dataOsmotra" label="Дата осмотра" />,
      store
    );

    expect((container.querySelector("input") as HTMLInputElement).value).toBe(
      "2020-05-05"
    );
  });

  it("ввод даты отправляет SET_TEXT", () => {
    const store = createStatusStore();
    const { container } = renderWithStatus(
      <InputDate name="dataOsmotra" label="Дата осмотра" />,
      store
    );

    fireEvent.change(container.querySelector("input") as Element, {
      target: { value: "2021-01-02" }
    });

    expect(store.getState().sostoyanie.dataOsmotra.text).toBe("2021-01-02");
  });
});
