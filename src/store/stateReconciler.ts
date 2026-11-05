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
  // инициализируем merged как полный RootState (все срезы)
  const merged: RootState = {
    zhaloby: {} as StatusSection,
    anamnez: {} as StatusSection,
    sostoyanie: {} as StatusSection,
    affekt: {} as StatusSection,
    rech: {} as StatusSection,
    kognit: {} as StatusSection,
    pp: {} as StatusSection,
    diagnoz: {} as StatusSection,
  };

  // перебираем разделы из reducedState (стартовые значения)
  for (const section of Object.keys(reducedState) as SectionName[]) {
    merged[section] = mergeSectionState(
      saved[section],
      reducedState[section]
    );
  }

  return merged;
};
