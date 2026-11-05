import React from "react";
import type { ChangeEvent } from "react";
import type { RadioOption } from "../../types/schema";

/*
RadioOptions
презентационная группа радиокнопок: разметка общая для RadioList,
RadioListInline и RadioListKogn

принимает:
name          - имя поля в сторе (оно же name/id радиокнопок)
options       - пункты группы из схемы раздела
selected      - номер выбранного пункта
label         - подпись группы (только для variant="inline")
variant       - "list" (в столбик) | "inline" (в одну строку)
itemClassName - класс обёртки пункта (по умолчанию radio__item / radio__inline-item)
onChange      - выбор пункта (получает номер пункта)
*/

export type RadioOptionsVariant = "list" | "inline";

interface Props {
  name: string;
  options: RadioOption[];
  selected?: number;
  label?: string;
  variant?: RadioOptionsVariant;
  itemClassName?: string;
  onChange: (value: number) => void;
}

export default function RadioOptions(props: Props) {
  const {
    name,
    options,
    selected = 0,
    label,
    variant = "list",
    itemClassName,
    onChange
  } = props;
  const isInline = variant === "inline";

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(+e.target.value);
  };

  const items = options.map(item => (
    <div
      key={item.id}
      className={
        itemClassName || (isInline ? "radio__inline-item" : "radio__item")
      }
    >
      <input
        type="radio"
        name={name}
        id={name + item.id}
        value={item.id}
        className="radio__input"
        onChange={handleChange}
        checked={+item.id === +selected}
      />
      <label className="radio__label" htmlFor={name + item.id}>
        {item.label}
      </label>
    </div>
  ));

  // в строку: подпись группы, за ней список пунктов
  if (isInline) {
    return (
      <div className="radio__inline">
        {/* подпись группы идёт с завершающим пробелом, как раньше */}
        <div className="radio__inline-label">{label} </div>
        <div className="radio__inline-list">{items}</div>
      </div>
    );
  }

  return <div className="radio__list">{items}</div>;
}
