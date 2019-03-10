import React, { Component } from "react";
import "./Checkbox.css";

export default class CheckboxPol extends Component {
  render() {
    return (
      <span>
        <input
          type="checkbox"
          className="checkbox__input"
          checked={this.props.checked}
          onChange={this.props.onChange}
          name={this.props.name}
          id={this.props.name}
        />
        <label className="checkbox__pol" htmlFor={this.props.name}>
          {this.props.label}
        </label>
      </span>
    );
  }
}
