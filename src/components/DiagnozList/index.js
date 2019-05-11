import React, { Component } from "react";
import dataBase from "../../store/diagnozData.js";

export default class DiagnozList extends Component {
  render() {
    let diagnozText = () => {
      if (this.props.psystatus.diagnozMkb10.text) {
        return (
          <p>
            <span> Диагноз: </span>
            <span>{this.props.psystatus.diagnozMkb10.text} &nbsp;</span>
            <span>{this.props.psystatus.diagnozKlin.text} &nbsp;</span>
            <span>{this.props.psystatus.diagnozDopolnenie.text} &nbsp;</span>
          </p>
        );
      } else {
        return "";
      }
    };

    let reqText = () => {
      if (this.props.psystatus.reqilech.text) {
        return (
          <p>
            <span> Рекомендовано: </span> <br />
            <span className="pre">
              {this.props.psystatus.reqilech.text} &nbsp;
            </span>
          </p>
        );
      } else {
        return "";
      }
    };

    return (
      <div data-id="diagnoz" onClick={this.props.toggleTab}>
        {diagnozText()}
        {reqText()}
      </div>
    );
  }
}
