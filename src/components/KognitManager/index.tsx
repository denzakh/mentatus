import React, { Component } from "react";
import dataBase from "../../store/kognitData";
import { kognitLayout } from "../../store/kognitLayout";
import OrientirovkaManager from "../OrientirovkaManager";
import Section from "../Section";
import "./Kognit.css";

// форма раздела: поля и раскладка описаны в схеме и layout,
// блок ориентировки — нестандартный (custom)
export default class KognitManager extends Component {
  render() {
    return (
      <Section
        section="kognit"
        dataBase={dataBase}
        layout={kognitLayout}
        components={{ Orientirovka: OrientirovkaManager }}
      />
    );
  }
}
