import React, { Component } from "react";
import "./TabMenu.css";
import classNames from "classnames";

export default class TabMenu extends Component {
  render() {
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
        "tab-menu__item": true,
        "is-active": item.name === this.props.activeTab
      });

      return (
        <div
          onClick={this.props.toggleTab}
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

    return <div className="tab-menu">{tabMenuRender}</div>;
  }
}
