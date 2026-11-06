import SectionLink from "../SectionLink";

import dataBase from "../../store/sostoyanieData";
import FieldView from "../FieldView";
import type { ListOwnProps } from "../../types/components";

export default function KritikaList(props: ListOwnProps) {
  return (
    <SectionLink section="sostoyanie" onToggle={props.toggleTab}>
      <FieldView name="kritika" dataObj={dataBase} />

      <FieldView name="kritikaText" dataObj={dataBase} />
    </SectionLink>
  );
}
