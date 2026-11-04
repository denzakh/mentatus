import React, { Component } from "react";
import Checkbox from "../Checkbox";
import RadioList from "../RadioList";
import Textarea from "../Textarea";
import "./Orientirovka.css";

export default class OrientirovkaManager extends Component {
  render() {
    const dataBase = this.props.dataBase;

    return (
      <div>
        <div className="orientir">
          <div className="orientir__title">Ориентировка</div>
          <div className="orientir__table">
            <div className="orientir__col">
              <div className="orientir__top">Во времени</div>
              <div className="orientir__content">
                <RadioList name="orientirVremia" dataBase={dataBase} />
              </div>
            </div>
            <div className="orientir__col">
              <div className="orientir__top">Месте</div>
              <div className="orientir__content">
                <RadioList name="orientirMesto" dataBase={dataBase} />
              </div>
            </div>
            <div className="orientir__col">
              <div className="orientir__top">Личности</div>
              <div className="orientir__content">
                <RadioList name="orientirLichnost" dataBase={dataBase} />
              </div>
            </div>
          </div>
          <div className="orientir__bottom">
            <Checkbox
              name="orientirNot"
              label="ориентировку не определить"
              dataBase={dataBase}
            />
          </div>
        </div>

        <Textarea name="orientirText" label="Описание ориентировки" />
      </div>
    );
  }
}
