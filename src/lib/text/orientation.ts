/* Фраза ориентировки для заключения.

Код ориентировки собирается из трёх радиогрупп (`orientirVremia`,
`orientirMesto`, `orientirLichnost`) либо становится `orientir000`,
если отмечено «ориентировку не определить». Таблица фраз лежит в
`src/store/kognitData.ts` (`orientir.w` / `orientir.m`).

Логика перенесена из `OrientirovkaList`: при нарушенной речи фраза
не выводится, неизвестная комбинация даёт пустую строку.
*/

import type { OrientirSchemaEntry } from "../../types/schema";

// код «степень ориентировки определить не удаётся»
const ORIENTIR_UNDEFINED = "orientir000";

export interface OrientationInput {
  notDefined: boolean; // orientirNot
  time?: number; // orientirVremia
  place?: number; // orientirMesto
  person?: number; // orientirLichnost
  isMale: boolean;
  isRechOtkl: boolean;
}

// код фразы: "orientir231" | "orientir000"
export function orientationKey(input: OrientationInput): string {
  if (input.notDefined) {
    return ORIENTIR_UNDEFINED;
  }

  // незаполненный пункт радиогруппы даёт 0, как и раньше
  return (
    "orientir" +
    Number(input.time || 0) +
    Number(input.place || 0) +
    Number(input.person || 0)
  );
}

// фраза с фолбэком "" и учётом нарушенной речи
export function orientationPhrase(
  orientir: OrientirSchemaEntry,
  input: OrientationInput
): string {
  // при нарушенной речи ориентировка в заключение не выводится
  if (input.isRechOtkl) {
    return "";
  }

  const gender = input.isMale ? "m" : "w";

  return orientir[gender][orientationKey(input)] || "";
}
