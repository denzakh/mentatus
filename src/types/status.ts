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

export type SectionName =
  | "zhaloby"
  | "anamnez"
  | "sostoyanie"
  | "affekt"
  | "rech"
  | "kognit"
  | "pp"
  | "diagnoz";

export type StatusSection = Record<string, FieldValue>;

// настройки UI: имя пользователя и активная страница
export interface OptionState {
  name: string;
  activePageName: string;
}

export type StatusState = Record<SectionName, StatusSection> & {
  option: OptionState;
};
