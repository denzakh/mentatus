import React, { Profiler } from "react";
import { act, fireEvent } from "@testing-library/react";
import { setRadio, setText } from "../../actions/fieldActions";
import sostoyanieData from "../../store/sostoyanieData";
import {
  createStatusStore,
  renderWithStatus
} from "../../testUtils/statusStore";
import Field from "../Field";
import Conclusion from "./index";

/*
Тесты Conclusion: ввод в поле не перерисовывает заключение — Profiler
считает коммиты своего поддерева, а поле ввода стоит вне него. Смена
видимости описательной части, наоборот, перерисовывает заключение
и скрывает списки, помеченные `hiddenWhenDescriptive`.
*/

// заключение с фиксированной датой осмотра + поле ввода вне Profiler
function renderConclusion() {
  const store = createStatusStore();
  store.dispatch(setText("dataOsmotra", "2020-05-05"));

  const onRender = vi.fn();
  const view = renderWithStatus(
    <>
      <Profiler id="conclusion" onRender={onRender}>
        <Conclusion toggleTab={() => {}} />
      </Profiler>
      <Field name="vozrast" dataBase={sostoyanieData} />
    </>,
    store
  );

  return { store, onRender, ...view };
}

describe("Conclusion", () => {
  it("не перерисовывается при вводе в поле", () => {
    const { onRender, container } = renderConclusion();
    const mountRenders = onRender.mock.calls.length;

    fireEvent.change(container.querySelector("textarea") as Element, {
      target: { value: "42" }
    });

    expect(onRender.mock.calls.length).toBe(mountRenders);
  });

  it("скрывает описательную часть при недоступном контакте", () => {
    const { store, onRender, container } = renderConclusion();
    const mountRenders = onRender.mock.calls.length;

    // по умолчанию описательная часть выводится
    expect(container.querySelector('[data-id="zhaloby"]')).not.toBeNull();
    expect(container.querySelector('[data-id="anamnez"]')).not.toBeNull();

    act(() => {
      store.dispatch(setRadio("kontakt", 2));
    });

    // заключение перерисовалось: скрылись жалобы, анамнез остался
    expect(onRender.mock.calls.length).toBeGreaterThan(mountRenders);
    expect(container.querySelector('[data-id="zhaloby"]')).toBeNull();
    expect(container.querySelector('[data-id="anamnez"]')).not.toBeNull();
  });
});
