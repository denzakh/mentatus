import { fireEvent } from "@testing-library/react";
import dataBase from "../../store/kognitData";
import {
  createStatusStore,
  renderWithStatus,
  type StatusStore
} from "../../testUtils/statusStore";
import type { StatusState } from "../../types/status";
import RadioListKogn from "./index";

/*
Тесты RadioListKogn: кроме SET_RADIO, часть ответов (id 1, 2, 3)
выставляет критику, но только если она ещё не задана.
*/

// стор с заранее заполненной критикой
function storeWithKritika(kritika: number): StatusStore {
  const initial = createStatusStore();
  const sostoyanie = initial.getState().sostoyanie;

  return createStatusStore({
    sostoyanie: { ...sostoyanie, kritika: { number: kritika } }
  } as Partial<StatusState>);
}

describe("RadioListKogn", () => {
  it("рисует пункты группы в прежней разметке", () => {
    const store = createStatusStore();
    const { container } = renderWithStatus(
      <RadioListKogn name="kognitOsnivnoi" dataBase={dataBase} />,
      store
    );

    expect(container.querySelector(".radio__list")).not.toBeNull();
    expect(container.querySelectorAll(".radio__item").length).toBe(
      (dataBase.kognitOsnivnoi.data || []).length
    );
  });

  it("выставляет критику по ответу, если она пустая", () => {
    const store = createStatusStore();
    const { container } = renderWithStatus(
      <RadioListKogn name="kognitOsnivnoi" dataBase={dataBase} />,
      store
    );

    fireEvent.click(container.querySelector("#kognitOsnivnoi2") as Element);

    expect(store.getState().kognit.kognitOsnivnoi.number).toBe(2);
    expect(store.getState().sostoyanie.kritika.number).toBe(3);
  });

  it("не перезаписывает уже выставленную критику", () => {
    const store = storeWithKritika(4);
    const { container } = renderWithStatus(
      <RadioListKogn name="kognitOsnivnoi" dataBase={dataBase} />,
      store
    );

    fireEvent.click(container.querySelector("#kognitOsnivnoi1") as Element);

    expect(store.getState().kognit.kognitOsnivnoi.number).toBe(1);
    expect(store.getState().sostoyanie.kritika.number).toBe(4);
  });

  it("не трогает критику для ответа без авто-значения", () => {
    const store = createStatusStore();
    const { container } = renderWithStatus(
      <RadioListKogn name="kognitOsnivnoi" dataBase={dataBase} />,
      store
    );

    fireEvent.click(container.querySelector("#kognitOsnivnoi0") as Element);

    expect(store.getState().kognit.kognitOsnivnoi.number).toBe(0);
    expect(store.getState().sostoyanie.kritika.number).toBe(0);
  });
});
