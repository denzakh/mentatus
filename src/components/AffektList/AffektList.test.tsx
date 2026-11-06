import { setRadio, setSymptom } from "../../actions/fieldActions";
import {
  createStatusStore,
  renderWithStatus
} from "../../testUtils/statusStore";
import type { StatusStore } from "../../testUtils/statusStore";
import AffektList from "./index";

/*
Тесты AffektList: подробности суточных колебаний настроения выводятся
только при включённом поле `nastroyeniyeKolebania`.
*/

// текст пункта заключения при заданных значениях стора
function affektText(configure?: (store: StatusStore) => void): string {
  const store = createStatusStore();

  if (configure) {
    configure(store);
  }

  const { container } = renderWithStatus(<AffektList />, store);
  return container.textContent || "";
}

describe("AffektList", () => {
  it("не выводит суточную динамику без колебаний настроения", () => {
    expect(affektText()).not.toContain("с ухудшением в утренние часы");
  });

  it("выводит выбранную суточную динамику при колебаниях", () => {
    const text = affektText(store => {
      store.dispatch(setSymptom("nastroyeniyeKolebania"));
      store.dispatch(setRadio("nastroyeniyeKolebaniaPodrobno", 1));
    });

    expect(text).toContain("с ухудшением к вечеру");
  });
});
