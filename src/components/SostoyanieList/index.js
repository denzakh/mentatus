import React, { Component } from "react";
import dataBase from "../../store/sostoyanieData.js";
import ListOfWordsZatrud from "../ListOfWordsZatrud";
import ListOfSentences from "../ListOfSentences";
import OnePraseFromRadio from "../OnePraseFromRadio";
import NachaloList from "../NachaloList";

export default class SostoyanieList extends Component {
  render() {
    return (
      <span data-id="sostoyanie" onClick={this.props.toggleTab}>
        <NachaloList
          dataBase={dataBase}
          toggleRadio={this.props.toggleRadio}
          toggleSymptom={this.props.toggleSymptom}
          toggleText={this.props.toggleText}
          psystatus={this.props.psystatus}
        />

        <OnePraseFromRadio
          name="soznanie"
          dataObj={dataBase}
          psystatus={this.props.psystatus}
        />

        <OnePraseFromRadio
          name="kontakt"
          dataObj={dataBase}
          psystatus={this.props.psystatus}
        />

        {/*затруднен*/}
        <ListOfWordsZatrud
          name="zatrud"
          dataObj={dataBase}
          psystatus={this.props.psystatus}
          isAnd="true"
        />

        {/*Отдельно*/}
        <ListOfSentences
          name="vpech"
          dataObj={dataBase}
          psystatus={this.props.psystatus}
        />
      </span>
    );
  }
}
