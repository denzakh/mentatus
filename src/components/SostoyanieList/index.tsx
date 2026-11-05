import React from "react";
import dataBase from "../../store/sostoyanieData";
import ListOfWordsZatrud from "../ListOfWordsZatrud";
import FieldView from "../FieldView";
import type { ListOwnProps } from "../../types/components";

export default function SostoyanieList(props: ListOwnProps) {
  return (
    <span data-id="sostoyanie" onClick={props.toggleTab}>
      <FieldView name="soznanie" dataObj={dataBase} />

      <FieldView name="kontakt" dataObj={dataBase} />

      {/*затруднен*/}
      <ListOfWordsZatrud name="zatrud" dataObj={dataBase} />

      {/*Отдельно*/}
      <FieldView name="vpech" dataObj={dataBase} as="sentences" />

      <FieldView name="sostoyanieText" dataObj={dataBase} />
    </span>
  );
}
