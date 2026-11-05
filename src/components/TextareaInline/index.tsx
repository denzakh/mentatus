import React from "react";
import { setText } from "../../actions/textAction";
import { textOf, useAppDispatch, useAppSelector } from "../../lib/redux";
import TextField from "../TextField";
import type { FieldOwnProps } from "../../types/components";
import "./TextareaInline.css";

/*
TextareaInline
короткое поле текста в одну строку, привязанное к полю стора

принимает:
name - имя поля в сторе
label - подпись

Разметку рисует общий `TextField` (variant="inline").
*/

export default function TextareaInline(props: FieldOwnProps) {
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
      variant="inline"
      onChange={handleChange}
    />
  );
}
