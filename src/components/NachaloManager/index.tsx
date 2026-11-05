import React from "react";
import { fieldOf, useAppSelector } from "../../lib/redux";
import Checkbox from "../Checkbox";
import CheckboxOtkl from "../CheckboxOtkl";
import CheckboxPol from "../CheckboxPol";
import RadioList from "../RadioList";
import Textarea from "../Textarea";
import TextareaInline from "../TextareaInline";
import InputDate from "../InputDate";
import type { Schema } from "../../types/schema";

interface OwnProps {
  dataBase?: Schema;
}

export default function NachaloManager(props: OwnProps) {
  const isMestoText = useAppSelector(state => {
    const mestoOsmotra = fieldOf(state, "mestoOsmotra");
    // своё место осмотра спрашиваем только для варианта «другое»
    return +((mestoOsmotra && mestoOsmotra.number) || 0) === 3;
  });

  const isNedobrovolno = useAppSelector(state => {
    const nedobrovolno = fieldOf(state, "nedobrovolno");
    return !!(nedobrovolno && nedobrovolno.isChecked);
  });

  const nedobrovolno = () =>
    isNedobrovolno ? (
      <div>
        <div className="list__title">причины:</div>
        <RadioList name="nedobrovolnoPrichiny" dataBase={props.dataBase} />
        <Textarea name="nedobrovolnoText" label="" />
        <div className="list__title">пункт закона:</div>
        <RadioList name="nedobrovolnoPunkt" dataBase={props.dataBase} />
      </div>
    ) : null;

  return (
    <div>
      <div className="no-break">
        <div className="list__title list__title--no-top-margin">Oбщее:</div>

        <InputDate name="dataOsmotra" label="Дата осмотра" />

        <CheckboxPol />

        <TextareaInline name="vozrast" label="Возраст" />

        <div className="list__title">Oсмотр:</div>
        <RadioList name="mestoOsmotra" dataBase={props.dataBase} />
        {isMestoText ? <Textarea name="mestoText" label="" /> : null}
        <div className="list__add">
          <Checkbox name="poNapravleniu" dataBase={props.dataBase} />
        </div>
        <div className="list__add">
          <Checkbox name="sIstorieiOznakomlen" dataBase={props.dataBase} />
        </div>
      </div>

      <div className="no-break">
        <div className="list__title">
          {" "}
          {isNedobrovolno ? "Недобровольный осмотр:" : "Согласие получено"}
        </div>
        <div className="list__item">
          <CheckboxOtkl name="nedobrovolno" dataBase={props.dataBase} />
        </div>
        {nedobrovolno()}
        <br />
      </div>
    </div>
  );
}
