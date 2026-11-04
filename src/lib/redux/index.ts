/* Вспомогательные функции для connect. */

import { fieldSections } from "../../reducers/sections";
import type {
  FieldValue,
  SectionName,
  StatusSection,
  StatusState
} from "../../types/status";

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

// набор флагов isChecked для перечисленных полей стора
export function flagsOf(state: StatusState, keys: string[]): Flags {
  const flags: Flags = {};
  keys.forEach(key => {
    const field = fieldOf(state, key);
    flags[key] = !!(field && field.isChecked);
  });
  return flags;
}

// поэлементное сравнение наборов флагов
export function areFlagsEqual(prev?: Flags, next?: Flags): boolean {
  if (prev === next) {
    return true;
  }
  if (!prev || !next) {
    return false;
  }

  const prevKeys = Object.keys(prev);
  const nextKeys = Object.keys(next);

  if (prevKeys.length !== nextKeys.length) {
    return false;
  }

  return prevKeys.every(key => prev[key] === next[key]);
}

export type StateProps = Record<string, unknown>;

/* Сравнение stateProps: примитивы — по значению, наборы флагов — поэлементно.
   Нужно, чтобы connect не перерисовывал список, если выбор пользователя не менялся. */
export function areStatePropsEqual(next: object, prev: object): boolean {
  const nextProps = next as StateProps;
  const prevProps = prev as StateProps;
  const nextKeys = Object.keys(nextProps);

  if (nextKeys.length !== Object.keys(prevProps).length) {
    return false;
  }

  return nextKeys.every(key => {
    const nextValue = nextProps[key];
    const prevValue = prevProps[key];

    if (nextValue === prevValue) {
      return true;
    }

    if (
      nextValue &&
      prevValue &&
      typeof nextValue === "object" &&
      typeof prevValue === "object"
    ) {
      return areFlagsEqual(
        prevValue as Flags,
        nextValue as Flags
      );
    }

    return false;
  });
}
