import React from "react";
import dataBase from "../../store/anamnezData";
import { fieldOf, useAppSelector } from "../../lib/redux";
import FieldView from "../FieldView";
import type { ListOwnProps } from "../../types/components";

export default function AnamnezList(props: ListOwnProps) {
  // анамнез не выводится, если врач его не собрал
  const isHidden = useAppSelector(state => {
    const field = fieldOf(state, "anamnezOtkl");
    return !!(field && field.isChecked);
  });

  return (
    <span data-id="anamnez" onClick={props.toggleTab}>
      {isHidden ? null : (
        <span>
          <FieldView name="anamnezCicle" dataObj={dataBase} />
        </span>
      )}

      <FieldView name="anamnezText" dataObj={dataBase} />
    </span>
  );
}
