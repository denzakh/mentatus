import React, { Component } from "react";
import zhalobyData from "../../store/zhalobyData.js";
import CheckboxGroup from "../CheckboxGroup";
import Textarea from "../Textarea";

export default class ZhalobyManager extends Component {
  render() {
    return (
      <div>
        <div className="manager">
          <div className="list__title list__title--no-top-margin">
            Жалобы на:
          </div>
          <CheckboxGroup cicle="zhalobyCicle" dataBase={zhalobyData} />
        </div>
        <Textarea name="zhalobyText" label="Описание жалоб" />
      </div>
    );
  }
}
