import React, { Component } from "react";
import type { ReactNode } from "react";

interface Props {
  children?: ReactNode;
}

export default class Header extends Component<Props> {
  render() {
    return <header className="header">{this.props.children}</header>;
  }
}
