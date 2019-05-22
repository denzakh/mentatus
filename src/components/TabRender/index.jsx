import React, { Component } from "react";
import "./TabRender.css";
import ZhalobyManager from "../../components/ZhalobyManager";
import AnamnezManager from "../../components/AnamnezManager";
import SostoyanieManager from "../../components/SostoyanieManager";
import AffektManager from "../../components/AffektManager";
import RechManager from "../../components/RechManager";
import KognitManager from "../../components/KognitManager";
import KogtestManager from "../../components/KogtestManager";
import PpManager from "../../components/PpManager";
import DiagnozManager from "../../components/DiagnozManager";

export default class TabMenu extends Component {
  render() {
    let psystatus = this.props.psystatus;
    let toggleSymptom = this.props.toggleSymptom;
    let toggleText = this.props.toggleText;
    let toggleRadio = this.props.toggleRadio;

    let tabs = [
      <div key="zhaloby" name="zhaloby">
        <ZhalobyManager
          toggleSymptom={toggleSymptom}
          toggleText={toggleText}
          toggleRadio={toggleRadio}
          psystatus={psystatus}
        />
      </div>,
      <div key="sostoyanie" name="sostoyanie">
        <SostoyanieManager
          toggleSymptom={toggleSymptom}
          toggleText={toggleText}
          toggleRadio={toggleRadio}
          psystatus={psystatus}
        />
      </div>,
      <div key="anamnez" name="anamnez">
        <AnamnezManager
          toggleSymptom={toggleSymptom}
          toggleText={toggleText}
          toggleRadio={toggleRadio}
          psystatus={psystatus}
        />
      </div>,
      <div key="affekt" name="affekt">
        <AffektManager
          toggleSymptom={toggleSymptom}
          toggleText={toggleText}
          toggleRadio={toggleRadio}
          psystatus={psystatus}
        />
      </div>,
      <div key="rech" name="rech">
        <RechManager
          toggleSymptom={toggleSymptom}
          toggleText={toggleText}
          toggleRadio={toggleRadio}
          psystatus={psystatus}
        />
      </div>,
      <div key="kognit" name="kognit">
        <KognitManager
          toggleSymptom={toggleSymptom}
          toggleText={toggleText}
          toggleRadio={toggleRadio}
          psystatus={psystatus}
        />
      </div>,
      <div key="kogtest" name="kogtest">
        <KogtestManager
          toggleSymptom={toggleSymptom}
          toggleText={toggleText}
          toggleRadio={toggleRadio}
          psystatus={psystatus}
        />
      </div>,
      <div key="pp" name="pp">
        <PpManager
          toggleSymptom={toggleSymptom}
          toggleText={toggleText}
          toggleRadio={toggleRadio}
          psystatus={psystatus}
        />
      </div>,
      <div key="diagnoz" name="diagnoz">
        <DiagnozManager
          toggleSymptom={toggleSymptom}
          toggleText={toggleText}
          toggleRadio={toggleRadio}
          psystatus={psystatus}
        />
      </div>
    ];

    let tabRender = tabs.filter(item => {
      return item.key === this.props.activeTab;
    });

    return <div className="tab-render">{tabRender}</div>;
  }
}
