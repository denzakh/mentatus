import { fireEvent } from "@testing-library/react";
import dataBase from "../../store/sostoyanieData";
import {
  createStatusStore,
  renderWithStatus,
  type StatusStore
} from "../../testUtils/statusStore";
import type { StatusState } from "../../types/status";
import Checkbox from "./index";

/*
Тесты Checkbox: прежняя разметка (id `checkbox-<name>`), переключение
через SET_SYMPTOM и авто-критика, которая выставляется только при пустой.
*/

const LABEL = dataBase.poNapravleniu.label;

// стор с заранее заполненной критикой
function storeWithKritika(kritika: number): StatusStore {
  const initial = createStatusStore();
  const sostoyanie = initial.getState().sostoyanie;

  return createStatusStore({
    sostoyanie: { ...sostoyanie, kritika: { number: kritika } }
  } as Partial<StatusState>);
}

describe("Checkbox", () => {
  it("рисует чекбокс с подписью из схемы", () => {
    const store = createStatusStore();
    const { container } = renderWithStatus(
      <Checkbox name="poNapravleniu" dataBase={dataBase} />,
      store
    );

    const input = container.querySelector(
      "#checkbox-poNapravleniu"
    ) as HTMLInputElement;

    expect(input).not.toBeNull();
    expect(input.className).toBe("checkbox__input");
    expect(input.name).toBe("poNapravleniu");
    expect(input.checked).toBe(false);

    const label = container.querySelector(
      'label[for="checkbox-poNapravleniu"]'
    );

    expect(label?.className).toBe("checkbox__label");
    expect(label?.textContent).toBe(LABEL);
  });

  it("своя подпись важнее подписи из схемы", () => {
    const store = createStatusStore();
    const { container } = renderWithStatus(
      <Checkbox name="poNapravleniu" dataBase={dataBase} label="своя" />,
      store
    );

    expect(container.querySelector(".checkbox__label")?.textContent).toBe(
      "своя"
    );
  });

  it("переключает поле через SET_SYMPTOM", () => {
    const store = createStatusStore();
    const { container } = renderWithStatus(
      <Checkbox name="poNapravleniu" dataBase={dataBase} />,
      store
    );

    fireEvent.click(
      container.querySelector("#checkbox-poNapravleniu") as Element
    );

    expect(store.getState().sostoyanie.poNapravleniu.isChecked).toBe(true);
    expect(store.getState().sostoyanie.kritika.number).toBe(0);
  });

  it("выставляет авто-критику, если она пустая", () => {
    const store = createStatusStore();
    const { container } = renderWithStatus(
      <Checkbox name="poNapravleniu" dataBase={dataBase} autoKritika={2} />,
      store
    );

    fireEvent.click(
      container.querySelector("#checkbox-poNapravleniu") as Element
    );

    expect(store.getState().sostoyanie.kritika.number).toBe(2);
    expect(store.getState().sostoyanie.poNapravleniu.isChecked).toBe(true);
  });

  it("не перезаписывает уже выставленную критику", () => {
    const store = storeWithKritika(4);
    const { container } = renderWithStatus(
      <Checkbox name="poNapravleniu" dataBase={dataBase} autoKritika={2} />,
      store
    );

    fireEvent.click(
      container.querySelector("#checkbox-poNapravleniu") as Element
    );

    expect(store.getState().sostoyanie.kritika.number).toBe(4);
  });
});
