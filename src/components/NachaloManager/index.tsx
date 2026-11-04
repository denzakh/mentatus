import React, { Component } from "react";
import { connect } from "react-redux";
import { fieldOf } from "../../lib/redux";
import Checkbox from "../Checkbox";
import CheckboxOtkl from "../CheckboxOtkl";
import CheckboxPol from "../CheckboxPol";
import RadioList from "../RadioList";
import Textarea from "../Textarea";
import TextareaInline from "../TextareaInline";
import InputDate from "../InputDate";
import type { Schema } from "../../types/schema";
import type { StatusState } from "../../types/status";

interface OwnProps {
  dataBase?: Schema;
}

interface StateProps {
  isMestoText: boolean;
  isNedobrovolno: boolean;
}

type Props = OwnProps & StateProps;

class NachaloManager extends Component<Props> {
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

function mapStateToProps(state: StatusState): StateProps {
  const mestoOsmotra = fieldOf(state, "mestoOsmotra");
  const nedobrovolno = fieldOf(state, "nedobrovolno");

  return {
    // своё место осмотра спрашиваем только для варианта «другое»
    isMestoText: +((mestoOsmotra && mestoOsmotra.number) || 0) === 3,
    isNedobrovolno: !!(nedobrovolno && nedobrovolno.isChecked)
  };
}

export default connect<StateProps, unknown, OwnProps>(mapStateToProps)(
  NachaloManager
);
