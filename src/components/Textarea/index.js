import React, { Component } from "react";
import "./Textarea.css";

export default class Textarea extends Component {
  render() {
    return (
      <div className="textarea">
        <div className="textarea__label">{this.props.label}</div>
        <textarea
          className="textarea__input"
          onChange={this.props.onChange}
          name={this.props.name}
          style={this.props.style}
        />
      </div>
    );
  }
}
