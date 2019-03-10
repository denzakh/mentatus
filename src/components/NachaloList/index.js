import React, { Component } from "react";

export default class NachaloList extends Component {
  render() {
    let osmotr =
      (this.props.psystatus["pol"].isChecked ? "Осмотрен " : "Осмотрена ") +
      this.props.dataBase.mestoOsmotra.data[
        this.props.psystatus.mestoOsmotra.number
      ].phrase +
      (this.props.psystatus["poNapravleniu"].isChecked
        ? " по направлению врача соматического профиля"
        : "") +
      ".";

    let soglasie = "";
    if (this.props.psystatus["nedobrovolno"].isChecked) {
      console.log(this.props.dataBase.nedobrovolnoPrichiny.data);
      soglasie = this.props.dataBase.nedobrovolnoPrichiny.data[
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
        this.props.dataBase.nedobrovolnoPunkt.data[
          this.props.psystatus.nedobrovolnoPunkt.number
        ].punkt +
        "» закона РФ «О психиатрической помощи и гарантиях прав граждан при ее оказании», т.к. совершает действия, дающие основания предполагать наличие у " +
        (this.props.psystatus["pol"].isChecked ? "него " : "нее ") +
        "тяжелого психического расстройства, которое обусловливает " +
        (this.props.psystatus.nedobrovolnoPunkt.number == 2
          ? ""
          : this.props.psystatus["pol"].isChecked
          ? "его "
          : "ее ") +
        this.props.dataBase.nedobrovolnoPunkt.data[
          this.props.psystatus.nedobrovolnoPunkt.number
        ].phrase +
        ".";
    }

    return (
      <p>
        <span>{osmotr} </span>
        <span>
          {soglasie} {this.props.psystatus.nedobrovolnoText.text} {zakon}
        </span>
      </p>
    );
  }
}
