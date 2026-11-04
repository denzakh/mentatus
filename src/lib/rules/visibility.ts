/* Правила видимости описательной части заключения.

Функции принимают значения полей, а не стор, поэтому проверяются без Redux.
До переноса те же условия были продублированы в `Conclusion`, `ZhalobyList`
и `RechList`.
*/

// номер пункта радиогруппы «контакт»: контакт недоступен
export const CONTACT_UNAVAILABLE = 2;

// номер пункта радиогруппы «сознание»: сознание помрачено
export const CONSCIOUSNESS_CLOUDED = 7;

export interface VisibilityFields {
  kontakt?: number;
  soznanie?: number;
  rechOtkl?: boolean;
  rechNeotvechaet?: boolean;
}

// контакт недоступен
export function isContactUnavailable(kontakt?: number): boolean {
  return Number(kontakt) === CONTACT_UNAVAILABLE;
}

// сознание помрачено
export function isConsciousnessClouded(soznanie?: number): boolean {
  return Number(soznanie) === CONSCIOUSNESS_CLOUDED;
}

// описательная часть (жалобы, ориентировка, аффект, речь, когниция,
// психопродукция) не выводится, если контакт недоступен или помрачено сознание
export function isDescriptiveHidden(fields: VisibilityFields): boolean {
  return (
    isContactUnavailable(fields.kontakt) ||
    isConsciousnessClouded(fields.soznanie)
  );
}

// жалобы не выводятся ещё и при нарушенной речи или если пациент не отвечает
export function isZhalobyHidden(fields: VisibilityFields): boolean {
  return (
    !!fields.rechOtkl ||
    !!fields.rechNeotvechaet ||
    isDescriptiveHidden(fields)
  );
}

// основная часть раздела «Речь и мышление» скрывается при нарушенной речи
export function isRechMainHidden(fields: VisibilityFields): boolean {
  return !!fields.rechOtkl || isDescriptiveHidden(fields);
}
