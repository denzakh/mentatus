import React, { Component } from "react";
import dataBase from "../../store/affektData.js";
import Checkbox from "../Checkbox";
import RadioList from "../RadioList";
import Textarea from "../Textarea";
import TextareaInline from "../TextareaInline";
import cicleFn from "../../fn/cicleFn";

export default class AffektManager extends Component {
  constructor(props) {
    super(props);
    this.state = { sonOption: false };
  }

  render() {
    let nastroyeniyeNumber = +this.props.psystatus.nastroyeniye.number;
    let vSvyaziNameArr = cicleFn(dataBase, "vSvyazi");
    let sNameArr = cicleFn(dataBase, "s");
    let nastroyenieSeparateNameArr = cicleFn(dataBase, "nastroyenieSeparate");

    let trevogaNumber = +this.props.psystatus.trevoga.number;
    let trevogaSeparateNameArr = cicleFn(dataBase, "trevogaSeparate");

    let sonArr = cicleFn(dataBase, "son");
    let sonSeparateArr = cicleFn(dataBase, "sonSeparate");

    let appetitNumber = +this.props.psystatus.appetit.number;

    //
    let nastroyeniyeKolebaniaPodrobno = () => {
      if (this.props.psystatus.nastroyeniyeKolebania.isChecked) {
        return (
          <div className="list__second">
            <RadioList
              name="nastroyeniyeKolebaniaPodrobno"
              dataBase={dataBase}
              onChange={this.props.toggleRadio}
              psystatus={this.props.psystatus}
            />
            <br />
          </div>
        );
      }
    };

    let nastroyeniyeOptions = () => {
      if (!(nastroyeniyeNumber === 0 || nastroyeniyeNumber === 7)) {
        return (
          <div className="list__options">
            <div className="no-break">
              <div className="list__title">в связи с: </div>
              {vSvyaziNameArr.map(item => (
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
            <div className="break">
              <div className="list__title">с проявлениями: </div>
              {sNameArr.map(item => (
                <div key={item} className="list__item">
                  <Checkbox
                    checked={this.props.psystatus[item].isChecked}
                    onChange={this.props.toggleSymptom}
                    name={item}
                    label={dataBase[item].label}
                  />
                </div>
              ))}

              {nastroyeniyeKolebaniaPodrobno()}
            </div>
            <div className="no-break">
              <div className="list__title">дополнительно: </div>
              {nastroyenieSeparateNameArr.map(item => (
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
          </div>
        );
      }
    };

    let trevogaOptions = () => {
      if (!(trevogaNumber === 0)) {
        return (
          <div>
            <br />
            <div className="list__options">
              {trevogaSeparateNameArr.map(item => (
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
            <Textarea
              onChange={this.props.toggleText}
              name="trevogaText"
              label="Описание тревоги"
              value={this.props.psystatus.trevogaText}
            />
          </div>
        );
      }
    };

    let appetitOptions = () => {
      if (!(appetitNumber === 0)) {
        return (
          <div className="list__options">
            <TextareaInline
              onChange={this.props.toggleText}
              name="appetitPohudel"
              label="Похудел на (кг)"
              value={this.props.psystatus.pohudelText}
            />
            <Textarea
              onChange={this.props.toggleText}
              name="appetitText"
              label="Описание аппетита"
              value={this.props.psystatus.appetitText}
            />
          </div>
        );
      }
    };

    return (
      <div>
        <div className="manager">
          <div className="manager__col manager__col--1">
            <div className="list__title list__title--no-top-margin">
              Настроение:
            </div>
            <RadioList
              name="nastroyeniye"
              dataBase={dataBase}
              onChange={this.props.toggleRadio}
              psystatus={this.props.psystatus}
            />

            {nastroyeniyeOptions()}

            <div className="no-break">
              <Textarea
                onChange={this.props.toggleText}
                name="nastroyeniyeText"
                label="Описание настроения"
                value={this.props.psystatus.nastroyeniyeText}
              />
            </div>
            <div className="no-break">
              <div className="list__title">Тревога: </div>
              <RadioList
                name="trevoga"
                dataBase={dataBase}
                onChange={this.props.toggleRadio}
                psystatus={this.props.psystatus}
              />
            </div>
            <div className="no-break">{trevogaOptions()}</div>
          </div>
          <div className="manager__col manager__col--1">
            <div className="no-break">
              <div className="list__title">Сон: </div>
              {sonArr.map(item => (
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

            <div className="list__box">
              {sonSeparateArr.map(item => (
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

            <div className="no-break">
              <Textarea
                onChange={this.props.toggleText}
                name="sonText"
                label="Описание сна"
                value={this.props.psystatus.sonText}
              />
            </div>

            <div className="no-break">
              <div className="list__title">Аппетит:</div>
              <RadioList
                name="appetit"
                dataBase={dataBase}
                onChange={this.props.toggleRadio}
                psystatus={this.props.psystatus}
              />
            </div>

            <div className="no-break">{appetitOptions()}</div>
          </div>
        </div>
      </div>
    );
  }
}
