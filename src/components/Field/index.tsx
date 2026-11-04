import React from "react";
import type { ComponentType } from "react";
import Checkbox from "../Checkbox";
import CheckboxOtkl from "../CheckboxOtkl";
import CheckboxPol from "../CheckboxPol";
import RadioList from "../RadioList";
import RadioListInline from "../RadioListInline";
import RadioListKogn from "../RadioListKogn";
import Textarea from "../Textarea";
import TextareaInline from "../TextareaInline";
import InputDate from "../InputDate";
import type { FieldOwnProps } from "../../types/components";
import type { Schema } from "../../types/schema";

/*
Field
поле формы, отрисованное по типу из схемы раздела (*Data.js)

принимает:
name      - имя поля в сторе
dataBase  - схема раздела
component - своя реализация поля (CheckboxOtkl, RadioListKogn, TextareaInline и т.п.)
label     - своя подпись (по умолчанию берётся из схемы)
style     - стили поля
*/

// реализация поля по умолчанию для каждого типа схемы
const byType: Record<string, ComponentType<FieldOwnProps>> = {
  boolean: Checkbox,
  radio: RadioList,
  string: Textarea,
  text: Textarea
};

// нестандартные реализации, доступные из layout по имени
const byName: Record<string, ComponentType<FieldOwnProps>> = {
  Checkbox: Checkbox,
  CheckboxOtkl: CheckboxOtkl,
  CheckboxPol: CheckboxPol,
  RadioList: RadioList,
  RadioListInline: RadioListInline,
  RadioListKogn: RadioListKogn,
  Textarea: Textarea,
  TextareaInline: TextareaInline,
  InputDate: InputDate
};

interface Props extends FieldOwnProps {
  dataBase?: Schema;
  component?: string;
}

export default function Field(props: Props) {
  const { name, dataBase, component, label, style } = props;
  const field = (dataBase && dataBase[name]) || {};
  const Component = component ? byName[component] : byType[field.type];

  if (!Component) {
    return null;
  }

  return (
    <Component
      name={name}
      dataBase={dataBase}
      label={label || field.label}
      style={style}
      autoKritika={props.autoKritika}
    />
  );
}
