
import dataBase from "../../store/rechData";
import { fieldOf, useAppSelector } from "../../lib/redux";
import { isRechMainHidden } from "../../lib/rules/visibility";
import FieldView from "../FieldView";
import type { ListOwnProps } from "../../types/components";

export default function RechList(props: ListOwnProps) {
  const isOdnoslojChecked = useAppSelector(state => {
    const field = fieldOf(state, "rechOdnosloj");
    return !!(field && field.isChecked);
  });
  const isNeotvechaetChecked = useAppSelector(state => {
    const field = fieldOf(state, "rechNeotvechaet");
    return !!(field && field.isChecked);
  });
  const isMainHidden = useAppSelector(state => {
    const rechOtkl = fieldOf(state, "rechOtkl");
    const kontakt = fieldOf(state, "kontakt");
    const soznanie = fieldOf(state, "soznanie");

    return isRechMainHidden({
      rechOtkl: !!(rechOtkl && rechOtkl.isChecked),
      kontakt: kontakt && kontakt.number,
      soznanie: soznanie && soznanie.number
    });
  });

  // односложные ответы
  const odnosloj = () =>
    isOdnoslojChecked ? <span>, {dataBase["rechOdnosloj"].phrase}</span> : null;

  // ответы: либо «не отвечает», либо выбранный вариант
  const otvet = () => {
    if (isNeotvechaetChecked) {
      return (
        <span>
          <span> </span>
          <span>
            {dataBase["rechNeotvechaet"].phrase}
            <span>. </span>
          </span>
        </span>
      );
    }

    return (
      <span>
        <span> </span>
        <FieldView name="rechSuschestvo" dataObj={dataBase} />
        {odnosloj()}
        <span>. </span>
      </span>
    );
  };

  // основная часть выводится, если речь сохранна и контакт доступен
  const mainShow = () => {
    if (isMainHidden) {
      if (isNeotvechaetChecked) {
        return (
          <span>
            {dataBase["rechNeotvechaet"].phrase}
            <span>. </span>
          </span>
        );
      }

      return null;
    }

    return (
      <span>
        <FieldView name="myshleniePosled" dataObj={dataBase} />

        <FieldView name="myshlenieTemp" dataObj={dataBase} />

        <FieldView name="myshlenie" dataObj={dataBase} isAnd />
        <span>.</span>

        <FieldView name="myshlenieText" dataObj={dataBase} />

        {/*речь*/}

        <FieldView name="rechOsob" dataObj={dataBase} />

        {otvet()}

        <FieldView name="rechOtmech" dataObj={dataBase} />
      </span>
    );
  };

  return (
    <span data-id="rech" onClick={props.toggleTab}>
      {mainShow()}

      <FieldView name="rechGrub" dataObj={dataBase} as="sentences" />

      <FieldView name="rechText" dataObj={dataBase} />
    </span>
  );
}
