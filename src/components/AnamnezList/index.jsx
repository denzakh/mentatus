import React, { Component } from "react";
import { connect } from "react-redux";
import dataBase from "../../store/anamnezData.js";
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
  return {
    isHidden: state.psystatus.anamnezOtkl.isChecked
  };
}

export default connect(mapStateToProps)(AnamnezList);
