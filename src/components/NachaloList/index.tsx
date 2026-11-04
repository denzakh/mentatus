import React, { Component } from "react";
import { connect } from "react-redux";
import dataBase from "../../store/sostoyanieData";
import { todayIso, formatDate } from "../../lib/text/date";
import { fieldOf } from "../../lib/redux";
import { optionById } from "../../lib/schema";
import type { ListOwnProps } from "../../types/components";
import type { StatusState } from "../../types/status";

interface StateProps {
  date: string;
  isMale: boolean;
  mestoOsmotraNumber?: number;
  poNapravleniu: boolean;
  sIstorieiOznakomlen: boolean;
  nedobrovolno: boolean;
  nedobrovolnoPrichinyNumber?: number;
  nedobrovolnoPunktNumber?: number;
  nedobrovolnoText?: string | false;
}

type Props = ListOwnProps & StateProps;

class NachaloList extends Component<Props> {
  render() {
    const {
      date,
      isMale,
      mestoOsmotraNumber,
      poNapravleniu,
      sIstorieiOznakomlen,
      nedobrovolno,
      nedobrovolnoPrichinyNumber,
      nedobrovolnoPunktNumber,
      nedobrovolnoText
    } = this.props;

    // пункты радиогрупп ищем по id, а не по позиции в массиве схемы
    const mesto = optionById(dataBase.mestoOsmotra, mestoOsmotraNumber);

    const osmotr =
      (isMale ? "Осмотрен " : "Осмотрена ") +
      (mesto ? mesto.phrase : "") +
      (poNapravleniu ? " по направлению врача соматического профиля" : "") +
      ".";

    const sIstorieiOznakomlenText = sIstorieiOznakomlen
      ? " С историей болезни врач ознакомлен. "
      : "";

    const prichina = optionById(
      dataBase.nedobrovolnoPrichiny,
      nedobrovolnoPrichinyNumber
    );

    const soglasie = nedobrovolno
      ? prichina
        ? prichina.phrase
        : ""
      : "На беседу с врачом-психиатром " +
        (isMale ? "согласен" : "согласна") +
        ". ";

    const punkt = optionById(
      dataBase.nedobrovolnoPunkt,
      nedobrovolnoPunktNumber
    );

    let zakon = "";
    if (nedobrovolno) {
      zakon =
        (isMale ? "Освидетельствован" : "Освидетельствована") +
        " недобровольно на основании  ст. 23 ч.4 п «" +
        (punkt ? punkt.punkt : "") +
        "» закона РФ «О психиатрической помощи и гарантиях прав граждан при ее оказании», т.к. совершает действия, дающие основания предполагать наличие у " +
        (isMale ? "него " : "нее ") +
        "тяжелого психического расстройства, которое обусловливает " +
        (nedobrovolnoPunktNumber === 2 ? "" : isMale ? "его " : "ее ") +
        (punkt ? punkt.phrase : "") +
        ".";
    }

    return (
      <span>
        <span>
          {date}. {osmotr} {sIstorieiOznakomlenText}
        </span>
        <span>
          {soglasie} {nedobrovolnoText} {zakon}
        </span>
      </span>
    );
  }
}

function mapStateToProps(state: StatusState): StateProps {
  const dataOsmotra = fieldOf(state, "dataOsmotra");
  const pol = fieldOf(state, "pol");
  const mestoOsmotra = fieldOf(state, "mestoOsmotra");
  const poNapravleniu = fieldOf(state, "poNapravleniu");
  const sIstorieiOznakomlen = fieldOf(state, "sIstorieiOznakomlen");
  const nedobrovolno = fieldOf(state, "nedobrovolno");
  const nedobrovolnoPrichiny = fieldOf(state, "nedobrovolnoPrichiny");
  const nedobrovolnoPunkt = fieldOf(state, "nedobrovolnoPunkt");
  const nedobrovolnoText = fieldOf(state, "nedobrovolnoText");

  return {
    // дата осмотра: из стора, а если её нет — сегодняшняя
    date: formatDate(dataOsmotra && dataOsmotra.text) || formatDate(todayIso()),
    isMale: !!(pol && pol.isChecked),
    mestoOsmotraNumber: mestoOsmotra && mestoOsmotra.number,
    poNapravleniu: !!(poNapravleniu && poNapravleniu.isChecked),
    sIstorieiOznakomlen: !!(
      sIstorieiOznakomlen && sIstorieiOznakomlen.isChecked
    ),
    nedobrovolno: !!(nedobrovolno && nedobrovolno.isChecked),
    nedobrovolnoPrichinyNumber:
      nedobrovolnoPrichiny && nedobrovolnoPrichiny.number,
    nedobrovolnoPunktNumber: nedobrovolnoPunkt && nedobrovolnoPunkt.number,
    nedobrovolnoText: nedobrovolnoText && nedobrovolnoText.text
  };
}

export default connect<StateProps, unknown, ListOwnProps>(mapStateToProps)(
  NachaloList
);
