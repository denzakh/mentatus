import React, { Component } from "react";
import { connect } from "react-redux";
import dataBase from "../../store/ppData.js";
import { fieldOf } from "../../lib/redux";
import CheckboxGroup from "../CheckboxGroup";
import CheckboxOtkl from "../CheckboxOtkl";
import RadioList from "../RadioList";
import Textarea from "../Textarea";
import "./Pp.css";
import KritikaManager from "../KritikaManager";

class PpManager extends Component {
  render() {
    const { isBredHidden, isGallHidden } = this.props;

    return (
      <div>
        <div className="manager">
          <div className="manager__col manager__col--1">
            <KritikaManager />

            <div className="list__title">
              <span className="list__title-lable">Опасные тенденции:</span>
              <CheckboxOtkl name="opasnyeOtkl" dataBase={dataBase} />
            </div>
            <RadioList name="opasnye" dataBase={dataBase} />

            <div className="no-break">
              <div className="list__title">Агрессия:</div>
              <RadioList name="opasnyeAgressia" dataBase={dataBase} />
            </div>

            <div className="no-break">
              <Textarea name="opasnyeText" label="Описание опасных тенденций" />
            </div>
          </div>
          <div className="manager__col manager__col--1">
            <div className="no-break">
              {/*цикл "bred"*/}
              <div className="list__title">
                <span className="list__title-lable">Бред:</span>
                <CheckboxOtkl name="bredOtkl" dataBase={dataBase} />
              </div>
              {isBredHidden ? null : (
                <CheckboxGroup
                  cicle="bred"
                  dataBase={dataBase}
                  autoKritika={3}
                />
              )}
            </div>

            <div className="no-break">
              <Textarea name="bredText" label="Описание бреда" />
            </div>

            <div className="no-break">
              {/*цикл "gall"*/}
              <div className="list__title">
                <span className="list__title-lable">Галлюцинации:</span>
                <CheckboxOtkl name="gallOtkl" dataBase={dataBase} />
              </div>
              {isGallHidden ? null : (
                <CheckboxGroup
                  cicle="gall"
                  dataBase={dataBase}
                  autoKritika={3}
                />
              )}
            </div>

            <div className="no-break">
              <Textarea name="gallText" label="Описание галлюцинаций" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// списки бреда и галлюцинаций скрываются, если врач отметил их отсутствие
function mapStateToProps(state) {
  const bredOtkl = fieldOf(state, "bredOtkl");
  const gallOtkl = fieldOf(state, "gallOtkl");

  return {
    isBredHidden: !!(bredOtkl && bredOtkl.isChecked),
    isGallHidden: !!(gallOtkl && gallOtkl.isChecked)
  };
}

export default connect(mapStateToProps)(PpManager);
