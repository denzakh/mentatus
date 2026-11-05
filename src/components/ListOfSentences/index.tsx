import React, { useMemo } from "react";
import { shallowEqual } from "react-redux";
import { cicleKeys, pickPhrase } from "../../lib/text";
import { flagsOf, fieldOf, useAppSelector } from "../../lib/redux";
import type { FieldViewOwnProps } from "../../types/components";

/*
ListOfSentences
компонент представления: каждый включённый пункт цикла — отдельным предложением

принимает:
name - имя цикла
dataObj - объект БД

из стора берёт: какие пункты цикла включены и пол пациента
*/

export default function ListOfSentences(props: FieldViewOwnProps) {
  const { name, dataObj } = props;

  const keys = useMemo(() => cicleKeys(dataObj, name), [dataObj, name]);
  const flags = useAppSelector(state => flagsOf(state, keys), shallowEqual);
  const isMale = useAppSelector(state => {
    const pol = fieldOf(state, "pol");
    return !!(pol && pol.isChecked);
  });

  // включённые пункты цикла
  const items = keys.filter(key => flags[key]);

  return (
    <span>
      {items.map(key => (
        <span key={key}>{pickPhrase(dataObj[key], isMale)}. </span>
      ))}
    </span>
  );
}
