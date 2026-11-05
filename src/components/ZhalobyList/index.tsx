import React from "react";
import dataBase from "../../store/zhalobyData";
import { fieldOf, useAppSelector } from "../../lib/redux";
import { isZhalobyHidden } from "../../lib/rules/visibility";
import FieldView from "../FieldView";
import type { ListOwnProps } from "../../types/components";

export default function ZhalobyList(props: ListOwnProps) {
  // жалобы не выводятся, если речь нарушена, контакт недоступен
  // или помрачено сознание
  const isHidden = useAppSelector(state => {
    const rechOtkl = fieldOf(state, "rechOtkl");
    const rechNeotvechaet = fieldOf(state, "rechNeotvechaet");
    const kontakt = fieldOf(state, "kontakt");
    const soznanie = fieldOf(state, "soznanie");

    return isZhalobyHidden({
      rechOtkl: !!(rechOtkl && rechOtkl.isChecked),
      rechNeotvechaet: !!(rechNeotvechaet && rechNeotvechaet.isChecked),
      kontakt: kontakt && kontakt.number,
      soznanie: soznanie && soznanie.number
    });
  });

  return (
    <span className="list__section" data-id="zhaloby" onClick={props.toggleTab}>
      {isHidden ? null : <FieldView name="zhalobyCicle" dataObj={dataBase} />}

      <FieldView name="zhalobyText" dataObj={dataBase} />
    </span>
  );
}
