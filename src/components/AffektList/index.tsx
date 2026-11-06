import SectionLink from "../SectionLink";

import dataBase from "../../store/affektData";
import { fieldOf, useAppSelector } from "../../lib/redux";
import FieldView from "../FieldView";
import type { ListOwnProps } from "../../types/components";

export default function AffektList(props: ListOwnProps) {
  const isKolebaniaChecked = useAppSelector(state => {
    const field = fieldOf(state, "nastroyeniyeKolebania");
    return !!(field && field.isChecked);
  });

  return (
    <SectionLink section="affekt" onToggle={props.toggleTab}>
      {/*Настроение*/}
      <FieldView name="nastroyeniye" dataObj={dataBase} />

      <FieldView name="vSvyazi" dataObj={dataBase} isAnd />

      <FieldView name="s" dataObj={dataBase} />

      {isKolebaniaChecked ? (
        <span>
          <span>
            {" "}
            (
            <FieldView
              name="nastroyeniyeKolebaniaPodrobno"
              dataObj={dataBase}
            />
            )
          </span>
        </span>
      ) : null}

      <span>. </span>

      <FieldView name="nastroyenieSeparate" dataObj={dataBase} as="sentences" />

      <FieldView name="nastroyeniyeText" dataObj={dataBase} />

      {/*Тревога*/}
      <FieldView name="trevoga" dataObj={dataBase} />

      <span>. </span>

      <FieldView name="trevogaSeparate" dataObj={dataBase} as="sentences" />

      <FieldView name="trevogaText" dataObj={dataBase} />
    </SectionLink>
  );
}
