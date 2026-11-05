import { fireEvent } from "@testing-library/react";
import {
  createStatusStore,
  renderWithStatus
} from "../../testUtils/statusStore";
import CheckboxPol from "./index";

/*
Тесты CheckboxPol: переключатель пола без dataBase, имя поля по умолчанию
`pol`, подписи с двойным пробелом перед стрелкой (дословно как раньше).
*/

describe("CheckboxPol", () => {
  it("рисует женский пол по умолчанию", () => {
    const store = createStatusStore();
    const { container } = renderWithStatus(<CheckboxPol />, store);

    const input = container.querySelector(
      "#checkbox-pol-pol"
    ) as HTMLInputElement;

    expect(input).not.toBeNull();
    expect(input.className).toBe("checkbox__input");
    expect(input.checked).toBe(false);

    const label = container.querySelector('label[for="checkbox-pol-pol"]');

    expect(label?.className).toBe("checkbox__pol");
    expect(label?.textContent).toBe("Пол: женский  ⇄");
  });

  it("переключает пол и подпись", () => {
    const store = createStatusStore();
    const { container } = renderWithStatus(<CheckboxPol />, store);

    fireEvent.click(container.querySelector("#checkbox-pol-pol") as Element);

    expect(store.getState().sostoyanie.pol.isChecked).toBe(true);
    expect(container.querySelector(".checkbox__pol")?.textContent).toBe(
      "Пол: мужской  ⇄"
    );
  });

  it("принимает своё имя поля", () => {
    const store = createStatusStore();
    const { container } = renderWithStatus(<CheckboxPol name="pol" />, store);

    expect(container.querySelector("#checkbox-pol-pol")).not.toBeNull();
  });
});
