import React from "react";
import { setSymptom } from "../../actions/symptomAction";
import { fieldOf, useAppDispatch, useAppSelector } from "../../lib/redux";
import CheckboxView from "../Checkbox/CheckboxView";
import "../Checkbox/Checkbox.css";

/*
CheckboxPol
переключатель пола пациента, привязанный к полю стора

принимает:
name - имя поля в сторе (по умолчанию pol)

Разметку рисует общий `CheckboxView` (variant="pol"), подпись пола
выводится там же.
*/

interface OwnProps {
  name?: string;
}

export default function CheckboxPol(props: OwnProps) {
  const name = props.name || "pol";
  const dispatch = useAppDispatch();

  const isMale = useAppSelector(state => {
    const field = fieldOf(state, name);
    return !!(field && field.isChecked);
  });

  const handleChange = () => {
    dispatch(setSymptom(name));
  };

  return (
    <CheckboxView
      name={name}
      checked={isMale}
      variant="pol"
      onChange={handleChange}
    />
  );
}
