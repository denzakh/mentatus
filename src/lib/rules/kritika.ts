/* Критика (осознание болезни) должна быть выставлена, если есть психопродукция. */

// возвращает true, если критика ещё не выставлена (0)
export function isKritikaEmpty(kritikaField) {
  return +((kritikaField && kritikaField.number) || 0) === 0;
}
