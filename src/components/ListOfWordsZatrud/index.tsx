import React from "react";
import ListOfWords from "../ListOfWords";
import type { Schema } from "../../types/schema";

// причины затрудненного контакта: отличается от ListOfWords
// только вступительной фразой
interface Props {
  name: string;
  dataObj: Schema;
  isAnd?: boolean;
}

export default function ListOfWordsZatrud(props: Props) {
  return (
    <ListOfWords
      name={props.name}
      dataObj={props.dataObj}
      isAnd={true}
      beforeText=", но он затруднен из-за "
    />
  );
}
