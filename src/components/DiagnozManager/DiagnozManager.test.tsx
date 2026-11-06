import { fireEvent } from "@testing-library/react";
import { setText } from "../../actions/fieldActions";
import {
  createStatusStore,
  renderWithStatus
} from "../../testUtils/statusStore";
import DiagnozManager from "./index";

/*
Тесты формы «Диагноз»: значения полей берутся из стора, а ввод
диспатчит `setText` под именем поля (`name` input/textarea).
*/

describe("DiagnozManager", () => {
  it("рисует значения полей из стора", () => {
    const store = createStatusStore();
    store.dispatch(setText("diagnozKlin", "Шизофрения"));
    store.dispatch(setText("reqilech", "Наблюдение"));

    const { container } = renderWithStatus(<DiagnozManager />, store);

    const klin = container.querySelector(
      'textarea[name="diagnozKlin"]'
    ) as HTMLTextAreaElement;
    const reqilech = container.querySelector(
      'textarea[name="reqilech"]'
    ) as HTMLTextAreaElement;

    expect(klin.value).toBe("Шизофрения");
    expect(reqilech.value).toBe("Наблюдение");
  });

  it("пишет введённое значение в поле своего среза", () => {
    const store = createStatusStore();
    const { container } = renderWithStatus(<DiagnozManager />, store);

    fireEvent.change(
      container.querySelector('input[name="diagnozMkb10"]') as Element,
      { target: { value: "20.1" } }
    );
    fireEvent.change(
      container.querySelector('textarea[name="diagnozDopolnenie"]') as Element,
      { target: { value: "F20.1" } }
    );

    expect(store.getState().diagnoz.diagnozMkb10.text).toBe("20.1");
    expect(store.getState().diagnoz.diagnozDopolnenie.text).toBe("F20.1");
  });
});
