import React, { Component } from "react";
import { connect } from "react-redux";
import dataBase from "../../store/affektData.js";
import CheckboxGroup from "../CheckboxGroup";
import RadioList from "../RadioList";
import Textarea from "../Textarea";
import TextareaInline from "../TextareaInline";

class AffektManager extends Component {
  render() {
    const {
      showNastroyeniyeOptions,
      showTrevogaOptions,
      showAppetitOptions
    } = this.props;

    // подробности колебаний настроения
    const nastroyeniyeKolebaniaPodrobno = () =>
      this.props.isKolebaniaChecked ? (
        <div className="list__second">
          <RadioList name="nastroyeniyeKolebaniaPodrobno" dataBase={dataBase} />
          <br />
        </div>
      ) : null;

    const nastroyeniyeOptions = () =>
      showNastroyeniyeOptions ? (
        <div className="list__options">
          <div className="no-break">
            <div className="list__title">в связи с: </div>
            <CheckboxGroup
              cicle="vSvyazi"
              dataBase={dataBase}
              itemClassName="list__item list__item--no-group"
            />
          </div>
          <div className="break">
            <div className="list__title">с проявлениями: </div>
            <CheckboxGroup cicle="s" dataBase={dataBase} />

            {nastroyeniyeKolebaniaPodrobno()}
          </div>
          <div className="no-break">
            <div className="list__title">дополнительно: </div>
            <CheckboxGroup cicle="nastroyenieSeparate" dataBase={dataBase} />
          </div>
        </div>
      ) : null;

    const trevogaOptions = () =>
      showTrevogaOptions ? (
        <div>
          <br />
          <div className="list__options">
            <CheckboxGroup cicle="trevogaSeparate" dataBase={dataBase} />
          </div>
          <Textarea name="trevogaText" label="Описание тревоги" />
        </div>
      ) : null;

    const appetitOptions = () =>
      showAppetitOptions ? (
        <div className="list__options">
          <TextareaInline name="appetitPohudel" label="Похудел на (кг)" />
          <Textarea name="appetitText" label="Описание аппетита" />
        </div>
      ) : null;

    return (
      <div>
        <div className="manager">
          <div className="manager__col manager__col--1">
            <div className="list__title list__title--no-top-margin">
              Настроение:
            </div>
            <RadioList name="nastroyeniye" dataBase={dataBase} />

            {nastroyeniyeOptions()}

            <div className="no-break">
              <Textarea name="nastroyeniyeText" label="Описание настроения" />
            </div>
            <div className="no-break">
              <div className="list__title">Тревога: </div>
              <RadioList name="trevoga" dataBase={dataBase} />
            </div>
            <div className="no-break">{trevogaOptions()}</div>
          </div>
          <div className="manager__col manager__col--1">
            <div className="no-break">
              <div className="list__title">Сон: </div>
              <CheckboxGroup cicle="son" dataBase={dataBase} />
            </div>

            <div className="list__box">
              <CheckboxGroup cicle="sonSeparate" dataBase={dataBase} />
            </div>

            <div className="no-break">
              <Textarea name="sonText" label="Описание сна" />
            </div>

            <div className="no-break">
              <div className="list__title">Аппетит:</div>
              <RadioList name="appetit" dataBase={dataBase} />
            </div>

            <div className="no-break">{appetitOptions()}</div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const psystatus = state.psystatus;
  const nastroyeniyeNumber = +psystatus.nastroyeniye.number;

  return {
    // подробности настроения не нужны для «ровного» и «не определить»
    showNastroyeniyeOptions: !(
      nastroyeniyeNumber === 0 || nastroyeniyeNumber === 7
    ),
    showTrevogaOptions: +psystatus.trevoga.number !== 0,
    showAppetitOptions: +psystatus.appetit.number !== 0,
    isKolebaniaChecked: psystatus.nastroyeniyeKolebania.isChecked
  };
}

export default connect(mapStateToProps)(AffektManager);
