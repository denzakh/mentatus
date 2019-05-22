import React, { Component } from "react";
import dataBase from "../../store/sostoyanieData.js";
import FreeText from "../FreeText";
import OnePraseFromRadio from "../OnePraseFromRadio";

export default class KritikaList extends Component {
  render() {
    return (
      <span data-id="sostoyanie" onClick={this.props.toggleTab}>
        <OnePraseFromRadio
          name="kritika"
          dataObj={dataBase}
          psystatus={this.props.psystatus}
        />

        <FreeText text={this.props.psystatus.kritikaText} />
      </span>
    );
  }
}
