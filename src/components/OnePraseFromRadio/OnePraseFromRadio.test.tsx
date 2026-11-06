import { setRadio } from "../../actions/fieldActions";
import sostoyanieData from "../../store/sostoyanieData";
import {
  createStatusStore,
  renderWithStatus
} from "../../testUtils/statusStore";
import type { Schema } from "../../types/schema";
import OnePraseFromRadio from "./index";

/*
Тесты OnePraseFromRadio: фраза выбранного пункта радиогруппы.
Если поля ещё нет в сторе, берётся первый пункт группы.
*/

describe("OnePraseFromRadio", () => {
  it("рисует фразу выбранного пункта", () => {
    const store = createStatusStore();
    store.dispatch(setRadio("mestoOsmotra", 1));

    const { container } = renderWithStatus(
      <OnePraseFromRadio name="mestoOsmotra" dataObj={sostoyanieData} />,
      store
    );

    expect(container.textContent).toBe("в ПНД. ");
  });

  it("берёт первый пункт, если поля нет в сторе", () => {
    const dataObj: Schema = { mesto: sostoyanieData.mestoOsmotra };

    const { container } = renderWithStatus(
      <OnePraseFromRadio name="mesto" dataObj={dataObj} />,
      createStatusStore()
    );

    expect(container.textContent).toBe("на дому. ");
  });
});
