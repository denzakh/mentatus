import React, { Component } from "react";
import { connect } from "react-redux";
import dataBase from "../../store/zhalobyData.js";
import { fieldOf } from "../../lib/redux";
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
  const rechOtkl = fieldOf(state, "rechOtkl");
  const rechNeotvechaet = fieldOf(state, "rechNeotvechaet");
  const kontakt = fieldOf(state, "kontakt");
  const soznanie = fieldOf(state, "soznanie");

  return {
    isHidden:
      !!(rechOtkl && rechOtkl.isChecked) ||
      !!(rechNeotvechaet && rechNeotvechaet.isChecked) ||
      +((kontakt && kontakt.number) || 0) === 2 ||
      +((soznanie && soznanie.number) || 0) === 7
  };
}

export default connect(mapStateToProps)(ZhalobyList);
