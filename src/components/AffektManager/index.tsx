import React, { Component } from "react";
import dataBase from "../../store/affektData";
import { affektLayout } from "../../store/affektLayout";
import Section from "../Section";

// форма раздела: поля и раскладка описаны в схеме и layout
export default class AffektManager extends Component {
  render() {
    return (
      <Section section="affekt" dataBase={dataBase} layout={affektLayout} />
    );
  }
}
