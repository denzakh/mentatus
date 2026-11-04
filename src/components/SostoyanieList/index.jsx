import React, { Component } from "react";
import dataBase from "../../store/sostoyanieData.js";
import ListOfWordsZatrud from "../ListOfWordsZatrud";
import ListOfSentences from "../ListOfSentences";
import OnePraseFromRadio from "../OnePraseFromRadio";
import FreeText from "../FreeText";

export default class SostoyanieList extends Component {
  render() {
    return (
      <span data-id="sostoyanie" onClick={this.props.toggleTab}>
        <OnePraseFromRadio name="soznanie" dataObj={dataBase} />

        <OnePraseFromRadio name="kontakt" dataObj={dataBase} />

        {/*затруднен*/}
        <ListOfWordsZatrud name="zatrud" dataObj={dataBase} isAnd="true" />

        {/*Отдельно*/}
        <ListOfSentences name="vpech" dataObj={dataBase} />

        <FreeText name="sostoyanieText" />
      </span>
    );
  }
}
