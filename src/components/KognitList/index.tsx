
import dataBase from "../../store/kognitData";
import { fingerPhrase } from "../../lib/text";
import { fieldOf, useAppSelector } from "../../lib/redux";
import FieldView from "../FieldView";
import type { ListOwnProps } from "../../types/components";

export default function KognitList(props: ListOwnProps) {
  const fingerText = useAppSelector(state => {
    const field = fieldOf(state, "kognitFingerN");
    return fingerPhrase(field && field.number);
  });

  return (
    <span data-id="kognit" onClick={props.toggleTab}>
      {/*Интел-мнест функции*/}
      <FieldView name="kognitOsnivnoi" dataObj={dataBase} />
      {/*Отмечается*/}
      <FieldView name="otmech" dataObj={dataBase} />

      {/*пальцы*/}
      <span> {fingerText}</span>

      {/*Отдельно*/}
      <FieldView name="otdel" dataObj={dataBase} as="sentences" />
    </span>
  );
}
