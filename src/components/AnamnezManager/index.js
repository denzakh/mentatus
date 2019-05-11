import React, { Component } from "react";
import dataBase from "../../store/anamnezData.js";
import Checkbox from "../Checkbox";
import CheckboxOtkl from "../CheckboxOtkl";
import Textarea from "../Textarea";

export default class anamnezManager extends Component {
  render() {
    let anamnezNameArr = Object.keys(dataBase).filter(
      item => dataBase[item].cicle === "anamnezCicle"
    );

    return (
      <div>
        <div className="manager">
          <div className="list__title list__title--no-top-margin">
            <span className="list__title-lable ">В анамнезе:</span>
            <CheckboxOtkl
              name="anamnezOtkl"
              onChange={this.props.toggleSymptom}
              psystatus={this.props.psystatus}
              dataBase={dataBase}
            />
          </div>
          {anamnezNameArr.map(item => (
            <div key={item} className="list_item">
              <Checkbox
                checked={this.props.psystatus[item].isChecked}
                onChange={this.props.toggleSymptom}
                name={item}
                label={dataBase[item].label}
              />
            </div>
          ))}
        </div>
        <Textarea
          onChange={this.props.toggleText}
          name="anamnezText"
          label="Описание анамнеза"
          value={this.props.psystatus.anamnezText.text}
        />
      </div>
    );
  }
}
