import { setSymptom } from "../../actions/fieldActions";
import {
  createStatusStore,
  renderWithStatus
} from "../../testUtils/statusStore";
import type { StatusStore } from "../../testUtils/statusStore";
import PpList from "./index";

/*
Тесты PpList: бред, галлюцинации и опасные тенденции выводятся, пока
не включены «не показывать» (`bredOtkl`, `gallOtkl`, `opasnyeOtkl`).
*/

// текст пункта заключения при заданных значениях стора
function ppText(configure?: (store: StatusStore) => void): string {
  const store = createStatusStore();

  if (configure) {
    configure(store);
  }

  const { container } = renderWithStatus(<PpList />, store);
  return container.textContent || "";
}

describe("PpList", () => {
  it("выводит бред, галлюцинации и опасные тенденции", () => {
    const text = ppText(store => {
      store.dispatch(setSymptom("bredDepress"));
      store.dispatch(setSymptom("gallSluh"));
    });

    expect(text).toContain("депрессивного характера");
    expect(text).toContain("слуховых");
    expect(text).toContain("Суицидальные мысли отрицает");
  });

  it("скрывает части, помеченные «не показывать»", () => {
    const text = ppText(store => {
      store.dispatch(setSymptom("bredDepress"));
      store.dispatch(setSymptom("gallSluh"));
      store.dispatch(setSymptom("bredOtkl"));
      store.dispatch(setSymptom("gallOtkl"));
      store.dispatch(setSymptom("opasnyeOtkl"));
    });

    expect(text).not.toContain("депрессивного характера");
    expect(text).not.toContain("слуховых");
    expect(text).not.toContain("Суицидальные мысли отрицает");
  });
});
