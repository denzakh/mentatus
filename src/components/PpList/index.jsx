import React, { Component } from "react";
import { connect } from "react-redux";
import dataBase from "../../store/ppData.js";
import { fieldOf } from "../../lib/redux";
import ListOfWords from "../ListOfWords";
import FreeText from "../FreeText";
import OnePraseFromRadio from "../OnePraseFromRadio";
import SonAppetitList from "../SonAppetitList";
import KritikaList from "../KritikaList";

class PpList extends Component {
  render() {
    return (
      <span>
        <span data-id="pp" onClick={this.props.toggleTab}>
          {this.props.isBredHidden ? null : (
            <span>
              <ListOfWords name="bred" dataObj={dataBase} />
            </span>
          )}

          <FreeText name="bredText" />

          {this.props.isGallHidden ? null : (
            <span>
              <ListOfWords name="gall" dataObj={dataBase} />
            </span>
          )}

          <FreeText name="gallText" />

          {/*Опасные*/}
          {this.props.isOpasnyeHidden ? null : (
            <span>
              <OnePraseFromRadio name="opasnye" dataObj={dataBase} />

              <OnePraseFromRadio name="opasnyeAgressia" dataObj={dataBase} />
            </span>
          )}

          <FreeText name="opasnyeText" />
        </span>

        <span data-id="affekt" onClick={this.props.toggleTab}>
          <SonAppetitList />
        </span>

        <span data-id="pp" onClick={this.props.toggleTab}>
          <KritikaList />
        </span>
      </span>
    );
  }
}

function mapStateToProps(state) {
  const bredOtkl = fieldOf(state, "bredOtkl");
  const gallOtkl = fieldOf(state, "gallOtkl");
  const opasnyeOtkl = fieldOf(state, "opasnyeOtkl");

  return {
    isBredHidden: !!(bredOtkl && bredOtkl.isChecked),
    isGallHidden: !!(gallOtkl && gallOtkl.isChecked),
    isOpasnyeHidden: !!(opasnyeOtkl && opasnyeOtkl.isChecked)
  };
}

export default connect(mapStateToProps)(PpList);
