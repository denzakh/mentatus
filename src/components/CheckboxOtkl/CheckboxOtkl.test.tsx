import { fireEvent } from "@testing-library/react";
import dataBase from "../../store/sostoyanieData";
import {
  createStatusStore,
  renderWithStatus
} from "../../testUtils/statusStore";
import CheckboxOtkl from "./index";

/*
Тесты CheckboxOtkl: прежняя разметка (id `checkbox-otkl-<name>`, классы
`.checkbox-otkl*`) и переключение через SET_SYMPTOM.
*/

const LABEL = dataBase.nedobrovolno.label;

describe("CheckboxOtkl", () => {
  it("рисует чекбокс отклонения с подписью из схемы", () => {
    const store = createStatusStore();
    const { container } = renderWithStatus(
      <CheckboxOtkl name="nedobrovolno" dataBase={dataBase} />,
      store
    );

    expect(container.querySelector(".checkbox-otkl")).not.toBeNull();

    const input = container.querySelector(
      "#checkbox-otkl-nedobrovolno"
    ) as HTMLInputElement;

    expect(input).not.toBeNull();
    expect(input.className).toBe("checkbox-otkl__input");
    expect(input.checked).toBe(false);

    const label = container.querySelector(
      'label[for="checkbox-otkl-nedobrovolno"]'
    );

    expect(label?.className).toBe("checkbox-otkl__label");
    expect(label?.textContent).toBe(LABEL);
  });

  it("переключает поле через SET_SYMPTOM", () => {
    const store = createStatusStore();
    const { container } = renderWithStatus(
      <CheckboxOtkl name="nedobrovolno" dataBase={dataBase} />,
      store
    );

    fireEvent.click(
      container.querySelector("#checkbox-otkl-nedobrovolno") as Element
    );

    expect(store.getState().sostoyanie.nedobrovolno.isChecked).toBe(true);
  });

  it("берёт свою подпись вместо схемы", () => {
    const store = createStatusStore();
    const { container } = renderWithStatus(
      <CheckboxOtkl
        name="nedobrovolno"
        label="Своя подпись"
        dataBase={dataBase}
      />,
      store
    );

    expect(
      container.querySelector('label[for="checkbox-otkl-nedobrovolno"]')
        ?.textContent
    ).toBe("Своя подпись");
  });

  it("рисует пустую подпись, если поля нет в схеме", () => {
    const store = createStatusStore();
    const { container } = renderWithStatus(
      <CheckboxOtkl name="unknownField" dataBase={{}} />,
      store
    );

    expect(
      container.querySelector('label[for="checkbox-otkl-unknownField"]')
        ?.textContent
    ).toBe("");
  });
});
