import { fireEvent } from "@testing-library/react";
import dataBase from "../../store/sostoyanieData";
import {
  createStatusStore,
  renderWithStatus
} from "../../testUtils/statusStore";
import RadioList from "./index";

/*
Тесты RadioList: компонент читает пункты группы из схемы раздела и номер
выбранного пункта из стора, а клик по пункту отправляет SET_RADIO.
*/

const OPTIONS = dataBase.mestoOsmotra.data || [];

describe("RadioList", () => {
  it("читает пункты из схемы и отмечает выбранный", () => {
    const store = createStatusStore();
    const { container } = renderWithStatus(
      <RadioList name="mestoOsmotra" dataBase={dataBase} />,
      store
    );

    expect(container.querySelectorAll(".radio__item").length).toBe(
      OPTIONS.length
    );
    expect(container.querySelector(".radio__list")).not.toBeNull();

    const checked = container.querySelector(
      "#mestoOsmotra1"
    ) as HTMLInputElement;

    // в начальном сторе выбран пункт «в ПНД» (id 1)
    expect(checked.checked).toBe(true);
  });

  it("клик по пункту отправляет SET_RADIO", () => {
    const store = createStatusStore();
    const { container } = renderWithStatus(
      <RadioList name="mestoOsmotra" dataBase={dataBase} />,
      store
    );

    fireEvent.click(container.querySelector("#mestoOsmotra3") as Element);

    expect(store.getState().sostoyanie.mestoOsmotra.number).toBe(3);
  });
});
