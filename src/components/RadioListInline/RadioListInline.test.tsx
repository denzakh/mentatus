import { fireEvent } from "@testing-library/react";
import dataBase from "../../store/kognitData";
import {
  createStatusStore,
  renderWithStatus
} from "../../testUtils/statusStore";
import RadioListInline from "./index";

/*
Тесты RadioListInline: подпись группы и пункты в одну строку
(классы прежней разметки), клик отправляет SET_RADIO.
*/

const OPTIONS = dataBase.kognitFingerN.data || [];

describe("RadioListInline", () => {
  it("рисует подпись группы и пункты в строку", () => {
    const store = createStatusStore();
    const { container } = renderWithStatus(
      <RadioListInline name="kognitFingerN" dataBase={dataBase} />,
      store
    );

    expect(container.querySelector(".radio__list")).toBeNull();
    expect(container.querySelector(".radio__inline")).not.toBeNull();
    expect(container.querySelector(".radio__inline-label")?.textContent).toBe(
      dataBase.kognitFingerN.label + " "
    );
    expect(container.querySelectorAll(".radio__inline-item").length).toBe(
      OPTIONS.length
    );
    expect(
      (container.querySelector("#kognitFingerN0") as HTMLInputElement).checked
    ).toBe(true);
  });

  it("клик по пункту отправляет SET_RADIO", () => {
    const store = createStatusStore();
    const { container } = renderWithStatus(
      <RadioListInline name="kognitFingerN" dataBase={dataBase} />,
      store
    );

    fireEvent.click(container.querySelector("#kognitFingerN3") as Element);

    expect(store.getState().kognit.kognitFingerN.number).toBe(3);
  });

  it("рисует пустую подпись, если группы нет в схеме", () => {
    const store = createStatusStore();
    const { container } = renderWithStatus(
      <RadioListInline name="unknownRadio" dataBase={{}} />,
      store
    );

    expect(container.querySelector(".radio__inline-label")?.textContent).toBe(
      " "
    );
    expect(container.querySelectorAll(".radio__inline-item").length).toBe(0);
  });
});
