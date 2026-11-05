
import { fireEvent } from "@testing-library/react";
import sostoyanieData from "../../store/sostoyanieData";
import {
  createStatusStore,
  renderWithStatus
} from "../../testUtils/statusStore";
import type { Layout } from "../../types/layout";
import Section from "./index";

/*
Тесты Section: раздел подписан на один объект видимости блоков
(сравнение `shallowEqual`), поэтому ввод в поле не перерисовывает
ни раздел, ни его блоки. Перерисовку видно по счётчику рендеров
custom-блока.
*/

// счётчик рендеров custom-блока
function createCounter() {
  const counter = { renders: 0 };

  function Counter() {
    counter.renders += 1;
    return <span>counter</span>;
  }

  return { counter, Counter };
}

describe("Section", () => {
  it("рисует блоки layout в прежней разметке", () => {
    const { Counter } = createCounter();
    const layout: Layout = [
      {
        type: "row",
        className: "row",
        title: "Заголовок",
        blocks: [{ type: "br" }]
      },
      { type: "title", text: "Текст" },
      { type: "field", name: "poNapravleniu", component: "Checkbox" }
    ];

    const store = createStatusStore();
    const { container } = renderWithStatus(
      <Section
        section="sostoyanie"
        dataBase={sostoyanieData}
        layout={layout}
        components={{ Counter }}
      />,
      store
    );

    expect(container.querySelector(".row .list__title")?.textContent).toBe(
      "Заголовок"
    );
    expect(container.querySelector(".row br")).not.toBeNull();
    expect(container.querySelector(".list__title")?.textContent).toBe(
      "Заголовок"
    );
    expect(container.querySelector("#checkbox-poNapravleniu")).not.toBeNull();
  });

  it("не перерисовывается при вводе в поле раздела", () => {
    const { counter, Counter } = createCounter();
    const layout: Layout = [
      { type: "field", name: "vozrast" },
      { type: "custom", component: "Counter" }
    ];

    const store = createStatusStore();
    const { container } = renderWithStatus(
      <Section
        section="sostoyanie"
        dataBase={sostoyanieData}
        layout={layout}
        components={{ Counter }}
      />,
      store
    );

    expect(counter.renders).toBe(1);

    fireEvent.change(container.querySelector("textarea") as Element, {
      target: { value: "42" }
    });

    // значение в сторе изменилось, но раздел остался прежним
    expect(store.getState().sostoyanie.vozrast.text).toBe("42");
    expect(counter.renders).toBe(1);
  });

  it("перерисовывается при изменении условий видимости", () => {
    const { counter, Counter } = createCounter();
    const layout: Layout = [
      { type: "field", name: "poNapravleniu", component: "Checkbox" },
      {
        type: "custom",
        component: "Counter",
        visibleWhen: slice => !!slice.poNapravleniu.isChecked
      }
    ];

    const store = createStatusStore();
    const { container } = renderWithStatus(
      <Section
        section="sostoyanie"
        dataBase={sostoyanieData}
        layout={layout}
        components={{ Counter }}
      />,
      store
    );

    // блок скрыт условием видимости
    expect(counter.renders).toBe(0);

    fireEvent.click(
      container.querySelector("#checkbox-poNapravleniu") as Element
    );

    expect(counter.renders).toBe(1);
    expect(container.textContent).toContain("counter");
  });

  it("не рисует custom-блок без компонента", () => {
    const layout: Layout = [{ type: "custom", component: "Nope" }];

    const store = createStatusStore();
    const { container } = renderWithStatus(
      <Section
        section="sostoyanie"
        dataBase={sostoyanieData}
        layout={layout}
      />,
      store
    );

    expect(container.innerHTML).toBe("<div></div>");
  });
});
