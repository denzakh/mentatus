import { setSymptom, setText } from "../../actions/fieldActions";
import affektData from "../../store/affektData";
import sostoyanieData from "../../store/sostoyanieData";
import {
  createStatusStore,
  renderWithStatus,
  type StatusStore
} from "../../testUtils/statusStore";
import type { Schema } from "../../types/schema";
import FieldView from "./index";

/*
Тесты FieldView: представление выбирается по типу схемы (`viewByType`),
а группы чекбоксов без записи в схеме — по `as` / `isAnd` (как раньше).
*/

// поле-цикл с типом boolean: имя цикла совпадает с именем поля
const BOOLEAN_DATA: Schema = {
  poNapravleniu: {
    label: "по направлению",
    phrase: "по направлению",
    section: "sostoyanie",
    type: "boolean",
    cicle: "poNapravleniu"
  }
};

// текст заключения компонента при заданных действиях
function viewText(
  name: string,
  dataObj: Schema,
  configure?: (store: StatusStore) => void,
  as?: string,
  isAnd?: boolean
): string {
  const store = createStatusStore();

  if (configure) {
    configure(store);
  }

  const { container } = renderWithStatus(
    <FieldView name={name} dataObj={dataObj} as={as} isAnd={isAnd} />,
    store
  );

  return container.textContent || "";
}

describe("FieldView", () => {
  it("по типу boolean рисует предложения пунктов цикла", () => {
    const text = viewText("poNapravleniu", BOOLEAN_DATA, store =>
      store.dispatch(setSymptom("poNapravleniu"))
    );

    expect(text).toBe("по направлению. ");
  });

  it("по типу radio рисует фразу выбранного пункта", () => {
    expect(viewText("mestoOsmotra", sostoyanieData)).toBe("в ПНД. ");
  });

  it("по типу text рисует свободный текст", () => {
    const text = viewText("vozrast", sostoyanieData, store =>
      store.dispatch(setText("vozrast", "42"))
    );

    expect(text).toBe(" 42");
  });

  it("по типу text с before/after рисует текст с обрамлением", () => {
    const text = viewText("appetitPohudel", affektData, store =>
      store.dispatch(setText("appetitPohudel", "5"))
    );

    expect(text).toBe(" (потеря веса около 5 кг)");
  });

  it("не рисует поле без ввода (тип number)", () => {
    expect(viewText("patientId", sostoyanieData)).toBe("");
  });

  it("рисует цикл без записи в схеме как список слов", () => {
    const text = viewText(
      "vpech",
      sostoyanieData,
      store => {
        store.dispatch(setSymptom("vpechatleniePodozrit"));
        store.dispatch(setSymptom("vpechatlenieDistancia"));
      },
      undefined,
      true
    );

    expect(text).toBe("Подозрительна, насторожена и Не соблюдает дистанцию");
  });

  it("рисует цикл без записи в схеме как предложения при as=sentences", () => {
    const text = viewText(
      "vpech",
      sostoyanieData,
      store => store.dispatch(setSymptom("vpechatleniePodozrit")),
      "sentences"
    );

    expect(text).toBe("Подозрительна, насторожена. ");
  });
});
