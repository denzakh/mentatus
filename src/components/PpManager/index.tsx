import React, { Component } from "react";
import dataBase from "../../store/ppData.js";
import { ppLayout } from "../../store/ppLayout.js";
import KritikaManager from "../KritikaManager";
import Section from "../Section";

// форма раздела: поля и раскладка описаны в схеме и layout,
// блок критики — нестандартный (custom)
export default class PpManager extends Component {
  render() {
    return (
      <Section
        section="pp"
        dataBase={dataBase}
        layout={ppLayout}
        components={{ Kritika: KritikaManager }}
      />
    );
  }
}
