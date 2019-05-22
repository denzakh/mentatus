import React, { Component } from "react";

export default class DiagnozList extends Component {
  render() {
    let diagnozText = () => {
      if (
        this.props.psystatus.diagnozMkb10.text ||
        this.props.psystatus.diagnozKlin.text ||
        this.props.psystatus.diagnozDopolnenie.text
      ) {
        let diagnozMkb10 = () => {
          if (this.props.psystatus.diagnozMkb10.text) {
            return (
              <span>F {this.props.psystatus.diagnozMkb10.text} &nbsp;</span>
            );
          } else {
            return "";
          }
        };

        let diagnozDopolnenie = () => {
          if (this.props.psystatus.diagnozDopolnenie.text) {
            return (
              <span>
                <br />
                {this.props.psystatus.diagnozDopolnenie.text} &nbsp;
              </span>
            );
          } else {
            return "";
          }
        };

        console.log(diagnozDopolnenie);

        return (
          <p>
            <span> Диагноз: </span>
            {diagnozMkb10()}
            <span>{this.props.psystatus.diagnozKlin.text} &nbsp;</span>
            {diagnozDopolnenie()}
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
