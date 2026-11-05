import React from "react";
import { fieldOf, useAppSelector } from "../../lib/redux";
import type { FieldViewOwnProps } from "../../types/components";

/*
FreeTextBeforeAndAfter
компонент представления: свободный текст поля с фразами до и после

принимает:
name - имя поля в сторе
dataObj - объект БД, в котором лежат фразы before / after
*/

export default function FreeTextBeforeAndAfter(props: FieldViewOwnProps) {
  const { name, dataObj } = props;

  const value = useAppSelector(state => {
    const group = (dataObj && dataObj[name]) || {};
    const field = fieldOf(state, name);

    return (
      (group.before || "") + ((field && field.text) || "") + (group.after || "")
    );
  });

  return <span>{value}</span>;
}
