import React, { Component } from "react";
import { connect } from "react-redux";
import dataBase from "../../store/kognitData.js";

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
  const psystatus = state.psystatus;

  // код ориентировки: время + место + личность либо 000,
  // если ориентировку определить не удалось
  const orientirNumber = psystatus.orientirNot.isChecked
    ? "orientir000"
    : "orientir" +
      +psystatus.orientirVremia.number +
      +psystatus.orientirMesto.number +
      +psystatus.orientirLichnost.number;

  const pol = psystatus.pol.isChecked ? "m" : "w";

  return {
    phrase: psystatus.rechOtkl.isChecked
      ? ""
      : dataBase.orientir[pol][orientirNumber],
    text: psystatus.orientirText.text
  };
}

export default connect(mapStateToProps)(OrientirovkaList);
