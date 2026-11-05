import React from "react";
import ListOfSentences from "../ListOfSentences";
import ListOfWords from "../ListOfWords";
import { viewForField } from "../fields/registry";
import type { Schema } from "../../types/schema";

/*
FieldView
представление поля в заключении по типу из схемы раздела

принимает:
name    - имя поля стора (для группы — имя цикла)
dataObj - схема раздела (*Data.ts)
as      - вид списка для группы чекбоксов: "sentences" | по умолчанию слова
isAnd   - соединять последние пункты группы союзом «и»

Соответствия «тип поля -> компонент» лежат в `src/components/fields/registry.ts`.
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
  const View = viewForField(field);

  // группы чекбоксов цикла нет в схеме: её вид задаётся через as
  if (!View) {
    if (field) {
      return null;
    }

    return as === "sentences" ? (
      <ListOfSentences name={name} dataObj={dataObj} />
    ) : (
      <ListOfWords name={name} dataObj={dataObj} isAnd={isAnd} />
    );
  }

  return <View name={name} dataObj={dataObj} />;
}
