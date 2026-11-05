import React from "react";
import { setRadio } from "../../actions/radioAction";
import {
  radioOptionsOf,
  radioSelectedOf,
  useAppDispatch,
  useAppSelector
} from "../../lib/redux";
import RadioOptions from "../RadioOptions";
import type { Schema } from "../../types/schema";
import "./RadioListInline.css";

/*
RadioListInline
группа радиокнопок в одну строку, привязанная к полю стора

принимает:
name - имя поля в сторе
dataBase - объект БД, в котором лежит группа (label + data)

Разметку рисует общий `RadioOptions` (variant="inline").
*/

interface OwnProps {
  name: string;
  dataBase?: Schema;
}

export default function RadioListInline(props: OwnProps) {
  const { name, dataBase } = props;
  const dispatch = useAppDispatch();

  const options = useAppSelector(state =>
    radioOptionsOf(state, name, dataBase)
  );
  const selected = useAppSelector(state => radioSelectedOf(state, name));
  const group = dataBase && dataBase[name];
  const label = group ? group.label : "";

  const handleChange = (value: number) => {
    dispatch(setRadio(name, value));
  };

  return (
    <RadioOptions
      name={name}
      options={options}
      label={label}
      selected={selected}
      variant="inline"
      onChange={handleChange}
    />
  );
}
