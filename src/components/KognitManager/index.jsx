import React, { Component } from "react";
import dataBase from "../../store/kognitData.js";
import CheckboxGroup from "../CheckboxGroup";
import RadioListKogn from "../RadioListKogn";
import RadioListInline from "../RadioListInline";
import OrientirovkaManager from "../OrientirovkaManager";
import "./Kognit.css";

export default class KognitManager extends Component {
  render() {
    return (
      <div>
        <div className="manager">
          <div className="manager__orientir">
            {/*компонент ориентировки*/}
            <OrientirovkaManager dataBase={dataBase} />
          </div>
          <div className="manager__col manager__col--1">
            <div className="no-break">
              <div className="list__title">
                Интеллектуально-мнестические функции:
              </div>
              <RadioListKogn name="kognitOsnivnoi" dataBase={dataBase} />
            </div>
          </div>
          <div className="manager__col manager__col--1">
            {/*цикл "отмечается"*/}
            <div className="no-break">
              <div className="list__title">отмечается: </div>
              <CheckboxGroup cicle="otmech" dataBase={dataBase} />
            </div>

            {/*цикл отдельных нарушений*/}
            <div className="no-break">
              <div className="list__title">отдельно: </div>
              <CheckboxGroup
                cicle="otdel"
                dataBase={dataBase}
                itemClassName="list__item list__item--no-group"
              />
            </div>

            {/*поле для пальцев*/}
            <div className="list__box">
              <RadioListInline name="kognitFingerN" dataBase={dataBase} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
