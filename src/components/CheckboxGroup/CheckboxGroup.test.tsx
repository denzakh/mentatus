import { fireEvent } from "@testing-library/react";
import sostoyanieData from "../../store/sostoyanieData";
import {
  createStatusStore,
  renderWithStatus
} from "../../testUtils/statusStore";
import CheckboxGroup from "./index";

/*
Тесты CheckboxGroup: рисует чекбоксы одного цикла схемы (`cicle`) в обёртках
пунктов и пробрасывает `itemClassName` / `autoKritika`. Без имени цикла
группа пустая.
*/

describe("CheckboxGroup", () => {
  it("без имени цикла ничего не рисует", () => {
    const { container } = renderWithStatus(
      <CheckboxGroup cicle="" dataBase={sostoyanieData} />,
      createStatusStore()
    );

    expect(container.innerHTML).toBe("");
  });

  it("рисует все пункты цикла с подписями из схемы", () => {
    const { container } = renderWithStatus(
      <CheckboxGroup cicle="vpech" dataBase={sostoyanieData} />,
      createStatusStore()
    );

    expect(container.querySelectorAll(".list__item").length).toBe(10);
    expect(
      container.querySelector("#checkbox-vpechatleniePodozrit")
    ).not.toBeNull();
    expect(
      container.querySelector('label[for="checkbox-vpechatleniePodozrit"]')
        ?.textContent
    ).toBe("подозрительность");
  });

  it("применяет свой класс обёртки пункта", () => {
    const { container } = renderWithStatus(
      <CheckboxGroup
        cicle="vpech"
        dataBase={sostoyanieData}
        itemClassName="list__item--no-group"
      />,
      createStatusStore()
    );

    expect(
      container.querySelector(
        ".list__item--no-group #checkbox-vpechatleniePodozrit"
      )
    ).not.toBeNull();
  });

  it("передаёт autoKritika в чекбокс пункта", () => {
    const store = createStatusStore();
    const { container } = renderWithStatus(
      <CheckboxGroup cicle="vpech" dataBase={sostoyanieData} autoKritika={4} />,
      store
    );

    fireEvent.click(
      container.querySelector("#checkbox-vpechatlenieDistancia") as HTMLElement
    );

    expect(store.getState().sostoyanie.vpechatlenieDistancia.isChecked).toBe(
      true
    );
    expect(store.getState().sostoyanie.kritika.number).toBe(4);
  });
});
