import React, { Component } from "react";
import { connect } from "react-redux";
import dataBase from "../../store/zhalobyData.js";
import ListOfWords from "../ListOfWords";
import FreeText from "../FreeText";

class ZhalobyList extends Component {
  render() {
    return (
      <span
        className="list__section"
        data-id="zhaloby"
        onClick={this.props.toggleTab}
      >
        {this.props.isHidden ? null : (
          <ListOfWords name="zhalobyCicle" dataObj={dataBase} />
        )}

        <FreeText name="zhalobyText" />
      </span>
    );
  }
}

// жалобы не выводятся, если речь нарушена, контакт недоступен
// или помрачено сознание
function mapStateToProps(state) {
  const psystatus = state.psystatus;

  return {
    isHidden:
      psystatus.rechOtkl.isChecked ||
      psystatus.rechNeotvechaet.isChecked ||
      +psystatus.kontakt.number === 2 ||
      +psystatus.soznanie.number === 7
  };
}

export default connect(mapStateToProps)(ZhalobyList);
