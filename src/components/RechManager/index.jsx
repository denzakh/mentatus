import React, { Component } from "react";
import dataBase from "../../store/rechData.js";
import { rechLayout } from "../../store/rechLayout.js";
import Section from "../Section";

// форма раздела: поля и раскладка описаны в схеме и layout
export default class RechManager extends Component {
  render() {
    return <Section section="rech" dataBase={dataBase} layout={rechLayout} />;
  }
}
