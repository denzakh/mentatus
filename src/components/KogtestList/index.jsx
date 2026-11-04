import React, { Component } from "react";

// раздел «Когнитивные тесты» пока не реализован
export default class KogtestList extends Component {
  render() {
    return <span data-id="kogtest" onClick={this.props.toggleTab} />;
  }
}
