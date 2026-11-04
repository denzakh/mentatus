import React, { Component } from "react";
import "./TabMenu.css";
import classNames from "classnames";
import { sectionsRegistry, tabOrder } from "../../sections/registry";
import type { ToggleTabHandler } from "../../types/components";

/*
TabMenu
меню разделов

принимает:
activeTab   - имя активного раздела
toggleTab   - обработчик перехода на вкладку

Список вкладок, их порядок, символы и подписи берутся из реестра разделов
(`src/sections/registry.ts`), поэтому новый раздел не требует правки меню.
*/
interface Props {
  activeTab: string;
  toggleTab: ToggleTabHandler;
}

export default class TabMenu extends Component<Props> {
  render() {
    const tabMenuRender = tabOrder.map(name => {
      const { tab } = sectionsRegistry[name];
      const tabClass = classNames({
        "tab-menu__item": true,
        "is-active": name === this.props.activeTab
      });

      return (
        <div
          onClick={this.props.toggleTab}
          title={tab.title}
          key={name}
          data-id={name}
          className={tabClass}
        >
          <div className="app__tab-symbol">{tab.symbol}</div>
          <div className="app__tab-label">{tab.title}</div>
        </div>
      );
    });

    return <div className="tab-menu">{tabMenuRender}</div>;
  }
}
