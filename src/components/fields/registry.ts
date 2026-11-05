import type { ComponentType } from "react";
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
import type { FieldOwnProps, FieldViewOwnProps } from "../../types/components";
import type { FieldType, SchemaEntry } from "../../types/schema";

/*
Единственное место соответствий «тип/имя поля -> компонент»:

formByType / formByName — реализации поля формы (было в `Field`);
viewByType             — представления поля в заключении (было в `FieldView`).

Карты частичные: у типа `number` (например, `patientId`) и у служебных
записей схемы своего компонента нет — такие поля не рендерятся, как и раньше.
*/

export const formByType: Partial<
  Record<FieldType, ComponentType<FieldOwnProps>>
> = {
  boolean: Checkbox,
  radio: RadioList,
  string: Textarea,
  text: Textarea
};

// нестандартные реализации, доступные из layout по имени
export const formByName: Record<string, ComponentType<FieldOwnProps>> = {
  Checkbox: Checkbox,
  CheckboxOtkl: CheckboxOtkl,
  CheckboxPol: CheckboxPol,
  RadioList: RadioList,
  RadioListInline: RadioListInline,
  RadioListKogn: RadioListKogn,
  Textarea: Textarea,
  TextareaInline: TextareaInline,
  InputDate: InputDate
};

export const viewByType: Partial<
  Record<FieldType, ComponentType<FieldViewOwnProps>>
> = {
  boolean: ListOfSentences,
  radio: OnePraseFromRadio,
  string: FreeTextView,
  text: FreeTextView
};

// реализация поля формы по схеме (если layout не задал свой component)
export function formForField(
  field?: SchemaEntry
): ComponentType<FieldOwnProps> | undefined {
  return field && field.type ? formByType[field.type] : undefined;
}

// представление поля в заключении по схеме
export function viewForField(
  field?: SchemaEntry
): ComponentType<FieldViewOwnProps> | undefined {
  return field && field.type ? viewByType[field.type] : undefined;
}
