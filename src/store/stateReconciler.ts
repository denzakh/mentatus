import type { StateReconciler } from "redux-persist";
import type { RootState } from "../reducers";
import type { SectionStateMap } from "../reducers/sections";
import type { FieldValue, SectionName, StatusSection } from "../types/status";

/*
Слияние сохранённого состояния со стартовым.

redux-persist по умолчанию (autoMergeLevel1) заменяет срез целиком, поэтому
поле, добавленное в *Store.ts после первого сохранения, у вернувшегося
пользователя исчезает, а `createSectionSlice` молча игнорирует экшены для
такого поля. Здесь сохранённые значения накладываются на стартовые по полям:
незнакомые поля отбрасываются, значение принимается только при совпадении
формы `{ isChecked }` | `{ number }` | `{ text }`.
*/

// единственный ключ формы поля
function formOf(value: unknown): string | undefined {
  if (!value || typeof value !== "object") {
    return undefined;
  }

  const keys = Object.keys(value);
  return keys.length === 1 ? keys[0] : undefined;
}

// сохранённое значение подходит, только если форма поля не изменилась
export function hasSameForm(saved: unknown, initial: FieldValue): boolean {
  return formOf(saved) !== undefined && formOf(saved) === formOf(initial);
}

// срез: сохранённые значения поверх стартовых, незнакомые поля отбрасываются
export function mergeSectionState(
  inbound: unknown,
  initial: StatusSection
): StatusSection {
  const saved = (inbound || {}) as Record<string, unknown>;
  const merged: StatusSection = { ...initial };

  Object.keys(initial).forEach(field => {
    if (hasSameForm(saved[field], initial[field])) {
      merged[field] = saved[field] as FieldValue;
    }
  });

  return merged;
}

export const mergeSections: StateReconciler<RootState> = (
  inboundState,
  state,
  reducedState,
  _config
) => {
  // state не нужен: слияние идёт от reducedState (стартовые значения полей)
  void state;
  // config не используется: версия и миграция обрабатываются отдельно
  void _config;

  const saved = (inboundState || {}) as Record<string, unknown>;
  /* Стартовые значения всех срезов в общем виде: поля срезов сужены до
     литеральных типов (`{ isChecked: false }`), и записывать в них
     объединение форм полей напрямую нельзя. */
  const merged: Record<SectionName, StatusSection> = { ...reducedState };

  // перебираем разделы из reducedState (стартовые значения)
  (Object.keys(reducedState) as SectionName[]).forEach(section => {
    merged[section] = mergeSectionState(saved[section], merged[section]);
  });

  // формы полей сохранены (mergeSectionState проверяет их), поэтому набор
  // срезов совпадает с RootState
  return merged as RootState;
};
