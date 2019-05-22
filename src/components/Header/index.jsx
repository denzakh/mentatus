import React, { Component } from "react";
import "./Header.css";
import classNames from "classnames";

export default class Header extends Component {
  render() {
    return (
      <header className="header">
        <h1>Header</h1>
        {this.props.children}
      </header>
    );
  }
}
