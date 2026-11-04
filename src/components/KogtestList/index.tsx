import React, { Component } from "react";
import type { ListOwnProps } from "../../types/components";

// раздел «Когнитивные тесты» пока не реализован
export default class KogtestList extends Component<ListOwnProps> {
  render() {
    return <span data-id="kogtest" onClick={this.props.toggleTab} />;
  }
}
