import React, { Component } from "react";
import Checkbox from "../Checkbox";
import RadioList from "../RadioList";
import Textarea from "../Textarea";
import "./Orientirovka.css";

export default class OrientirovkaManager extends Component {
  render() {
    let dataBase = this.props.dataBase;
    // let orientirVremiaNumber = +this.props.psystatus.orientirVremia.number;
    // let orientirMestoNumber = +this.props.psystatus.orientirMesto.number;
    // let orientirLichnostNumber = +this.props.psystatus.orientirLichnost.number;

    return (
      <div>
        <div className="orientir">
          <div className="orientir__title">Ориентировка</div>
          <div className="orientir__table">
            <div className="orientir__col">
              <div className="orientir__top">В месте</div>
              <div className="orientir__content">
                <RadioList
                  name="orientirVremia"
                  dataBase={dataBase}
                  onChange={this.props.toggleRadio}
                  psystatus={this.props.psystatus}
                />
              </div>
            </div>
            <div className="orientir__col">
              <div className="orientir__top">Времени</div>
              <div className="orientir__content">
                <RadioList
                  name="orientirMesto"
                  dataBase={dataBase}
                  onChange={this.props.toggleRadio}
                  psystatus={this.props.psystatus}
                />
              </div>
            </div>
            <div className="orientir__col">
              <div className="orientir__top">Личности</div>
              <div className="orientir__content">
                <RadioList
                  name="orientirLichnost"
                  dataBase={dataBase}
                  onChange={this.props.toggleRadio}
                  psystatus={this.props.psystatus}
                />
              </div>
            </div>
          </div>
          <div className="orientir__bottom">
            <Checkbox
              name="orientirNot"
              checked={this.props.psystatus.orientirNot.isChecked}
              onChange={this.props.toggleSymptom}
              label="ориентировку не определить"
            />
          </div>
        </div>

        <Textarea
          onChange={this.props.toggleText}
          name="orientirText"
          label="Описание ориентировки"
          value={this.props.psystatus.orientirText.text}
        />
      </div>
    );
  }
}
