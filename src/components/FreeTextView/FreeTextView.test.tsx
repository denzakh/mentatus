import { setText } from "../../actions/fieldActions";
import affektData from "../../store/affektData";
import sostoyanieData from "../../store/sostoyanieData";
import {
  createStatusStore,
  renderWithStatus
} from "../../testUtils/statusStore";
import FreeTextView from "./index";

/*
Тесты FreeTextView: поля с фразами обрамления выводятся вместе с ними
(`FreeTextBeforeAndAfter`), остальные — только текстом (`FreeText`).
*/

describe("FreeTextView", () => {
  it("рисует текст с обрамлением из схемы", () => {
    const store = createStatusStore();
    store.dispatch(setText("appetitPohudel", "5"));

    const { container } = renderWithStatus(
      <FreeTextView name="appetitPohudel" dataObj={affektData} />,
      store
    );

    expect(container.textContent).toBe(" (потеря веса около 5 кг)");
  });

  it("рисует свободный текст поля", () => {
    const store = createStatusStore();
    store.dispatch(setText("vozrast", "42"));

    const { container } = renderWithStatus(
      <FreeTextView name="vozrast" dataObj={sostoyanieData} />,
      store
    );

    expect(container.textContent).toBe(" 42");
  });

  it("пуст для поля без значения и записи в схеме", () => {
    const { container } = renderWithStatus(
      <FreeTextView name="vozrast" dataObj={{}} />,
      createStatusStore()
    );

    expect(container.textContent).toBe(" ");
  });
});
