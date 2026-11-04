import React, { Component } from "react";
import dataBase from "../../store/sostoyanieData";
import FieldView from "../FieldView";
import type { ListOwnProps } from "../../types/components";

export default class KritikaList extends Component<ListOwnProps> {
  render() {
    return (
      <span data-id="sostoyanie" onClick={this.props.toggleTab}>
        <FieldView name="kritika" dataObj={dataBase} />

        <FieldView name="kritikaText" dataObj={dataBase} />
      </span>
    );
  }
}
