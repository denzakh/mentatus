import React, { Component } from "react";
import { connect } from "react-redux";
import dataBase from "../../store/kognitData.js";
import { fingerPhrase } from "../../lib/text";
import ListOfWords from "../ListOfWords";
import ListOfSentences from "../ListOfSentences";
import OnePraseFromRadio from "../OnePraseFromRadio";

class KognitList extends Component {
  render() {
    return (
      <span data-id="kognit" onClick={this.props.toggleTab}>
        {/*Интел-мнест функции*/}
        <OnePraseFromRadio name="kognitOsnivnoi" dataObj={dataBase} />
        {/*Отмечается*/}
        <ListOfWords name="otmech" dataObj={dataBase} />

        {/*пальцы*/}
        <span> {this.props.fingerText}</span>

        {/*Отдельно*/}
        <ListOfSentences name="otdel" dataObj={dataBase} />
      </span>
    );
  }
}

function mapStateToProps(state) {
  return {
    fingerText: fingerPhrase(state.psystatus.kognitFingerN.number)
  };
}

export default connect(mapStateToProps)(KognitList);
