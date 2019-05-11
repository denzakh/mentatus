import React, { Component } from "react";
import "./Conclusion.css";
import ZhalobyList from "../ZhalobyList";
import AnamnezList from "../AnamnezList";
import SostoyanieList from "../SostoyanieList";
import AffektList from "../AffektList";
import RechList from "../RechList";
import KognitList from "../KognitList";
import KogtestList from "../KogtestList";
import OrientirovkaList from "../OrientirovkaList";
import PpList from "../PpList";
import DiagnozList from "../DiagnozList";
import NachaloList from "../NachaloList";
import ConclusionPanel from "../ConclusionPanel";

export default class Conclusion extends Component {
  render() {
    return (
      <div className="conclusion__box">
        <div className="conclusion__panel">
          <ConclusionPanel />
        </div>
        <div className="conclusion__text app__status-box" id="conclusion">
          <NachaloList
            psystatus={this.props.psystatus}
            toggleTab={this.props.toggleTab}
          />
          <AnamnezList
            psystatus={this.props.psystatus}
            toggleTab={this.props.toggleTab}
          />
          <SostoyanieList
            psystatus={this.props.psystatus}
            toggleTab={this.props.toggleTab}
          />
          <ZhalobyList
            psystatus={this.props.psystatus}
            toggleTab={this.props.toggleTab}
          />
          <OrientirovkaList
            psystatus={this.props.psystatus}
            toggleTab={this.props.toggleTab}
          />
          <AffektList
            psystatus={this.props.psystatus}
            toggleTab={this.props.toggleTab}
          />
          <RechList
            psystatus={this.props.psystatus}
            toggleTab={this.props.toggleTab}
          />
          <KognitList
            psystatus={this.props.psystatus}
            toggleTab={this.props.toggleTab}
          />
          <KogtestList
            psystatus={this.props.psystatus}
            toggleTab={this.props.toggleTab}
          />
          <PpList
            psystatus={this.props.psystatus}
            toggleTab={this.props.toggleTab}
          />
          <DiagnozList
            psystatus={this.props.psystatus}
            toggleTab={this.props.toggleTab}
          />
        </div>
      </div>
    );
  }
}
