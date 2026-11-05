import React from "react";
import { setRadio } from "../../actions/radioAction";
import { isKritikaEmpty, autoKritikaForOption } from "../../lib/rules/kritika";
import {
  fieldOf,
  radioOptionsOf,
  radioSelectedOf,
  useAppDispatch,
  useAppSelector
} from "../../lib/redux";
import RadioOptions from "../RadioOptions";
import type { Schema } from "../../types/schema";
import "./RadioListKogn.css";

/*
RadioListKogn
группа радиокнопок интеллектуально-мнестических функций:
часть ответов дополнительно снижает критику

принимает:
name - имя поля в сторе
dataBase - объект БД, в котором лежит группа (label + data)

Разметку рисует общий `RadioOptions`, авто-критику задаёт
`lib/rules/kritika` (AUTO_KRITIKA_BY_OPTION).
*/

interface OwnProps {
  name: string;
  dataBase?: Schema;
}

export default function RadioListKogn(props: OwnProps) {
  const { name, dataBase } = props;
  const dispatch = useAppDispatch();

  const options = useAppSelector(state =>
    radioOptionsOf(state, name, dataBase)
  );
  const selected = useAppSelector(state => radioSelectedOf(state, name));

  // авто-критика выставляется только пока она пустая
  const isKritikaEmptyValue = useAppSelector(state =>
    isKritikaEmpty(fieldOf(state, "kritika"))
  );

  const handleChange = (value: number) => {
    const kritika = autoKritikaForOption(value);

    // часть ответов автоматически выставляет критику, если она ещё не задана
    if (isKritikaEmptyValue && kritika !== undefined) {
      dispatch(setRadio("kritika", kritika));
    }

    dispatch(setRadio(name, value));
  };

  return (
    <RadioOptions
      name={name}
      options={options}
      selected={selected}
      onChange={handleChange}
    />
  );
}
