import React, { Component } from "react";
import dataBase from "../../store/kognitData.js";

export default class AffektList extends Component {
  render() {
    let pol = this.props.psystatus["pol"].isChecked ? "m" : "w";

    // запрашиваем из стора числовые значния каждой ориентировки
    let orientirVremiaNumber = +this.props.psystatus.orientirVremia.number;
    let orientirMestoNumber = +this.props.psystatus.orientirMesto.number;
    let orientirLichnostNumber = +this.props.psystatus.orientirLichnost.number;

    // склеиваем номера ориентировок для получения кода orientirXXX
    let orientirNumber;
    if (this.props.psystatus.orientirNot.isChecked) {
      orientirNumber = "orientir000";
    } else {
      orientirNumber =
        "orientir" +
        orientirVremiaNumber +
        orientirMestoNumber +
        orientirLichnostNumber;
    }
    // по полученному коду выбираем фразу из файла с данными
    let orientirPhrase = dataBase.orientir[pol][orientirNumber];

    let orientirText = this.props.psystatus.orientirText.text;

    return (
      <span data-id="kognit" onClick={this.props.toggleTab}>
        {orientirPhrase}
        <span> {orientirText} </span>
      </span>
    );
  }
}
