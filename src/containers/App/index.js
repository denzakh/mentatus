import React, { Component } from "react";
import "./App.css";
import "./Print.css";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import classNames from "classnames";
import { setSymptom } from "../../actions/symptomAction.js";
import { setText } from "../../actions/textAction.js";
import { setRadio } from "../../actions/radioAction.js";

import ZhalobyManager from "../../components/ZhalobyManager";
import AnamnezManager from "../../components/AnamnezManager";
import SostoyanieManager from "../../components/SostoyanieManager";
import AffektManager from "../../components/AffektManager";
import RechManager from "../../components/RechManager";
import KognitManager from "../../components/KognitManager";
import KogtestManager from "../../components/KogtestManager";
import PpManager from "../../components/PpManager";
import DiagnozManager from "../../components/DiagnozManager";
import Conclusion from "../../components/Conclusion";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { activeTab: "sostoyanie" };
  }

  toggleSymptom = e => {
    const name = e.target.name;
    this.props.setSymptom(name);
  };

  toggleText = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.props.setText(name, value);
  };

  toggleRadio = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.props.setRadio(name, +value);
  };

  toggleTab = e => {
    const name = e.currentTarget.getAttribute("data-id");
    // console.log(name);
    this.setState({ activeTab: name });
  };

  render() {
    const psystatus = this.props.psystatus;

    let tabsMenu = [
      { name: "sostoyanie", symbol: "ОC", label: "Общее состояние" },
      { name: "anamnez", symbol: "АH", label: "Анамнез" },
      { name: "zhaloby", symbol: "ЖЛ", label: "Жалобы" },
      { name: "affekt", symbol: "АФ", label: "Аффективная сфера" },
      { name: "rech", symbol: "РМ", label: "Речь и мышление" },
      { name: "kognit", symbol: "ИП", label: "Интеллект и память" },
      //{ name: "kogtest", symbol: "КТ", label: "Когнитивные тесты" },
      { name: "pp", symbol: "ПП", label: "Психопродукция" },
      { name: "diagnoz", symbol: "ДЗ", label: "Диагноз" }
      // { name: "rekomendacii", symbol: "РК", label: "Рекомендации" },
      // { name: "lechenie", symbol: "ЛЧ", label: "Лечение" }
    ];

    let tabMenuRender = tabsMenu.map(item => {
      let tabClass = classNames({
        "app__tab-menu-item": true,
        "is-active": item.name === this.state.activeTab
      });

      return (
        <div
          onClick={this.toggleTab}
          title={item.label}
          key={item.name}
          data-id={item.name}
          className={tabClass}
        >
          <div className="app__tab-symbol">{item.symbol}</div>
          <div className="app__tab-label">{item.label}</div>
        </div>
      );
    });

    let tabs = [
      <div key="zhaloby" name="zhaloby">
        <ZhalobyManager
          toggleSymptom={this.toggleSymptom}
          toggleText={this.toggleText}
          toggleRadio={this.toggleRadio}
          psystatus={psystatus}
        />
      </div>,
      <div key="sostoyanie" name="sostoyanie">
        <SostoyanieManager
          toggleSymptom={this.toggleSymptom}
          toggleText={this.toggleText}
          toggleRadio={this.toggleRadio}
          psystatus={psystatus}
        />
      </div>,
      <div key="anamnez" name="anamnez">
        <AnamnezManager
          toggleSymptom={this.toggleSymptom}
          toggleText={this.toggleText}
          toggleRadio={this.toggleRadio}
          psystatus={psystatus}
        />
      </div>,
      <div key="affekt" name="affekt">
        <AffektManager
          toggleSymptom={this.toggleSymptom}
          toggleText={this.toggleText}
          toggleRadio={this.toggleRadio}
          psystatus={psystatus}
        />
      </div>,
      <div key="rech" name="rech">
        <RechManager
          toggleSymptom={this.toggleSymptom}
          toggleText={this.toggleText}
          toggleRadio={this.toggleRadio}
          psystatus={psystatus}
        />
      </div>,
      <div key="kognit" name="kognit">
        <KognitManager
          toggleSymptom={this.toggleSymptom}
          toggleText={this.toggleText}
          toggleRadio={this.toggleRadio}
          psystatus={psystatus}
        />
      </div>,
      <div key="kogtest" name="kogtest">
        <KogtestManager
          toggleSymptom={this.toggleSymptom}
          toggleText={this.toggleText}
          toggleRadio={this.toggleRadio}
          psystatus={psystatus}
        />
      </div>,
      <div key="pp" name="pp">
        <PpManager
          toggleSymptom={this.toggleSymptom}
          toggleText={this.toggleText}
          toggleRadio={this.toggleRadio}
          psystatus={psystatus}
        />
      </div>,
      <div key="diagnoz" name="diagnoz">
        <DiagnozManager
          toggleSymptom={this.toggleSymptom}
          toggleText={this.toggleText}
          toggleRadio={this.toggleRadio}
          psystatus={psystatus}
        />
      </div>
    ];

    let tabRender = tabs.filter(item => {
      return item.key === this.state.activeTab;
    });

    return (
      <div className="app">
        <div className="app__row">
          <div className="app__menu">
            <div className="app__menu-title">Разделы</div>
            {tabMenuRender}
          </div>
          <div className="app__content">
            <div className="app__content-row">
              <div className="app__manager">{tabRender}</div>
              <div className="app__conclusion">
                <Conclusion psystatus={psystatus} toggleTab={this.toggleTab} />
              </div>
            </div>
            <div className="app__footer">
              Copyright 2019 Denis Zakharchenko
              <br />
              Licensed under the Apache License, Version 2.0
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    psystatus: state.psystatus,
    user: state.user
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setSymptom: bindActionCreators(setSymptom, dispatch),
    setText: bindActionCreators(setText, dispatch),
    setRadio: bindActionCreators(setRadio, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
