import type { CSSProperties, MouseEvent, KeyboardEvent } from "react";
import type { Schema } from "./schema";

// цель клика/нажатия: нужен только data-id узла
export interface ToggleTabTarget {
  currentTarget: Element;
}

export type ToggleTabHandler = (event: ToggleTabTarget) => void;

// общие пропсы поля формы (name — имя поля в сторе)
export interface FieldOwnProps {
  name: string;
  dataBase?: Schema;
  label?: string;
  style?: CSSProperties;
  autoKritika?: number;
}

// пропсы представления поля в заключении
export interface FieldViewOwnProps {
  name: string;
  dataObj: Schema;
}

// пропсы списка заключения: клик по разделу открывает его вкладку
export interface ListOwnProps {
  toggleTab?: ToggleTabHandler;
}
