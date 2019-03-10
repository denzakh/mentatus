import React, { Component } from "react";
import Checkbox from "../Checkbox";
import CheckboxPol from "../CheckboxPol";
import CheckboxOtkl from "../CheckboxOtkl";
import RadioList from "../RadioList";
import Textarea from "../Textarea";
import TextareaInline from "../TextareaInline";
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
          <div className="list__title">Причины:</div>
          <RadioList
            name="nedobrovolnoPrichiny"
            dataBase={this.props.dataBase}
            onChange={this.props.toggleRadio}
            psystatus={this.props.psystatus}
          />
          {nedobrovolnoText}
          <div className="list__title">Пункт закона:</div>
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
        <div className="list__title">Oбщее:</div>
        <CheckboxPol
          checked={this.props.psystatus["pol"].isChecked}
          onChange={this.props.toggleSymptom}
          name="pol"
          label={
            this.props.psystatus["pol"].isChecked
              ? "пол мужской"
              : "пол женский"
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
      </div>
    );
  }
}
