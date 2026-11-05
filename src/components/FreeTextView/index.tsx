import React from "react";
import FreeText from "../FreeText";
import FreeTextBeforeAndAfter from "../FreeTextBeforeAndAfter";
import type { FieldViewOwnProps } from "../../types/components";

/*
FreeTextView
свободный текст в заключении: у поля есть фразы обрамления (before/after) —
выводим их вместе с текстом, иначе только текст

принимает:
name    - имя поля в сторе
dataObj - схема раздела (*Data.js)
*/

export default function FreeTextView(props: FieldViewOwnProps) {
  const { name, dataObj } = props;
  const group = (dataObj && dataObj[name]) || undefined;

  return group && (group.before || group.after) ? (
    <FreeTextBeforeAndAfter name={name} dataObj={dataObj} />
  ) : (
    <FreeText name={name} dataObj={dataObj} />
  );
}
