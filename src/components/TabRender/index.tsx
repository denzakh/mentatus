import React, { Component } from "react";
import ZhalobyManager from "../../components/ZhalobyManager";
import AnamnezManager from "../../components/AnamnezManager";
import SostoyanieManager from "../../components/SostoyanieManager";
import AffektManager from "../../components/AffektManager";
import RechManager from "../../components/RechManager";
import KognitManager from "../../components/KognitManager";
import KogtestManager from "../../components/KogtestManager";
import PpManager from "../../components/PpManager";
import DiagnozManager from "../../components/DiagnozManager";

/*
TabRender
показывает форму активного раздела

принимает:
activeTab - имя активного раздела

Данные разделы берут из стора сами, поэтому перерисовка
при вводе затрагивает только конкретное поле.
*/

interface Props {
  activeTab: string;
}

export default class TabRender extends Component<Props> {
  render() {
    const tabs = [
      <div key="zhaloby">
        <ZhalobyManager />
      </div>,
      <div key="sostoyanie">
        <SostoyanieManager />
      </div>,
      <div key="anamnez">
        <AnamnezManager />
      </div>,
      <div key="affekt">
        <AffektManager />
      </div>,
      <div key="rech">
        <RechManager />
      </div>,
      <div key="kognit">
        <KognitManager />
      </div>,
      <div key="kogtest">
        <KogtestManager />
      </div>,
      <div key="pp">
        <PpManager />
      </div>,
      <div key="diagnoz">
        <DiagnozManager />
      </div>
    ];

    const tabRender = tabs.filter(item => item.key === this.props.activeTab);

    return <div className="tab-render">{tabRender}</div>;
  }
}
