import React, { Component } from "react";
import dataBase from "../../store/rechData.js";
import Checkbox from "../Checkbox";
import CheckboxOtkl from "../CheckboxOtkl";
import RadioList from "../RadioList";
import Textarea from "../Textarea";
import cicleFn from "../../fn/cicleFn";
import "./Rech.css";

export default class RechManager extends Component {
  render() {
    // показ списка мышление
    let myshlenieArr = cicleFn(dataBase, "myshlenie");

    let myshlenieList = () => {
      return (
        <div className="list__box">
          {myshlenieArr.map(item => (
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
      );
    };

    let rechOsobArr = cicleFn(dataBase, "rechOsob");
    let rechOsobList = () => {
      return (
        <div className="list__box">
          {rechOsobArr.map(item => (
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
      );
    };

    let rechOtmechArr = cicleFn(dataBase, "rechOtmech");
    let rechOtmechList = () => {
      return (
        <div className="list__box">
          {rechOtmechArr.map(item => (
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
      );
    };

    let rechGrubArr = cicleFn(dataBase, "rechGrub");
    let rechGrubList = () => {
      return (
        <div className="list__wrap">
          {rechGrubArr.map(item => (
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
      );
    };

    let rechMain = () => {
      return (
        <div className="list__box">
          <div className="list__title">по темпу:</div>
          <RadioList
            name="rechTemp"
            dataBase={dataBase}
            onChange={this.props.toggleRadio}
            psystatus={this.props.psystatus}
          />

          {rechOsobList()}

          <div className="list__title">ответы:</div>
          <RadioList
            name="rechSuschestvo"
            dataBase={dataBase}
            onChange={this.props.toggleRadio}
            psystatus={this.props.psystatus}
          />

          <div className="list__add">
            <Checkbox
              checked={this.props.psystatus["rechOdnosloj"].isChecked}
              onChange={this.props.toggleSymptom}
              name={"rechOdnosloj"}
              label={dataBase["rechOdnosloj"].label}
            />
          </div>

          {rechOtmechList()}
        </div>
      );
    };

    let rechShow = () => {
      if (
        this.props.psystatus["rechOtkl"].isChecked ||
        this.props.psystatus["rechNeotvechaet"].isChecked
      ) {
        return "";
      } else {
        return rechMain();
      }
    };

    return (
      <div>
        <div className="manager">
          <div className="manager__col manager__col--1">
            <div className="list__title list__title--no-top-margin">
              Мышление:
            </div>
            <RadioList
              name="myshleniePosled"
              dataBase={dataBase}
              onChange={this.props.toggleRadio}
              psystatus={this.props.psystatus}
            />
            <div className="list__title">по темпу:</div>
            <RadioList
              name="myshlenieTemp"
              dataBase={dataBase}
              onChange={this.props.toggleRadio}
              psystatus={this.props.psystatus}
            />

            <div className="no-break">{myshlenieList()}</div>

            <div className="no-break">
              <Textarea
                onChange={this.props.toggleText}
                name="myshlenieText"
                label="Описание мышления"
                value={this.props.psystatus.myshlenieText}
              />
            </div>
          </div>
          <div className="manager__col manager__col--1">
            <div className="no-break">
              <div className="list__title">
                <span className="list__title-lable">Речь:</span>
                <CheckboxOtkl
                  name="rechOtkl"
                  onChange={this.props.toggleSymptom}
                  psystatus={this.props.psystatus}
                  dataBase={dataBase}
                />
                <CheckboxOtkl
                  name="rechNeotvechaet"
                  onChange={this.props.toggleSymptom}
                  psystatus={this.props.psystatus}
                  dataBase={dataBase}
                />
              </div>

              {rechShow()}
            </div>

            <div className="list__title">грубые нарушения:</div>

            {rechGrubList()}

            <Textarea
              onChange={this.props.toggleText}
              name="rechText"
              label="Описание речи"
              value={this.props.psystatus.appetitText}
            />
          </div>
        </div>
      </div>
    );
  }
}
