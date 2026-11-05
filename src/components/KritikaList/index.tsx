import React from "react";
import dataBase from "../../store/sostoyanieData";
import FieldView from "../FieldView";
import type { ListOwnProps } from "../../types/components";

export default function KritikaList(props: ListOwnProps) {
  return (
    <span data-id="sostoyanie" onClick={props.toggleTab}>
      <FieldView name="kritika" dataObj={dataBase} />

      <FieldView name="kritikaText" dataObj={dataBase} />
    </span>
  );
}
