import { setRadio, setSymptom } from "../../actions/fieldActions";
import {
  createStatusStore,
  renderWithStatus
} from "../../testUtils/statusStore";
import type { StatusStore } from "../../testUtils/statusStore";
import ZhalobyList from "./index";

/*
Тесты ZhalobyList: отмеченные жалобы выводятся, пока описательная часть
не скрыта — например, при недоступном контакте (`kontakt = 2`).
*/

// текст пункта заключения при заданных значениях стора
function zhalobyText(configure?: (store: StatusStore) => void): string {
  const store = createStatusStore();

  if (configure) {
    configure(store);
  }

  const { container } = renderWithStatus(<ZhalobyList />, store);
  return container.textContent || "";
}

describe("ZhalobyList", () => {
  it("выводит отмеченные жалобы", () => {
    const text = zhalobyText(store =>
      store.dispatch(setSymptom("zhalobyTrevoga"))
    );

    expect(text).toContain("тревогу");
  });

  it("скрывает жалобы при недоступном контакте", () => {
    const text = zhalobyText(store => {
      store.dispatch(setSymptom("zhalobyTrevoga"));
      store.dispatch(setRadio("kontakt", 2));
    });

    expect(text).not.toContain("тревогу");
  });
});
