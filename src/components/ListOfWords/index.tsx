import React, { useMemo } from "react";
import { shallowEqual } from "react-redux";
import { cicleKeys, buildListText } from "../../lib/text";
import { flagsOf, useAppSelector } from "../../lib/redux";
import type { Schema } from "../../types/schema";

/*
ListOfWords
компонент представления

принимает:
name - имя цикла
dataObj - объект БД
isAnd - соединять последние пункты союзом «и»
beforeText - своя вступительная фраза (вместо name + "Before")
before / after / noList - переопределение ключей фраз обрамления

из стора берёт: какие пункты цикла включены
*/

interface OwnProps {
  name: string;
  dataObj?: Schema;
  isAnd?: boolean;
  beforeText?: string;
  before?: string;
  after?: string;
  noList?: string;
}

export default function ListOfWords(props: OwnProps) {
  const { name, dataObj, beforeText, isAnd } = props;

  // ключи цикла зависят только от схемы, поэтому считаются один раз
  const keys = useMemo(() => cicleKeys(dataObj, name), [dataObj, name]);
  const flags = useAppSelector(state => flagsOf(state, keys), shallowEqual);

  // ключи фраз обрамления и фразы «нет данных»
  const beforeKey = props.before || name + "Before";
  const afterKey = props.after || name + "After";
  const noListKey = props.noList || name + "Not";

  const beforePhrase =
    beforeText || (dataObj[beforeKey] ? dataObj[beforeKey].phrase : "");
  const afterPhrase = dataObj[afterKey] ? dataObj[afterKey].phrase : "";
  const noListPhrase = dataObj[noListKey] ? dataObj[noListKey].phrase : "";

  // включённые пункты цикла
  const items = keys
    .filter(key => flags[key])
    .map(key => ({ key: key, phrase: dataObj[key].phrase }));

  const parts = buildListText(items, {
    isAnd: !!isAnd,
    before: beforePhrase,
    after: afterPhrase,
    noList: noListPhrase
  });

  return (
    <span>
      {parts.map(part => (
        <span key={part.key}>
          {part.text}
          {part.separator}
        </span>
      ))}
    </span>
  );
}
