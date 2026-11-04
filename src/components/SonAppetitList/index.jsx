import React, { Component } from "react";
import { connect } from "react-redux";
import dataBase from "../../store/affektData.js";
import ListOfWords from "../ListOfWords";
import ListOfSentences from "../ListOfSentences";
import FreeText from "../FreeText";
import FreeTextBeforeAndAfter from "../FreeTextBeforeAndAfter";
import OnePraseFromRadio from "../OnePraseFromRadio";

class SonAppetitList extends Component {
  render() {
    return (
      <span>
        {/*Сон*/}
        <ListOfWords name="son" dataObj={dataBase} />
        <span>. </span>

        <ListOfSentences name="sonSeparate" dataObj={dataBase} />

        {/*Аппетит*/}
        <OnePraseFromRadio name="appetit" dataObj={dataBase} />
        {this.props.hasPohudel ? (
          <span>
            <FreeTextBeforeAndAfter name="appetitPohudel" dataObj={dataBase} />
          </span>
        ) : null}
        <span>. </span>

        <FreeText name="appetitText" />
      </span>
    );
  }
}

function mapStateToProps(state) {
  return {
    hasPohudel: !!state.psystatus.appetitPohudel.text
  };
}

export default connect(mapStateToProps)(SonAppetitList);
