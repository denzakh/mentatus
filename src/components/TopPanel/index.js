import React, { Component } from "react";
import "./TopPanel.css";

export default class TopPanel extends Component {
  render() {
    return (
      <div className="top-panel">
        <label>
          <span className="top-panel__id">{this.props.label}</span>
          <input
            type="text"
            className="top-panel__input"
            onChange={this.props.onChange}
            name="conclusionId"
            defaultValue=""
          />
        </label>
      </div>
    );
  }
}
