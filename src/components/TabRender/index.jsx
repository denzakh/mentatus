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

export default class TabRender extends Component {
  render() {
    const tabs = [
      <div key="zhaloby" name="zhaloby">
        <ZhalobyManager />
      </div>,
      <div key="sostoyanie" name="sostoyanie">
        <SostoyanieManager />
      </div>,
      <div key="anamnez" name="anamnez">
        <AnamnezManager />
      </div>,
      <div key="affekt" name="affekt">
        <AffektManager />
      </div>,
      <div key="rech" name="rech">
        <RechManager />
      </div>,
      <div key="kognit" name="kognit">
        <KognitManager />
      </div>,
      <div key="kogtest" name="kogtest">
        <KogtestManager />
      </div>,
      <div key="pp" name="pp">
        <PpManager />
      </div>,
      <div key="diagnoz" name="diagnoz">
        <DiagnozManager />
      </div>
    ];

    const tabRender = tabs.filter(item => item.key === this.props.activeTab);

    return <div className="tab-render">{tabRender}</div>;
  }
}
