import React, { Component } from "react";
import { connect } from "react-redux";
import dataBase from "../../store/anamnezData.js";
import { fieldOf } from "../../lib/redux";
import ListOfWords from "../ListOfWords";
import FreeText from "../FreeText";

class AnamnezList extends Component {
  render() {
    return (
      <span data-id="anamnez" onClick={this.props.toggleTab}>
        {this.props.isHidden ? null : (
          <span>
            <ListOfWords name="anamnezCicle" dataObj={dataBase} />
          </span>
        )}

        <FreeText name="anamnezText" />
      </span>
    );
  }
}

// анамнез не выводится, если врач его не собрал
function mapStateToProps(state) {
  const field = fieldOf(state, "anamnezOtkl");

  return {
    isHidden: !!(field && field.isChecked)
  };
}

export default connect(mapStateToProps)(AnamnezList);
