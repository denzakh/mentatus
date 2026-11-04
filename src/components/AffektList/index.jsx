import React, { Component } from "react";
import { connect } from "react-redux";
import dataBase from "../../store/affektData.js";
import { fieldOf } from "../../lib/redux";
import ListOfWords from "../ListOfWords";
import ListOfSentences from "../ListOfSentences";
import FreeText from "../FreeText";
import OnePraseFromRadio from "../OnePraseFromRadio";

class AffektList extends Component {
  render() {
    return (
      <span data-id="affekt" onClick={this.props.toggleTab}>
        {/*Настроение*/}
        <OnePraseFromRadio name="nastroyeniye" dataObj={dataBase} />

        <ListOfWords name="vSvyazi" dataObj={dataBase} isAnd="true" />

        <ListOfWords name="s" dataObj={dataBase} />

        {this.props.isKolebaniaChecked ? (
          <span>
            <span>
              {" "}
              (
              <OnePraseFromRadio
                name="nastroyeniyeKolebaniaPodrobno"
                dataObj={dataBase}
                before=""
              />
              )
            </span>
          </span>
        ) : null}

        <span>. </span>

        <ListOfSentences name="nastroyenieSeparate" dataObj={dataBase} />

        <FreeText name="nastroyeniyeText" />

        {/*Тревога*/}
        <OnePraseFromRadio name="trevoga" dataObj={dataBase} />

        <span>. </span>

        <ListOfSentences name="trevogaSeparate" dataObj={dataBase} />

        <FreeText name="trevogaText" />
      </span>
    );
  }
}

function mapStateToProps(state) {
  const field = fieldOf(state, "nastroyeniyeKolebania");

  return {
    isKolebaniaChecked: !!(field && field.isChecked)
  };
}

export default connect(mapStateToProps)(AffektList);
