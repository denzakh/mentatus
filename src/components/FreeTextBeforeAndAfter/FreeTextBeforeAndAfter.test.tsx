import { setText } from "../../actions/fieldActions";
import affektData from "../../store/affektData";
import {
  createStatusStore,
  renderWithStatus
} from "../../testUtils/statusStore";
import type { Schema } from "../../types/schema";
import FreeTextBeforeAndAfter from "./index";

/*
Тесты FreeTextBeforeAndAfter: текст поля выводится вместе с фразами
обрамления из схемы раздела (`before` + текст + `after`).
*/

describe("FreeTextBeforeAndAfter", () => {
  it("выводит текст с фразами обрамления", () => {
    const store = createStatusStore();
    store.dispatch(setText("appetitPohudel", "5"));

    const { container } = renderWithStatus(
      <FreeTextBeforeAndAfter name="appetitPohudel" dataObj={affektData} />,
      store
    );

    expect(container.textContent).toBe(" (потеря веса около 5 кг)");
  });

  it("выводит только обрамление, если значение не задано", () => {
    const dataObj: Schema = {
      unknownField: {
        type: "text",
        section: "affekt",
        before: " (",
        after: ")"
      }
    };

    const { container } = renderWithStatus(
      <FreeTextBeforeAndAfter name="unknownField" dataObj={dataObj} />,
      createStatusStore()
    );

    expect(container.textContent).toBe(" ()");
  });

  it("пуст, если поля нет в схеме", () => {
    const { container } = renderWithStatus(
      <FreeTextBeforeAndAfter name="unknownField" dataObj={{}} />,
      createStatusStore()
    );

    expect(container.textContent).toBe("");
  });
});
