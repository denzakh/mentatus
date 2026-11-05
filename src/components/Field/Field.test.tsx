import { fireEvent } from "@testing-library/react";
import dataBase from "../../store/sostoyanieData";
import {
  createStatusStore,
  renderWithStatus
} from "../../testUtils/statusStore";
import Field from "./index";

/*
Тесты Field: поле выбирается по типу схемы (`formByType`) или по имени
компонента из layout (`formByName`), оба реестра — в `fields/registry`.
*/

describe("Field", () => {
  it("по типу boolean рисует чекбокс", () => {
    const store = createStatusStore();
    const { container } = renderWithStatus(
      <Field name="poNapravleniu" dataBase={dataBase} />,
      store
    );

    expect(container.querySelector("#checkbox-poNapravleniu")).not.toBeNull();
    expect(container.querySelector(".checkbox__label")?.textContent).toBe(
      "по направлению"
    );
  });

  it("по типу radio рисует радиогруппу", () => {
    const store = createStatusStore();
    const { container } = renderWithStatus(
      <Field name="mestoOsmotra" dataBase={dataBase} />,
      store
    );

    expect(container.querySelector(".radio__list")).not.toBeNull();
    expect(
      (container.querySelector("#mestoOsmotra1") as HTMLInputElement).checked
    ).toBe(true);
  });

  it("по типу text рисует поле текста", () => {
    const store = createStatusStore();
    const { container } = renderWithStatus(
      <Field name="vozrast" dataBase={dataBase} />,
      store
    );

    expect(container.querySelector("textarea.textarea__input")).not.toBeNull();
  });

  it("не рисует поле без ввода (тип number)", () => {
    const store = createStatusStore();
    const { container } = renderWithStatus(
      <Field name="patientId" dataBase={dataBase} />,
      store
    );

    expect(container.innerHTML).toBe("");
  });

  it("по имени компонента рисует свою реализацию", () => {
    const store = createStatusStore();
    const { container } = renderWithStatus(
      <Field
        name="nedobrovolno"
        dataBase={dataBase}
        component="CheckboxOtkl"
      />,
      store
    );

    expect(container.querySelector(".checkbox-otkl__input")).not.toBeNull();
  });

  it("передаёт свою подпись и autoKritika", () => {
    const store = createStatusStore();
    const { container } = renderWithStatus(
      <Field
        name="poNapravleniu"
        dataBase={dataBase}
        component="Checkbox"
        label="своя подпись"
        autoKritika={3}
      />,
      store
    );

    expect(container.querySelector(".checkbox__label")?.textContent).toBe(
      "своя подпись"
    );

    fireEvent.click(
      container.querySelector("#checkbox-poNapravleniu") as Element
    );

    expect(store.getState().sostoyanie.kritika.number).toBe(3);
  });

  it("не рисует ничего для неизвестного компонента и поля", () => {
    const store = createStatusStore();
    const unknownComponent = renderWithStatus(
      <Field name="vozrast" dataBase={dataBase} component="Nope" />,
      store
    );
    const unknownField = renderWithStatus(<Field name="netTakogo" />, store);

    expect(unknownComponent.container.innerHTML).toBe("");
    expect(unknownField.container.innerHTML).toBe("");
  });
});
