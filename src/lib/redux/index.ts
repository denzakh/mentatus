/* Вспомогательные функции для connect. */

import { fieldSections } from "../../reducers/sections";

// имя среза, в котором лежит поле стора
export function sectionOf(fieldName) {
  return fieldSections[fieldName];
}

// значение поля стора из его среза (undefined, если поля нет)
export function fieldOf(state, fieldName) {
  const section = fieldSections[fieldName];
  return section ? state[section][fieldName] : undefined;
}

// флаг чекбокса внутри среза (для условий видимости в layout раздела)
export function sliceFlag(slice, fieldName) {
  const field = slice && slice[fieldName];
  return !!(field && field.isChecked);
}

// номер выбранного пункта радиогруппы внутри среза
export function sliceNumber(slice, fieldName) {
  const field = slice && slice[fieldName];
  return +((field && field.number) || 0);
}

// набор флагов isChecked для перечисленных полей стора
export function flagsOf(state, keys) {
  const flags = {};
  keys.forEach(key => {
    const field = fieldOf(state, key);
    flags[key] = !!(field && field.isChecked);
  });
  return flags;
}

// поэлементное сравнение наборов флагов
export function areFlagsEqual(prev, next) {
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

/* Сравнение stateProps: примитивы — по значению, наборы флагов — поэлементно.
   Нужно, чтобы connect не перерисовывал список, если выбор пользователя не менялся. */
export function areStatePropsEqual(next, prev) {
  const nextKeys = Object.keys(next);

  if (nextKeys.length !== Object.keys(prev).length) {
    return false;
  }

  return nextKeys.every(key => {
    const nextValue = next[key];
    const prevValue = prev[key];

    if (nextValue === prevValue) {
      return true;
    }

    if (
      nextValue &&
      prevValue &&
      typeof nextValue === "object" &&
      typeof prevValue === "object"
    ) {
      return areFlagsEqual(prevValue, nextValue);
    }

    return false;
  });
}
