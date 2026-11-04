import React, { Component } from "react";
import dataBase from "../../store/sostoyanieData";
import { sostoyanieLayout } from "../../store/sostoyanieLayout";
import Section from "../Section";
import NachaloManager from "../NachaloManager";

// форма раздела: поля и раскладка описаны в схеме и layout,
// блок «начало осмотра» — нестандартный (custom)
export default class SostoyanieManager extends Component {
  render() {
    return (
      <Section
        section="sostoyanie"
        dataBase={dataBase}
        layout={sostoyanieLayout}
        components={{ Nachalo: NachaloManager }}
      />
    );
  }
}
