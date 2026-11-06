import { setText } from "../../actions/fieldActions";
import {
  createStatusStore,
  renderWithStatus
} from "../../testUtils/statusStore";
import SonAppetitList from "./index";

/*
Тесты SonAppetitList: потеря веса выводится только при заполненном
`appetitPohudel`.
*/

describe("SonAppetitList", () => {
  it("не выводит потерю веса без значения", () => {
    const { container } = renderWithStatus(
      <SonAppetitList />,
      createStatusStore()
    );

    expect(container.textContent || "").not.toContain("потеря веса");
  });

  it("выводит потерю веса в скобках", () => {
    const store = createStatusStore();
    store.dispatch(setText("appetitPohudel", "5"));

    const { container } = renderWithStatus(<SonAppetitList />, store);

    expect(container.textContent || "").toContain("(потеря веса около 5 кг)");
  });
});
