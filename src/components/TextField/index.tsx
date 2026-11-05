import React from "react";
import type { ChangeEvent, CSSProperties } from "react";

/*
TextField
поле текста, привязанное к полю стора (состояние передаёт обёртка)

принимает:
name    - имя поля в сторе
label   - подпись
value   - значение поля
style   - свои стили поля (только для variant="textarea")
variant - "textarea" (многострочное) | "inline" (короткое) | "date" (дата)
onChange - ввод текста (получает новое значение)
*/

export type TextFieldVariant = "textarea" | "inline" | "date";

interface Props {
  name: string;
  label?: string;
  value: string;
  style?: CSSProperties;
  variant?: TextFieldVariant;
  onChange: (value: string) => void;
}

export default function TextField(props: Props) {
  const { name, label, value, style, variant = "textarea", onChange } = props;

  const handleTextareaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  if (variant === "inline") {
    return (
      <div className="textarea-inline">
        <label>
          <div className="textarea-inline__label">{label}</div>
          <textarea
            className="textarea-inline__input"
            onChange={handleTextareaChange}
            name={name}
            value={value}
          />
        </label>
      </div>
    );
  }

  if (variant === "date") {
    return (
      <div className="date">
        <label>
          <span className="date__label">{label}</span>
          <input
            type="date"
            className="date__input"
            onChange={handleInputChange}
            name={name}
            value={value}
          />
        </label>
      </div>
    );
  }

  return (
    <div className="textarea">
      <div className="textarea__label">{label}</div>
      <textarea
        className="textarea__input"
        onChange={handleTextareaChange}
        name={name}
        style={style}
        value={value}
      />
    </div>
  );
}
