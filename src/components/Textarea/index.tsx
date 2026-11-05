import React from "react";
import { setText } from "../../actions/textAction";
import { textOf, useAppDispatch, useAppSelector } from "../../lib/redux";
import TextField from "../TextField";
import type { FieldOwnProps } from "../../types/components";
import "./Textarea.css";

/*
Textarea
поле свободного текста, привязанное к полю стора

принимает:
name - имя поля в сторе
label - подпись
style - свои стили поля

Разметку рисует общий `TextField` (variant="textarea").
*/

export default function Textarea(props: FieldOwnProps) {
  const { name, label, style } = props;
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
      style={style}
      onChange={handleChange}
    />
  );
}
