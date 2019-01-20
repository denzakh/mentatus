import React, { Component } from "react";
import dataBase from "../../store/diagnozData";
import Textarea from "../Textarea";
import "./Diagnoz.css";

export default class OrientirovkaManager extends Component {
  render() {
    return (
      <div className="diagnoz">
        <h3>Диагноз</h3>
        <div className="diagnoz__row diagnoz__row--mkb">
          <span className="diagnoz__mkb-label">МКБ-10:</span>
          F&nbsp;
          <input
            className="diagnoz__mkb-input"
            name="diagnozMkb10"
            onChange={this.props.toggleText}
            value={this.props.psystatus.diagnozMkb10.text}
          />
        </div>
        <div className="diagnoz__row">
          Основной:
          <br />
          <textarea
            className="diagnoz__textarea"
            name="diagnozKlin"
            onChange={this.props.toggleText}
          >
            {this.props.psystatus.diagnozKlin.text}
          </textarea>
        </div>
        <div className="diagnoz__row">
          Дополнительный:
          <br />
          <textarea
            className="diagnoz__textarea"
            name="diagnozDopolnenie"
            onChange={this.props.toggleText}
          >
            {this.props.psystatus.diagnozDopolnenie.text}
          </textarea>
        </div>
      </div>
    );
  }
}
