import React, { Component } from "react";
import dataBase from "../../store/sostoyanieData.js";
import FieldView from "../FieldView";

export default class KritikaList extends Component {
  render() {
    return (
      <span data-id="sostoyanie" onClick={this.props.toggleTab}>
        <FieldView name="kritika" dataObj={dataBase} />

        <FieldView name="kritikaText" dataObj={dataBase} />
      </span>
    );
  }
}
