import React, { Component } from "react";
import { connect } from "react-redux";
import dataBase from "../../store/sostoyanieData.js";
import { todayIso, formatDate } from "../../lib/text/date";
import { fieldOf } from "../../lib/redux";

class NachaloList extends Component {
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

    const osmotr =
      (isMale ? "Осмотрен " : "Осмотрена ") +
      dataBase.mestoOsmotra.data[mestoOsmotraNumber].phrase +
      (poNapravleniu ? " по направлению врача соматического профиля" : "") +
      ".";

    const sIstorieiOznakomlenText = sIstorieiOznakomlen
      ? " С историей болезни врач ознакомлен. "
      : "";

    const soglasie = nedobrovolno
      ? dataBase.nedobrovolnoPrichiny.data[nedobrovolnoPrichinyNumber].phrase
      : "На беседу с врачом-психиатром " +
        (isMale ? "согласен" : "согласна") +
        ". ";

    let zakon = "";
    if (nedobrovolno) {
      zakon =
        (isMale ? "Освидетельствован" : "Освидетельствована") +
        " недобровольно на основании  ст. 23 ч.4 п «" +
        dataBase.nedobrovolnoPunkt.data[nedobrovolnoPunktNumber].punkt +
        "» закона РФ «О психиатрической помощи и гарантиях прав граждан при ее оказании», т.к. совершает действия, дающие основания предполагать наличие у " +
        (isMale ? "него " : "нее ") +
        "тяжелого психического расстройства, которое обусловливает " +
        (nedobrovolnoPunktNumber === 2 ? "" : isMale ? "его " : "ее ") +
        dataBase.nedobrovolnoPunkt.data[nedobrovolnoPunktNumber].phrase +
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

function mapStateToProps(state) {
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

export default connect(mapStateToProps)(NachaloList);
