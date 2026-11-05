import type { CSSProperties, MouseEvent } from "react";
import type { Schema } from "./schema";

// обработчик перехода на вкладку раздела (клик по меню или заключению)
export type ToggleTabHandler = (event: MouseEvent<HTMLElement>) => void;

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
