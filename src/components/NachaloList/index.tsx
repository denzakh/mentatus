import React, { Component } from "react";
import { connect } from "react-redux";
import dataBase from "../../store/sostoyanieData";
import { todayIso, formatDate } from "../../lib/text/date";
import { buildNachaloText } from "../../lib/text/nachalo";
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
    const nachalo = buildNachaloText({
      date,
      isMale,
      mestoOsmotra: optionById(dataBase.mestoOsmotra, mestoOsmotraNumber),
      poNapravleniu,
      sIstorieiOznakomlen,
      nedobrovolno,
      nedobrovolnoPrichina: optionById(
        dataBase.nedobrovolnoPrichiny,
        nedobrovolnoPrichinyNumber
      ),
      nedobrovolnoPunkt: optionById(
        dataBase.nedobrovolnoPunkt,
        nedobrovolnoPunktNumber
      ),
      nedobrovolnoText
    });

    return (
      <span>
        <span>
          {date}. {nachalo.osmotr} {nachalo.sIstorieiOznakomlenText}
        </span>
        <span>
          {nachalo.soglasie} {nachalo.nedobrovolnoText} {nachalo.zakon}
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
