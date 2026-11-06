import { setSymptom } from "../../actions/fieldActions";
import {
  createStatusStore,
  renderWithStatus
} from "../../testUtils/statusStore";
import type { Schema } from "../../types/schema";
import ListOfWords from "./index";

/*
Тесты ListOfWords: включённые пункты цикла с разделителями и фразами
обрамления («before» / «after» / «нет данных»).
*/

const DATA: Schema = {
  zhalobyTrevoga: {
    section: "zhaloby",
    type: "boolean",
    cicle: "testCicle"
  },
  testCicleBefore: { phrase: "Жалобы: " },
  testCicleAfter: { phrase: "." }
};

describe("ListOfWords", () => {
  it("рисует включённый пункт с обрамлением", () => {
    const store = createStatusStore();
    store.dispatch(setSymptom("zhalobyTrevoga"));

    const { container } = renderWithStatus(
      <ListOfWords name="testCicle" dataObj={DATA} />,
      store
    );

    // у пункта нет фразы — выводится пустая строка, как и раньше
    expect(container.textContent).toBe("Жалобы: .");
  });

  it("ничего не рисует без включённых пунктов", () => {
    const { container } = renderWithStatus(
      <ListOfWords name="testCicle" dataObj={DATA} />,
      createStatusStore()
    );

    expect(container.textContent).toBe("");
  });
});
