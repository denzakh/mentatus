import { fireEvent, render } from "@testing-library/react";
import RadioOptions from "./index";
import type { RadioOption } from "../../types/schema";

/*
Тесты презентационной радиогруппы: разметка (классы, id, name, подписи)
и сигнал `onChange` с номером выбранного пункта. Разметка должна совпадать
с прежними RadioList / RadioListInline.
*/

const OPTIONS: RadioOption[] = [
  { id: 0, label: "на дому", phrase: "на дому" },
  { id: 2, label: "на отделении", phrase: "на отделении" }
];

describe("RadioOptions", () => {
  it("рисует список пунктов в прежней разметке", () => {
    const { container } = render(
      <RadioOptions
        name="mesto"
        options={OPTIONS}
        selected={2}
        onChange={() => {}}
      />
    );

    const list = container.querySelector(".radio__list");

    expect(list).not.toBeNull();
    expect(list?.children.length).toBe(2);
    expect(container.querySelectorAll(".radio__item").length).toBe(2);
    expect(container.querySelector(".radio__inline")).toBeNull();

    const first = container.querySelector("#mesto0") as HTMLInputElement;

    expect(first.type).toBe("radio");
    expect(first.className).toBe("radio__input");
    expect(first.name).toBe("mesto");
    expect(first.value).toBe("0");
    expect(first.checked).toBe(false);

    const second = container.querySelector("#mesto2") as HTMLInputElement;

    expect(second.checked).toBe(true);

    const label = container.querySelector('label[for="mesto2"]');

    expect(label?.className).toBe("radio__label");
    expect(label?.textContent).toBe("на отделении");
  });

  it("рисует вариант в строку: подпись группы и пункты", () => {
    const { container } = render(
      <RadioOptions
        name="myshlenie"
        options={OPTIONS}
        label="темп"
        variant="inline"
        onChange={() => {}}
      />
    );

    expect(container.querySelector(".radio__list")).toBeNull();
    expect(container.querySelector(".radio__inline")).not.toBeNull();

    // подпись группы идёт с завершающим пробелом, как в прежней разметке
    expect(container.querySelector(".radio__inline-label")?.textContent).toBe(
      "темп "
    );

    expect(container.querySelectorAll(".radio__inline-item").length).toBe(2);
    expect(container.querySelector(".radio__item")).toBeNull();
    expect(container.querySelector("#myshlenie2")).not.toBeNull();
  });

  it("позволяет переопределить класс пункта", () => {
    const { container } = render(
      <RadioOptions
        name="mesto"
        options={OPTIONS}
        itemClassName="list__item"
        onChange={() => {}}
      />
    );

    expect(container.querySelectorAll(".list__item").length).toBe(2);
    expect(container.querySelector(".radio__item")).toBeNull();
  });

  it("сообщает номер выбранного пункта", () => {
    const onChange = vi.fn();
    const { container } = render(
      <RadioOptions name="mesto" options={OPTIONS} onChange={onChange} />
    );

    fireEvent.click(container.querySelector("#mesto2") as HTMLInputElement);

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith(2);
  });
});
