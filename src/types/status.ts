/*
Базовые типы состояния.

Поле стора имеет одну из трёх форм: `{ isChecked }` (чекбокс),
`{ number }` (радиогруппа) или `{ text }` (свободный текст).
В каждой форме перечислены все три ключа, чтобы TypeScript не считал
обращение к «чужому» ключу ошибкой: у отсутствующих ключей тип `undefined`.
*/

export type CheckboxField = {
  isChecked: boolean;
  number?: undefined;
  text?: undefined;
};

export type RadioField = {
  number: number;
  isChecked?: undefined;
  text?: undefined;
};

export type TextField = {
  text: string | false;
  isChecked?: undefined;
  number?: undefined;
};

export type FieldValue = CheckboxField | RadioField | TextField;

export type StatusSection = Record<string, FieldValue>;

/*
Имена разделов, форма состояния и тип отдельного поля выводятся из
самого `reducers/sections` (срезы собраны через `satisfies StatusSection`),
чтобы `typeof store` сохранил конкретные имена полей.
Цикл `types/status ↔ reducers/sections` состоит только из `import type` /
`export type` и стирается при сборке.
*/
export type {
  SectionName,
  StatusState,
  SectionState,
  FieldName,
  SectionStateMap
} from "../reducers/sections";

// reconnue атрибут формы поля: чекбокс / радиогруппа / свободный текст
export function isCheckboxField(
  value: FieldValue | undefined
): value is CheckboxField {
  return !!value && value.isChecked !== undefined;
}

export function isRadioField(value: FieldValue | undefined): value is RadioField {
  return !!value && value.number !== undefined;
}

export function isTextField(value: FieldValue | undefined): value is TextField {
  return !!value && value.text !== undefined;
}
