
import { formByName, formForField } from "../fields/registry";
import type { FieldOwnProps } from "../../types/components";
import type { Schema } from "../../types/schema";

/*
Field
поле формы, отрисованное по типу из схемы раздела (*Data.ts)

принимает:
name      - имя поля в сторе
dataBase  - схема раздела
component - своя реализация поля (CheckboxOtkl, RadioListKogn, TextareaInline и т.п.)
label     - своя подпись (по умолчанию берётся из схемы)
style     - стили поля

Соответствия «тип/имя -> компонент» лежат в `src/components/fields/registry.ts`.
*/

interface Props extends FieldOwnProps {
  dataBase?: Schema;
  component?: string;
}

export default function Field(props: Props) {
  const { name, dataBase, component, label, style } = props;
  const field = (dataBase && dataBase[name]) || {};
  const Component = component ? formByName[component] : formForField(field);

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
