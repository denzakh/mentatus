import Checkbox from "../Checkbox";
import CheckboxOtkl from "../CheckboxOtkl";
import CheckboxPol from "../CheckboxPol";
import RadioList from "../RadioList";
import RadioListInline from "../RadioListInline";
import RadioListKogn from "../RadioListKogn";
import Textarea from "../Textarea";
import TextareaInline from "../TextareaInline";
import InputDate from "../InputDate";
import FreeTextView from "../FreeTextView";
import ListOfSentences from "../ListOfSentences";
import OnePraseFromRadio from "../OnePraseFromRadio";
import {
  formByName,
  formByType,
  formForField,
  viewByType,
  viewForField
} from "./registry";

/*
Тесты реестра рендереров — единственного места соответствий
«тип/имя поля -> компонент» для `Field` и `FieldView`.
*/

describe("formByType", () => {
  it("ставит в соответствие типам схемы реализации полей", () => {
    expect(formByType.boolean).toBe(Checkbox);
    expect(formByType.radio).toBe(RadioList);
    expect(formByType.string).toBe(Textarea);
    expect(formByType.text).toBe(Textarea);
  });

  it("не рендерит поля без ввода", () => {
    expect(formByType.number).toBeUndefined();
  });
});

describe("formByName", () => {
  it("знает все реализации, на которые ссылается layout", () => {
    expect(formByName).toEqual({
      Checkbox: Checkbox,
      CheckboxOtkl: CheckboxOtkl,
      CheckboxPol: CheckboxPol,
      RadioList: RadioList,
      RadioListInline: RadioListInline,
      RadioListKogn: RadioListKogn,
      Textarea: Textarea,
      TextareaInline: TextareaInline,
      InputDate: InputDate
    });
  });
});

describe("viewByType", () => {
  it("ставит в соответствие типам схемы представления заключения", () => {
    expect(viewByType.boolean).toBe(ListOfSentences);
    expect(viewByType.radio).toBe(OnePraseFromRadio);
    expect(viewByType.string).toBe(FreeTextView);
    expect(viewByType.text).toBe(FreeTextView);
  });

  it("не выводит поля без ввода", () => {
    expect(viewByType.number).toBeUndefined();
  });
});

describe("formForField / viewForField", () => {
  it("берёт компонент по типу схемы", () => {
    expect(formForField({ type: "boolean" })).toBe(Checkbox);
    expect(viewForField({ type: "radio" })).toBe(OnePraseFromRadio);
  });

  it("возвращает undefined, если тип не задан или неизвестен", () => {
    expect(formForField(undefined)).toBeUndefined();
    expect(formForField({})).toBeUndefined();
    expect(viewForField(undefined)).toBeUndefined();
    expect(viewForField({ type: "number" })).toBeUndefined();
  });
});
