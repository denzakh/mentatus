import type { SectionName } from "./status";

/*
Типы схем разделов (`src/store/*Data.js`).

Схема — это `поле -> описание`. У поля есть срез (`section`), тип
(`boolean` | `radio` | `string` | `text` | `number`), подпись, фраза для
заключения и необязательный цикл (`cicle`) — группу чекбоксов в форме.

Поля `section` и `type` необязательны: в схеме встречаются служебные записи
(например, таблица фраз ориентировки `orientir`), которые не являются полем
стора.
*/

export type FieldType = "boolean" | "radio" | "string" | "text" | "number";

export interface RadioOption {
  id: number;
  label: string;
  phrase: string;
  phraseM?: string;
  punkt?: string;
  hint?: string;
}

export interface RadioGroupSchema {
  label?: string;
  phrase?: string;
  phraseM?: string;
  section?: SectionName;
  type?: FieldType;
  hint?: string;
  before?: string;
  after?: string;
  data?: RadioOption[];
}

export interface FieldSchema extends RadioGroupSchema {
  phraseW?: string;
  cicle?: string;
  not?: string;
}

// таблица фраз ориентировки: женский и мужской варианты
export interface OrientirPhrases {
  w: Record<string, string>;
  m: Record<string, string>;
}

export type SchemaEntry = FieldSchema & Partial<OrientirPhrases>;

export type OrientirSchemaEntry = FieldSchema & OrientirPhrases;

export type Schema = Record<string, SchemaEntry>;
