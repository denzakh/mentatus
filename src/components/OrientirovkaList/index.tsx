import SectionLink from "../SectionLink";

import dataBase from "../../store/kognitData";
import { fieldOf, useAppSelector } from "../../lib/redux";
import { orientationPhrase } from "../../lib/text/orientation";
import type { ListOwnProps } from "../../types/components";
import type { OrientirSchemaEntry } from "../../types/schema";

// таблица фраз ориентировки лежит в схеме раздела
const orientir = dataBase.orientir as OrientirSchemaEntry;

export default function OrientirovkaList(props: ListOwnProps) {
  const phrase = useAppSelector(state => {
    const orientirNot = fieldOf(state, "orientirNot");
    const orientirVremia = fieldOf(state, "orientirVremia");
    const orientirMesto = fieldOf(state, "orientirMesto");
    const orientirLichnost = fieldOf(state, "orientirLichnost");
    const pol = fieldOf(state, "pol");
    const rechOtkl = fieldOf(state, "rechOtkl");

    return orientationPhrase(orientir, {
      notDefined: !!(orientirNot && orientirNot.isChecked),
      time: orientirVremia && orientirVremia.number,
      place: orientirMesto && orientirMesto.number,
      person: orientirLichnost && orientirLichnost.number,
      isMale: !!(pol && pol.isChecked),
      isRechOtkl: !!(rechOtkl && rechOtkl.isChecked)
    });
  });

  const text = useAppSelector(state => {
    const field = fieldOf(state, "orientirText");
    return field && field.text;
  });

  return (
    <SectionLink section="kognit" onToggle={props.toggleTab}>
      {phrase}
      <span> {text} </span>
    </SectionLink>
  );
}
