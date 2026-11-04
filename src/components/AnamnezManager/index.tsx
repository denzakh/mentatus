import React, { Component } from "react";
import dataBase from "../../store/anamnezData";
import { anamnezLayout } from "../../store/anamnezLayout";
import Section from "../Section";

// форма раздела: поля и их раскладка описаны в схеме и layout
export default class AnamnezManager extends Component {
  render() {
    return (
      <Section section="anamnez" dataBase={dataBase} layout={anamnezLayout} />
    );
  }
}
