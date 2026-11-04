import React, { Component } from "react";
import { connect } from "react-redux";
import dataBase from "../../store/rechData.js";
import Checkbox from "../Checkbox";
import CheckboxGroup from "../CheckboxGroup";
import CheckboxOtkl from "../CheckboxOtkl";
import RadioList from "../RadioList";
import Textarea from "../Textarea";

class RechManager extends Component {
  render() {
    const { showOtvety, showRechMain } = this.props;

    const otvety = () =>
      showOtvety ? (
        <div>
          <RadioList name="rechSuschestvo" dataBase={dataBase} />
          <div className="list__add">
            <Checkbox name="rechOdnosloj" dataBase={dataBase} />
          </div>
        </div>
      ) : null;

    const rechMain = () => (
      <div className="list__box">
        <div className="list__box">
          <CheckboxGroup cicle="rechOsob" dataBase={dataBase} />
        </div>

        <div className="list__title">
          ответы:
          <CheckboxOtkl name="rechNeotvechaet" dataBase={dataBase} />
        </div>
        {otvety()}

        <div className="list__box">
          <CheckboxGroup cicle="rechOtmech" dataBase={dataBase} />
        </div>
      </div>
    );

    return (
      <div>
        <div className="manager">
          <div className="manager__col manager__col--1">
            <div className="list__title list__title--no-top-margin">
              Мышление:
            </div>
            <RadioList name="myshleniePosled" dataBase={dataBase} />
            <div className="list__title">по темпу:</div>
            <RadioList name="myshlenieTemp" dataBase={dataBase} />

            <div className="no-break">
              <div className="list__box">
                <CheckboxGroup cicle="myshlenie" dataBase={dataBase} />
              </div>
            </div>

            <div className="no-break">
              <Textarea name="myshlenieText" label="Описание мышления" />
            </div>
          </div>
          <div className="manager__col manager__col--1">
            <div className="no-break">
              <div className="list__title">
                <span className="list__title-lable">Речь:</span>
                <CheckboxOtkl name="rechOtkl" dataBase={dataBase} />
              </div>

              {showRechMain ? rechMain() : null}
            </div>

            <div className="list__title">грубые нарушения:</div>

            <div className="list__wrap">
              <CheckboxGroup cicle="rechGrub" dataBase={dataBase} />
            </div>

            <Textarea name="rechText" label="Описание речи" />
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const psystatus = state.psystatus;

  return {
    showOtvety: !psystatus.rechNeotvechaet.isChecked,
    // при грубых нарушениях речи основная часть не выводится
    showRechMain: !psystatus.rechOtkl.isChecked
  };
}

export default connect(mapStateToProps)(RechManager);
