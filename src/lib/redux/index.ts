/* Хелперы чтения стора и типизированные хуки.

   `flagsOf` собирает объект `{ поле: флаг }`, поэтому в компонентах его
   сравнивают через `shallowEqual` вторым аргументом `useAppSelector` —
   кастомный компаратор `connect` больше не нужен. */

import { fieldSections } from "../../reducers/sections";
import type { RadioOption, Schema } from "../../types/schema";
import type {
  FieldValue,
  SectionName,
  StatusSection,
  StatusState
} from "../../types/status";

export { useAppDispatch, useAppSelector } from "./hooks";

export type Flags = Record<string, boolean>;

// имя среза, в котором лежит поле стора
export function sectionOf(fieldName: string): SectionName | undefined {
  return fieldSections[fieldName];
}

// значение поля стора из его среза (undefined, если поля нет)
export function fieldOf(
  state: StatusState,
  fieldName: string
): FieldValue | undefined {
  const section = fieldSections[fieldName];
  return section ? state[section][fieldName] : undefined;
}

// флаг чекбокса внутри среза (для условий видимости в layout раздела)
export function sliceFlag(
  slice: StatusSection | undefined,
  fieldName: string
): boolean {
  const field = slice && slice[fieldName];
  return !!(field && field.isChecked);
}

// номер выбранного пункта радиогруппы внутри среза
export function sliceNumber(
  slice: StatusSection | undefined,
  fieldName: string
): number {
  const field = slice && slice[fieldName];
  return +((field && field.number) || 0);
}

// текст поля стора (пустая строка, если текст не задан)
export function textOf(state: StatusState, fieldName: string): string {
  const field = fieldOf(state, fieldName);
  return (field && field.text) || "";
}

// пункты радиогруппы из схемы раздела
export function radioOptionsOf(
  state: StatusState,
  fieldName: string,
  dataBase?: Schema
): RadioOption[] {
  // состояние не нужно: пункты группы лежат в схеме; параметр оставлен
  // для единообразия с radioSelectedOf
  void state;

  const group = dataBase && dataBase[fieldName];
  return (group && group.data) || [];
}

// номер выбранного пункта радиогруппы (0 — поле ещё не заполнено)
export function radioSelectedOf(
  state: StatusState,
  fieldName: string
): number | undefined {
  const field = fieldOf(state, fieldName);
  return field ? field.number : 0;
}

// набор флагов isChecked для перечисленных полей стора
export function flagsOf(state: StatusState, keys: string[]): Flags {
  const flags: Flags = {};
  keys.forEach(key => {
    const field = fieldOf(state, key);
    flags[key] = !!(field && field.isChecked);
  });
  return flags;
}
