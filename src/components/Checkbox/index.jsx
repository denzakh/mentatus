import React, { Component } from "react";
import "./Checkbox.css";

export default class Checkbox extends Component {
  render() {
    return (
      <span>
        <input
          type="checkbox"
          className="checkbox__input"
          checked={this.props.checked}
          onChange={this.props.onChange}
          name={this.props.name}
          id={"checkbox-" + this.props.name}
        />
        <label
          className="checkbox__label"
          htmlFor={"checkbox-" + this.props.name}
        >
          {this.props.label}
        </label>
      </span>
    );
  }
}
