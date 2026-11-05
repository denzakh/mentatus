import React from "react";
import dataBase from "../../store/affektData";
import { fieldOf, useAppSelector } from "../../lib/redux";
import FieldView from "../FieldView";

export default function SonAppetitList() {
  const hasPohudel = useAppSelector(state => {
    const field = fieldOf(state, "appetitPohudel");
    return !!(field && field.text);
  });

  return (
    <span>
      {/*Сон*/}
      <FieldView name="son" dataObj={dataBase} />
      <span>. </span>

      <FieldView name="sonSeparate" dataObj={dataBase} as="sentences" />

      {/*Аппетит*/}
      <FieldView name="appetit" dataObj={dataBase} />
      {hasPohudel ? (
        <span>
          <FieldView name="appetitPohudel" dataObj={dataBase} />
        </span>
      ) : null}
      <span>. </span>

      <FieldView name="appetitText" dataObj={dataBase} />
    </span>
  );
}
