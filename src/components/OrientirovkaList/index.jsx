import React, { Component } from "react";
import { connect } from "react-redux";
import dataBase from "../../store/kognitData.js";
import { fieldOf } from "../../lib/redux";

class OrientirovkaList extends Component {
  render() {
    return (
      <span data-id="kognit" onClick={this.props.toggleTab}>
        {this.props.phrase}
        <span> {this.props.text} </span>
      </span>
    );
  }
}

function mapStateToProps(state) {
  const orientirNot = fieldOf(state, "orientirNot");
  const orientirVremia = fieldOf(state, "orientirVremia");
  const orientirMesto = fieldOf(state, "orientirMesto");
  const orientirLichnost = fieldOf(state, "orientirLichnost");
  const orientirText = fieldOf(state, "orientirText");
  const pol = fieldOf(state, "pol");
  const rechOtkl = fieldOf(state, "rechOtkl");

  // код ориентировки: время + место + личность либо 000,
  // если ориентировку определить не удалось
  const orientirNumber =
    orientirNot && orientirNot.isChecked
      ? "orientir000"
      : "orientir" +
        +((orientirVremia && orientirVremia.number) || 0) +
        +((orientirMesto && orientirMesto.number) || 0) +
        +((orientirLichnost && orientirLichnost.number) || 0);

  const polCode = pol && pol.isChecked ? "m" : "w";

  return {
    phrase:
      rechOtkl && rechOtkl.isChecked
        ? ""
        : dataBase.orientir[polCode][orientirNumber],
    text: orientirText && orientirText.text
  };
}

export default connect(mapStateToProps)(OrientirovkaList);
