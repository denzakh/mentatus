import React, { Component } from "react";
import { connect } from "react-redux";
import dataBase from "../../store/kognitData.js";
import { fingerPhrase } from "../../lib/text";
import { fieldOf } from "../../lib/redux";
import FieldView from "../FieldView";

class KognitList extends Component {
  render() {
    return (
      <span data-id="kognit" onClick={this.props.toggleTab}>
        {/*Интел-мнест функции*/}
        <FieldView name="kognitOsnivnoi" dataObj={dataBase} />
        {/*Отмечается*/}
        <FieldView name="otmech" dataObj={dataBase} />

        {/*пальцы*/}
        <span> {this.props.fingerText}</span>

        {/*Отдельно*/}
        <FieldView name="otdel" dataObj={dataBase} as="sentences" />
      </span>
    );
  }
}

function mapStateToProps(state) {
  const field = fieldOf(state, "kognitFingerN");

  return {
    fingerText: fingerPhrase(field && field.number)
  };
}

export default connect(mapStateToProps)(KognitList);
