import React, { Component } from "react";
import dataBase from "../../store/zhalobyData";
import { zhalobyLayout } from "../../store/zhalobyLayout";
import Section from "../Section";

// форма раздела: поля и их раскладка описаны в схеме и layout
export default class ZhalobyManager extends Component {
  render() {
    return (
      <Section section="zhaloby" dataBase={dataBase} layout={zhalobyLayout} />
    );
  }
}
