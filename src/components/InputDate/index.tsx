import React from "react";
import { setText } from "../../actions/textAction";
import { textOf, useAppDispatch, useAppSelector } from "../../lib/redux";
import TextField from "../TextField";
import type { FieldOwnProps } from "../../types/components";
import "./InputDate.css";

/*
InputDate
поле даты, привязанное к полю стора

принимает:
name - имя поля в сторе
label - подпись
style - не используется (в отличие от Textarea), как и раньше

Разметку рисует общий `TextField` (variant="date").
*/

export default function InputDate(props: FieldOwnProps) {
  const { name, label } = props;
  const dispatch = useAppDispatch();
  const value = useAppSelector(state => textOf(state, name));

  const handleChange = (text: string) => {
    dispatch(setText(name, text));
  };

  return (
    <TextField
      name={name}
      label={label}
      value={value}
      variant="date"
      onChange={handleChange}
    />
  );
}
