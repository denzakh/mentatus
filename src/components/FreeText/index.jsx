import React, { Component } from "react";

export default class FreeText extends Component {
  render() {
    const { text } = this.props;
    // принимает либо строку, либо объект вида { text: "..." }
    const value = typeof text === "string" ? text : (text && text.text) || "";

    return <span> {value}</span>;
  }
}
