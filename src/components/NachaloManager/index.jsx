import React, { Component } from "react";
import { connect } from "react-redux";
import Checkbox from "../Checkbox";
import CheckboxOtkl from "../CheckboxOtkl";
import CheckboxPol from "../CheckboxPol";
import RadioList from "../RadioList";
import Textarea from "../Textarea";
import TextareaInline from "../TextareaInline";
import InputDate from "../InputDate";

class NachaloManager extends Component {
  render() {
    const { isMestoText, isNedobrovolno } = this.props;

    const nedobrovolno = () =>
      isNedobrovolno ? (
        <div>
          <div className="list__title">причины:</div>
          <RadioList
            name="nedobrovolnoPrichiny"
            dataBase={this.props.dataBase}
          />
          <Textarea name="nedobrovolnoText" label="" />
          <div className="list__title">пункт закона:</div>
          <RadioList name="nedobrovolnoPunkt" dataBase={this.props.dataBase} />
        </div>
      ) : null;

    return (
      <div>
        <div className="no-break">
          <div className="list__title list__title--no-top-margin">Oбщее:</div>

          <InputDate name="dataOsmotra" label="Дата осмотра" />

          <CheckboxPol />

          <TextareaInline name="vozrast" label="Возраст" />

          <div className="list__title">Oсмотр:</div>
          <RadioList name="mestoOsmotra" dataBase={this.props.dataBase} />
          {isMestoText ? <Textarea name="mestoText" label="" /> : null}
          <div className="list__add">
            <Checkbox name="poNapravleniu" dataBase={this.props.dataBase} />
          </div>
          <div className="list__add">
            <Checkbox
              name="sIstorieiOznakomlen"
              dataBase={this.props.dataBase}
            />
          </div>
        </div>

        <div className="no-break">
          <div className="list__title">
            {" "}
            {isNedobrovolno ? "Недобровольный осмотр:" : "Согласие получено"}
          </div>
          <div className="list__item">
            <CheckboxOtkl name="nedobrovolno" dataBase={this.props.dataBase} />
          </div>
          {nedobrovolno()}
          <br />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const psystatus = state.psystatus;

  return {
    // своё место осмотра спрашиваем только для варианта «другое»
    isMestoText: +psystatus.mestoOsmotra.number === 3,
    isNedobrovolno: psystatus.nedobrovolno.isChecked
  };
}

export default connect(mapStateToProps)(NachaloManager);
