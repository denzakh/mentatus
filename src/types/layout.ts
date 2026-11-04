import type { CSSProperties } from "react";
import type { Schema } from "./schema";
import type { StatusSection } from "./status";

/*
Типы декларативной раскладки раздела (`src/store/*Layout.js`).

Блок layout — объект с полем `type`:
  row / col / box — обёртка <div className>, необязательный title
  title           — подпись группы полей (text либо label в <span>)
  field           — поле формы (<Field>, тип берётся из схемы)
  group           — группа чекбоксов цикла (<Group>)
  custom          — компонент из карты custom-блоков раздела
  br              — перенос строки
*/

export type LayoutBlockType =
  | "row"
  | "col"
  | "box"
  | "title"
  | "field"
  | "group"
  | "custom"
  | "br";

export interface LayoutBlock {
  type: LayoutBlockType;
  className?: string;
  title?: string;
  text?: string;
  label?: string;
  labelClassName?: string;
  name?: string;
  component?: string;
  cicle?: string;
  itemClassName?: string;
  autoKritika?: number;
  dataBase?: Schema;
  style?: CSSProperties;
  visibleWhen?: (slice: StatusSection) => boolean;
  blocks?: LayoutBlock[];
}

export type Layout = LayoutBlock[];
