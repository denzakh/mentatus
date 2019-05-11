import React, { Component } from "react";
import Checkbox from "../Checkbox";
import CheckboxPol from "../CheckboxPol";
import CheckboxOtkl from "../CheckboxOtkl";
import RadioList from "../RadioList";
import Textarea from "../Textarea";
import TextareaInline from "../TextareaInline";
import InputDate from "../InputDate";
import cicleFn from "../../fn/cicleFn";

export default class NachaloManager extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let mestoText = "";
    if (this.props.psystatus["mestoOsmotra"].number === 3) {
      mestoText = (
        <Textarea
          onChange={this.props.toggleText}
          name="mestoText"
          label=""
          value={this.props.psystatus.mestoText.text}
        />
      );
    }

    let nedobrovolnoText = (
      <Textarea
        onChange={this.props.toggleText}
        name="nedobrovolnoText"
        label=""
        value=""
      />
    );

    let nedobrovolno = "";
    if (this.props.psystatus["nedobrovolno"].isChecked) {
      nedobrovolno = (
        <div>
          <div className="list__title">причины:</div>
          <RadioList
            name="nedobrovolnoPrichiny"
            dataBase={this.props.dataBase}
            onChange={this.props.toggleRadio}
            psystatus={this.props.psystatus}
          />
          {nedobrovolnoText}
          <div className="list__title">пункт закона:</div>
          <RadioList
            name="nedobrovolnoPunkt"
            dataBase={this.props.dataBase}
            onChange={this.props.toggleRadio}
            psystatus={this.props.psystatus}
          />
        </div>
      );
    }

    return (
      <div>
        <div className="no-break">
          <div className="list__title list__title--no-top-margin">Oбщее:</div>

          <InputDate
            onChange={this.props.toggleText}
            name="dataOsmotra"
            label="Дата осмотра"
            value={this.props.psystatus.dataOsmotra.text}
          />

          <CheckboxPol
            checked={this.props.psystatus["pol"].isChecked}
            onChange={this.props.toggleSymptom}
            name="pol"
            label={
              this.props.psystatus["pol"].isChecked
                ? "Пол: мужской  ⇄"
                : "Пол: женский  ⇄"
            }
          />

          <TextareaInline
            onChange={this.props.toggleText}
            name="vozrast"
            label="Возраст"
            value={this.props.psystatus.vozrast.text}
          />

          <div className="list__title">Oсмотр:</div>
          <RadioList
            name="mestoOsmotra"
            dataBase={this.props.dataBase}
            onChange={this.props.toggleRadio}
            psystatus={this.props.psystatus}
          />
          {mestoText}
          <div className="list__add">
            <Checkbox
              checked={this.props.psystatus["poNapravleniu"].isChecked}
              onChange={this.props.toggleSymptom}
              name="poNapravleniu"
              label="по направлению"
            />
          </div>
        </div>

        <div className="no-break">
          <div className="list__title">
            {" "}
            {this.props.psystatus["nedobrovolno"].isChecked
              ? "Недобровольный осмотр:"
              : "Согласие получено"}
          </div>
          <div className="list__item">
            <CheckboxOtkl
              onChange={this.props.toggleSymptom}
              name="nedobrovolno"
              label="недобровольно"
              psystatus={this.props.psystatus}
              dataBase={this.props.dataBase}
            />
          </div>
          {nedobrovolno}
          <br />
        </div>
      </div>
    );
  }
}
