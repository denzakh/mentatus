import React, { Component } from "react";
import dataBase from "../../store/zhalobyData.js";
import ListOfWords from "../ListOfWords";
import FreeText from "../FreeText";

export default class ZhalobyList extends Component {
  render() {
    let showZhaloby = () => {
      if (
        !(
          this.props.psystatus.rechOtkl.isChecked ||
          this.props.psystatus.rechNeotvechaet.isChecked ||
          this.props.psystatus.kontakt.number === 2 ||
          this.props.psystatus.soznanie.number === 7
        )
      ) {
        return (
          <ListOfWords
            name="zhalobyCicle"
            dataObj={dataBase}
            psystatus={this.props.psystatus}
          />
        );
      }
    };

    return (
      <span
        className="list__section"
        data-id="zhaloby"
        onClick={this.props.toggleTab}
      >
        {showZhaloby()}

        <FreeText text={this.props.psystatus.zhalobyText} />
      </span>
    );
  }
}
