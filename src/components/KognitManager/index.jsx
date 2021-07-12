import React, { Component } from "react";
import dataBase from "../../store/kognitData.js";
import Checkbox from "../Checkbox";
import RadioList from "../RadioList";
import RadioListKogn from "../RadioListKogn";
import RadioListInline from "../RadioListInline";
import OrientirovkaManager from "../OrientirovkaManager";
import cicleFn from "../../fn/cicleFn";
import "./Kognit.css";

export default class affektManager extends Component {
  render() {
    let otmechNameArr = cicleFn(dataBase, "otmech");
    let otdelNameArr = cicleFn(dataBase, "otdel");

    return (
      <div>
        <div className="manager">
          <div className="manager__orientir">
            {/*компонент ориентировки*/}
            <OrientirovkaManager
              dataBase={dataBase}
              toggleRadio={this.props.toggleRadio}
              toggleSymptom={this.props.toggleSymptom}
              toggleText={this.props.toggleText}
              psystatus={this.props.psystatus}
            />
          </div>
          <div className="manager__col manager__col--1">
            <div className="no-break">
              <div className="list__title">
                Интеллектуально-мнестические функции:
              </div>
              <RadioListKogn
                name="kognitOsnivnoi"
                dataBase={dataBase}
                toggleRadio={this.props.toggleRadio}
                toggleSymptom={this.props.toggleSymptom}
                psystatus={this.props.psystatus}
              />
            </div>
          </div>
          <div className="manager__col manager__col--1">
            {/*цикл "отмечается"*/}
            <div className="no-break">
              <div className="list__title">отмечается: </div>
              {otmechNameArr.map(item => (
                <div key={item} className="list__item">
                  <Checkbox
                    checked={this.props.psystatus[item].isChecked}
                    onChange={this.props.toggleSymptom}
                    name={item}
                    label={dataBase[item].label}
                  />
                </div>
              ))}
            </div>

            {/*цикл отдельных нарушений*/}
            <div className="no-break">
              <div className="list__title">отдельно: </div>
              {otdelNameArr.map(item => (
                <div key={item} className="list__item list__item--no-group">
                  <Checkbox
                    checked={this.props.psystatus[item].isChecked}
                    onChange={this.props.toggleSymptom}
                    name={item}
                    label={dataBase[item].label}
                  />
                </div>
              ))}
            </div>

            {/*поле для пальцев*/}
            <div className="list__box">
              <RadioListInline
                name="kognitFingerN"
                dataBase={dataBase}
                onChange={this.props.toggleRadio}
                psystatus={this.props.psystatus}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
