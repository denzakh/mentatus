import React, { Component } from "react";
import dataBase from "../../store/anamnezData.js";
import CheckboxGroup from "../CheckboxGroup";
import CheckboxOtkl from "../CheckboxOtkl";
import Textarea from "../Textarea";

export default class AnamnezManager extends Component {
  render() {
    return (
      <div>
        <div className="manager">
          <div className="list__title list__title--no-top-margin">
            <span className="list__title-lable ">В анамнезе:</span>
            <CheckboxOtkl name="anamnezOtkl" dataBase={dataBase} />
          </div>
          <CheckboxGroup cicle="anamnezCicle" dataBase={dataBase} />
        </div>
        <Textarea
          name="anamnezText"
          label="Описание анамнеза"
          style={{ minHeight: "250px" }}
        />
      </div>
    );
  }
}
