/* Чистые функции формирования текста заключения.
   Здесь собрана вся логика «какая фраза, с каким разделителем и в каком порядке
   попадает в заключение» — её можно тестировать без React. */

import type {
  RadioGroupSchema,
  SchemaEntry
} from "../../types/schema";

// ключи dataObj, относящиеся к циклу (cicle)
export function cicleKeys<T extends object>(
  dataObj: Record<string, T>,
  cicle: string
): string[] {
  return Object.keys(dataObj).filter(
    key => (dataObj[key] as { cicle?: string }).cicle === cicle
  );
}

// разделитель между пунктами списка
export function separatorAt(
  index: number,
  length: number,
  isAnd?: boolean
): string {
  if (index === length - 1) {
    // последний пункт — без разделителя
    return "";
  }
  if (isAnd && index === length - 2 && length > 1) {
    // предпоследний пункт при включённом «и»
    return " и ";
  }
  return ", ";
}

// фраза пункта с учётом пола пациента
export function pickPhrase(
  item?: Pick<SchemaEntry, "phrase" | "phraseM">,
  isMale?: boolean
): string {
  if (!item) {
    return "";
  }
  return item.phraseM && isMale ? item.phraseM : item.phrase;
}

export interface ListItem {
  key: string;
  phrase: string;
}

export interface ListAffixes {
  isAnd?: boolean;
  before?: string;
  after?: string;
  noList?: string;
}

export interface ListPart {
  key: string;
  text: string;
  separator: string;
}

/* Собирает части списка: вступление, фразы включённых пунктов с разделителями,
   завершение либо фразу «нет данных».

   items   — [{ key, phrase }] только включённые пункты, в порядке вывода
   affixes — { isAnd, before, after, noList } уже разрешённые строки
             (отсутствующая строка — пустая) */
export function buildListText(
  items: ListItem[],
  affixes: ListAffixes = {}
): ListPart[] {
  const { isAnd, before, after, noList } = affixes;

  if (!items.length) {
    return noList ? [{ key: "noList", text: noList, separator: "" }] : [];
  }

  const parts: ListPart[] = [];

  if (before) {
    parts.push({ key: "before", text: before, separator: "" });
  }

  items.forEach((item, index) => {
    parts.push({
      key: item.key,
      text: item.phrase,
      separator: separatorAt(index, items.length, isAnd)
    });
  });

  if (after) {
    parts.push({ key: "after", text: after, separator: "" });
  }

  return parts;
}

// фраза про фингерагнозию по числу правильно названных пальцев
export function fingerPhrase(fingerNumber?: number | string): string {
  switch (+fingerNumber) {
    case 1:
      return "Фингерагнозия, называет правильно только один палец. ";
    case 2:
      return "Фингерагнозия, называет правильно только 2 пальца. ";
    case 3:
      return "Фингерагнозия, правильно называет 3 пальца. ";
    case 4:
      return "Фингерагнозия, правильно называет 4 пальца. ";
    case 5:
      return "Фингерагнозии не выявляется. ";
    default:
      return "";
  }
}

// фраза радиогруппы: вступление + выбранный пункт + завершение
export function buildRadioPhrase(
  group?: Pick<RadioGroupSchema, "data" | "before" | "after">,
  index?: number,
  isMale?: boolean
): string {
  if (!group || !group.data || !group.data[index]) {
    return "";
  }

  return (
    (group.before || "") +
    pickPhrase(group.data[index], isMale) +
    (group.after || "")
  );
}
