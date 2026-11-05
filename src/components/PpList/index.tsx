import React from "react";
import dataBase from "../../store/ppData";
import { fieldOf, useAppSelector } from "../../lib/redux";
import FieldView from "../FieldView";
import SonAppetitList from "../SonAppetitList";
import KritikaList from "../KritikaList";
import type { ListOwnProps } from "../../types/components";

export default function PpList(props: ListOwnProps) {
  const isBredHidden = useAppSelector(state => {
    const field = fieldOf(state, "bredOtkl");
    return !!(field && field.isChecked);
  });
  const isGallHidden = useAppSelector(state => {
    const field = fieldOf(state, "gallOtkl");
    return !!(field && field.isChecked);
  });
  const isOpasnyeHidden = useAppSelector(state => {
    const field = fieldOf(state, "opasnyeOtkl");
    return !!(field && field.isChecked);
  });

  return (
    <span>
      <span data-id="pp" onClick={props.toggleTab}>
        {isBredHidden ? null : (
          <span>
            <FieldView name="bred" dataObj={dataBase} />
          </span>
        )}

        <FieldView name="bredText" dataObj={dataBase} />

        {isGallHidden ? null : (
          <span>
            <FieldView name="gall" dataObj={dataBase} />
          </span>
        )}

        <FieldView name="gallText" dataObj={dataBase} />

        {/*Опасные*/}
        {isOpasnyeHidden ? null : (
          <span>
            <FieldView name="opasnye" dataObj={dataBase} />

            <FieldView name="opasnyeAgressia" dataObj={dataBase} />
          </span>
        )}

        <FieldView name="opasnyeText" dataObj={dataBase} />
      </span>

      <span data-id="affekt" onClick={props.toggleTab}>
        <SonAppetitList />
      </span>

      <span data-id="pp" onClick={props.toggleTab}>
        <KritikaList />
      </span>
    </span>
  );
}
