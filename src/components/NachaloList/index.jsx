import React, { Component } from "react";
import dataBase from "../../store/sostoyanieData.js";

export default class NachaloList extends Component {
  render() {
    let dataOsmotra = () => {
      let currentDate = this.props.psystatus["dataOsmotra"].text;
      if (!currentDate) {
        let now = new Date();
        currentDate =
          ("0" + now.getDate()).slice(-2) +
          "." +
          ("0" + (now.getMonth() + 1)).slice(-2) +
          "." +
          now.getFullYear();
      } else {
        let arr = currentDate.split("-");
        currentDate = arr[2] + "." + arr[1] + "." + arr[0];
      }
      return currentDate;
    };

    let osmotr =
      (this.props.psystatus["pol"].isChecked ? "Осмотрен " : "Осмотрена ") +
      dataBase.mestoOsmotra.data[this.props.psystatus.mestoOsmotra.number]
        .phrase +
      (this.props.psystatus["poNapravleniu"].isChecked
        ? " по направлению врача соматического профиля"
        : "") +
      ".";

    let sIstorieiOznakomlen = this.props.psystatus["sIstorieiOznakomlen"]
      .isChecked
      ? " С историей болезни врач ознакомлен. "
      : "";

    let soglasie = "";
    if (this.props.psystatus["nedobrovolno"].isChecked) {
      soglasie =
        dataBase.nedobrovolnoPrichiny.data[
          this.props.psystatus.nedobrovolnoPrichiny.number
        ].phrase;
    } else {
      soglasie =
        "На беседу с врачом-психиатром " +
        (this.props.psystatus["pol"].isChecked ? "согласен" : "согласна") +
        ". ";
    }

    let zakon = "";
    if (this.props.psystatus["nedobrovolno"].isChecked) {
      zakon =
        (this.props.psystatus["pol"].isChecked
          ? "Освидетельствован"
          : "Освидетельствована") +
        " недобровольно на основании  ст. 23 ч.4 п «" +
        dataBase.nedobrovolnoPunkt.data[
          this.props.psystatus.nedobrovolnoPunkt.number
        ].punkt +
        "» закона РФ «О психиатрической помощи и гарантиях прав граждан при ее оказании», т.к. совершает действия, дающие основания предполагать наличие у " +
        (this.props.psystatus["pol"].isChecked ? "него " : "нее ") +
        "тяжелого психического расстройства, которое обусловливает " +
        (this.props.psystatus.nedobrovolnoPunkt.number === 2
          ? ""
          : this.props.psystatus["pol"].isChecked
          ? "его "
          : "ее ") +
        dataBase.nedobrovolnoPunkt.data[
          this.props.psystatus.nedobrovolnoPunkt.number
        ].phrase +
        ".";
    }

    return (
      <span>
        <span>
          {dataOsmotra()}. {osmotr} {sIstorieiOznakomlen}
        </span>
        <span>
          {soglasie} {this.props.psystatus.nedobrovolnoText.text} {zakon}
        </span>
      </span>
    );
  }
}
