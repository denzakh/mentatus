
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

export default function TabMenu(props: Props) {
  const { activeTab, toggleTab } = props;

  const tabMenuRender = tabOrder.map(name => {
    const { tab } = sectionsRegistry[name];
    const tabClass = classNames({
      "tab-menu__item": true,
      "is-active": name === activeTab
    });

    return (
      <button
        type="button"
        onClick={toggleTab}
        title={tab.title}
        key={name}
        data-id={name}
        className={tabClass}
        aria-current={name === activeTab ? "page" : undefined}
      >
        <div className="app__tab-symbol">{tab.symbol}</div>
        <div className="app__tab-label">{tab.title}</div>
      </button>
    );
  });

  return <div className="tab-menu">{tabMenuRender}</div>;
}
