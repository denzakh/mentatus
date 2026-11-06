import sostoyanieData from "../../store/sostoyanieData";
import {
  createStatusStore,
  renderWithStatus
} from "../../testUtils/statusStore";
import Group from "./index";

/*
Тесты Group: обёртка над CheckboxGroup для `cicle` из layout раздела.
Без имени цикла группа ничего не рисует.
*/

describe("Group", () => {
  it("без имени цикла ничего не рисует", () => {
    const { container } = renderWithStatus(
      <Group dataBase={sostoyanieData} />,
      createStatusStore()
    );

    expect(container.innerHTML).toBe("");
  });

  it("рисует чекбоксы цикла через CheckboxGroup", () => {
    const { container } = renderWithStatus(
      <Group cicle="vpech" dataBase={sostoyanieData} />,
      createStatusStore()
    );

    expect(
      container.querySelector("#checkbox-vpechatleniePodozrit")
    ).not.toBeNull();
  });
});
