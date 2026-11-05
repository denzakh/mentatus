import { fireEvent, render } from "@testing-library/react";
import TextField from "./index";

/*
Тесты презентационного поля текста: три варианта разметки
(textarea / inline / date) и сигнал `onChange` с новым значением.
*/

describe("TextField", () => {
  it("рисует многострочное поле в прежней разметке", () => {
    const { container } = render(
      <TextField
        name="vozrast"
        label="Возраст"
        value="42"
        style={{ width: "50%" }}
        onChange={() => {}}
      />
    );

    expect(container.querySelector(".textarea")).not.toBeNull();
    expect(container.querySelector(".textarea__label")?.textContent).toBe(
      "Возраст"
    );

    const input = container.querySelector(
      "textarea.textarea__input"
    ) as HTMLTextAreaElement;

    expect(input).not.toBeNull();
    expect(input.name).toBe("vozrast");
    expect(input.value).toBe("42");
    expect(input.getAttribute("style")).toContain("width: 50%");
  });

  it("рисует короткое поле в строку", () => {
    const { container } = render(
      <TextField
        name="vozrast"
        label="Возраст"
        value="42"
        variant="inline"
        onChange={() => {}}
      />
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
    expect(input.value).toBe("42");
  });

  it("рисует поле даты с типом date", () => {
    const { container } = render(
      <TextField
        name="dataOsmotra"
        label="Дата осмотра"
        value="2020-05-05"
        variant="date"
        onChange={() => {}}
      />
    );

    expect(container.querySelector(".date")).not.toBeNull();
    expect(container.querySelector(".date__label")?.textContent).toBe(
      "Дата осмотра"
    );

    const input = container.querySelector(
      "input.date__input"
    ) as HTMLInputElement;

    expect(input).not.toBeNull();
    expect(input.type).toBe("date");
    expect(input.name).toBe("dataOsmotra");
    expect(input.value).toBe("2020-05-05");
  });

  it("сообщает новый текст поля", () => {
    const onChange = vi.fn();
    const { container } = render(
      <TextField name="vozrast" value="" onChange={onChange} />
    );

    fireEvent.change(container.querySelector("textarea") as Element, {
      target: { value: "42" }
    });

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith("42");
  });

  it("сообщает новую дату", () => {
    const onChange = vi.fn();
    const { container } = render(
      <TextField
        name="dataOsmotra"
        value=""
        variant="date"
        onChange={onChange}
      />
    );

    fireEvent.change(container.querySelector("input") as Element, {
      target: { value: "2021-01-02" }
    });

    expect(onChange).toHaveBeenCalledWith("2021-01-02");
  });
});
