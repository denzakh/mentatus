import React, { Component } from "react";
import dataBase from "../../store/sostoyanieData.js";
import RadioList from "../RadioList";
import Textarea from "../Textarea";

export default class KritikaManager extends Component {
  render() {
    return (
      <div>
        <div className="list__title list__title--no-top-margin">Критика:</div>
        <RadioList
          name="kritika"
          dataBase={dataBase}
          onChange={this.props.toggleRadio}
          psystatus={this.props.psystatus}
        />

        <Textarea
          onChange={this.props.toggleText}
          name="kritikaText"
          label="Описание критики"
          value={this.props.psystatus.kritikaText}
        />
      </div>
    );
  }
}
