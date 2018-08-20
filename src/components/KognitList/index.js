import React, { Component } from 'react';
import dataBase from "../../store/kognitData.js";
import ListOfWords from "../ListOfWords";
import ListOfSentences from "../ListOfSentences";
import FreeText from "../FreeText";
import FreeTextBeforeAndAfter from "../FreeTextBeforeAndAfter";

import OnePraseFromRadio from "../OnePraseFromRadio";

export default class AffektList extends Component {

  render() {

    // запрашиваем из стора числовые значния каждой ориентировки
    let orientirVremiaNumber = +this.props.psystatus.orientirVremia.number;
    let orientirMestoNumber = +this.props.psystatus.orientirMesto.number;
    let orientirLichnostNumber = +this.props.psystatus.orientirLichnost.number;

    // склеиваем номера ориентировок для получения кода orientirXXX
    let orientirNumber;
    if (this.props.psystatus.orientirNot.isChecked) {
      orientirNumber = "orientir000";
    } else {
      orientirNumber = "orientir" + orientirVremiaNumber + orientirMestoNumber + orientirLichnostNumber;      
    }
    // по полученному коду выбираем фразу из файла с данными
    let orientirPhrase = dataBase.orientir[orientirNumber];

    let orientirText = this.props.psystatus.orientirText.text;


    return <span data-id="kognit" onClick={this.props.toggleTab} >
       {orientirPhrase}
       {orientirText}

       <FreeText 
          text={this.props.psystatus.orientirText} 
        />

    </span>


  }
}
