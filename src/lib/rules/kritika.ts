/* Критика (осознание болезни) должна быть выставлена, если есть психопродукция. */

// ответы «Интеллекта и памяти», снижающие критику: id пункта -> номер критики
export const AUTO_KRITIKA_BY_OPTION: Record<number, number> = {
  1: 2,
  2: 3,
  3: 4
};

// номер критики для выбранного пункта (undefined — пункт критику не меняет)
export function autoKritikaForOption(optionId?: number): number | undefined {
  if (optionId === undefined) {
    return undefined;
  }

  return AUTO_KRITIKA_BY_OPTION[optionId];
}

// возвращает true, если критика ещё не выставлена (0)
export function isKritikaEmpty(kritikaField?: {
  number?: number | string;
}): boolean {
  return +((kritikaField && kritikaField.number) || 0) === 0;
}
