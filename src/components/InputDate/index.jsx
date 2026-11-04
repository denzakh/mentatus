import React, { Component } from "react";
import "./InputDate.css";

export default class InputDate extends Component {
  render() {
    return (
      <div className="date">
        <label>
          <span className="date__label">{this.props.label}</span>
          <input
            type="date"
            className="date__input"
            onChange={this.props.onChange}
            name={this.props.name}
            value={this.props.value}
          />
        </label>
      </div>
    );
  }
}
