import React from "react";
import ListOfSentences from "../ListOfSentences";
import ListOfWords from "../ListOfWords";
import OnePraseFromRadio from "../OnePraseFromRadio";
import FreeText from "../FreeText";
import FreeTextBeforeAndAfter from "../FreeTextBeforeAndAfter";
import type { Schema } from "../../types/schema";

/*
FieldView
представление поля в заключении по типу из схемы раздела

принимает:
name    - имя поля стора (для группы — имя цикла)
dataObj - схема раздела (*Data.js)
as      - вид списка для группы чекбоксов: "sentences" | по умолчанию слова
isAnd   - соединять последние пункты группы союзом «и»
*/

interface Props {
  name: string;
  dataObj?: Schema;
  as?: string;
  isAnd?: boolean;
}

export default function FieldView(props: Props) {
  const { name, dataObj, as, isAnd } = props;
  const field = dataObj ? dataObj[name] : undefined;

  // группы чекбоксов цикла нет в схеме: её вид задаётся через as
  if (!field) {
    return as === "sentences" ? (
      <ListOfSentences name={name} dataObj={dataObj} />
    ) : (
      <ListOfWords name={name} dataObj={dataObj} isAnd={isAnd} />
    );
  }

  switch (field.type) {
    case "boolean":
      return <ListOfSentences name={name} dataObj={dataObj} />;

    case "radio":
      return <OnePraseFromRadio name={name} dataObj={dataObj} />;

    case "string":
    case "text":
      // у поля есть фразы обрамления (before/after) — выводим с ними
      return field.before || field.after ? (
        <FreeTextBeforeAndAfter name={name} dataObj={dataObj} />
      ) : (
        <FreeText name={name} />
      );

    default:
      return null;
  }
}
