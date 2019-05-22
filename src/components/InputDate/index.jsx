import React, { Component } from "react";
import "./InputDate.css";

export default class InputDate extends Component {
  render() {
    let defaultValue = this.props.value;
    if (!defaultValue) {
      let now = new Date();

      defaultValue =
        now.getFullYear() +
        "-" +
        ("0" + (now.getMonth() + 1)).slice(-2) +
        "-" +
        ("0" + now.getDate()).slice(-2);
    }
    return (
      <div className="date">
        <label>
          <span className="date__label">{this.props.label}</span>
          <input
            type="date"
            className="date__input"
            onChange={this.props.onChange}
            name={this.props.name}
            defaultValue={defaultValue}
          />
        </label>
      </div>
    );
  }
}
