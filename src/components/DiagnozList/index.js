import React, { Component } from "react";
import dataBase from "../../store/diagnozData.js";

export default class DiagnozList extends Component {
  render() {
    return (
      <div data-id="diagnoz" onClick={this.props.toggleTab}>
        <p>
          <span> Диагноз: </span>
          <span>{this.props.psystatus.diagnozMkb10.text} &nbsp;</span>
          <span>{this.props.psystatus.diagnozKlin.text} &nbsp;</span>
          <span>{this.props.psystatus.diagnozDopolnenie.text} &nbsp;</span>
        </p>
      </div>
    );
  }
}
