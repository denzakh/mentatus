import { setSymptom } from "../../actions/fieldActions";
import {
  createStatusStore,
  renderWithStatus
} from "../../testUtils/statusStore";
import type { StatusStore } from "../../testUtils/statusStore";
import AnamnezList from "./index";

/*
Тесты AnamnezList: собранный анамнез выводится, пока не включено
«не показывать» (`anamnezOtkl`, по умолчанию включено).
*/

// текст пункта заключения при заданных значениях стора
function anamnezText(configure?: (store: StatusStore) => void): string {
  const store = createStatusStore();

  if (configure) {
    configure(store);
  }

  const { container } = renderWithStatus(<AnamnezList />, store);
  return container.textContent || "";
}

describe("AnamnezList", () => {
  it("скрывает собранный анамнез при включённом «не показывать»", () => {
    const text = anamnezText(store =>
      store.dispatch(setSymptom("anamnezChmt"))
    );

    expect(text).not.toContain("ЧМТ");
  });

  it("выводит анамнез, если «не показывать» снят", () => {
    const text = anamnezText(store => {
      store.dispatch(setSymptom("anamnezChmt"));
      store.dispatch(setSymptom("anamnezOtkl"));
    });

    expect(text).toContain("ЧМТ");
  });
});
