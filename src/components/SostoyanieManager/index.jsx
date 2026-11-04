import React, { Component } from "react";
import { connect } from "react-redux";
import dataBase from "../../store/sostoyanieData.js";
import dataBaseRech from "../../store/rechData.js";
import { fieldOf } from "../../lib/redux";
import Checkbox from "../Checkbox";
import CheckboxGroup from "../CheckboxGroup";
import CheckboxOtkl from "../CheckboxOtkl";
import RadioList from "../RadioList";
import NachaloManager from "../NachaloManager";
import Textarea from "../Textarea";

class SostoyanieManager extends Component {
  render() {
    return (
      <div>
        <div className="manager">
          <div className="manager__col manager__col--1">
            <NachaloManager dataBase={dataBase} />
            <div className="no-break">
              <div className="list__title">Состояние сознания:</div>
              <RadioList name="soznanie" dataBase={dataBase} />
            </div>
          </div>
          <div className="manager__col manager__col--2">
            <div className="no-break">
              <div className="list__wrap">
                <div className="list__title">
                  <span className="list__title-lable">Речь:</span>
                  <CheckboxOtkl name="rechOtkl" dataBase={dataBaseRech} />
                  <CheckboxOtkl
                    name="rechNeotvechaet"
                    dataBase={dataBaseRech}
                  />
                </div>
                <CheckboxGroup cicle="rechGrub" dataBase={dataBaseRech} />
              </div>
            </div>
            <div className="no-break">
              <div className="list__title">Контакт:</div>
              <RadioList name="kontakt" dataBase={dataBase} />
              <div className="list__add">
                <Checkbox name="kontaktZatrudnen" dataBase={dataBase} />
              </div>
            </div>

            <div className="no-break">
              {this.props.isZatrud ? (
                <div>
                  <div className="list__title">затруднен из-за: </div>
                  <CheckboxGroup cicle="zatrud" dataBase={dataBase} />
                </div>
              ) : null}
            </div>

            <div className="no-break">
              <div>
                <div className="list__title">Впечатление: </div>
                <CheckboxGroup cicle="vpech" dataBase={dataBase} />
              </div>
            </div>

            <div className="list__title">Дополнение: </div>
            <Textarea name="sostoyanieText" label="" />
          </div>
        </div>
      </div>
    );
  }
}

// причины затрудненного контакта спрашиваем только при самом затруднении
function mapStateToProps(state) {
  const field = fieldOf(state, "kontaktZatrudnen");

  return {
    isZatrud: !!(field && field.isChecked)
  };
}

export default connect(mapStateToProps)(SostoyanieManager);
