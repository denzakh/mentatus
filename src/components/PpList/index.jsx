import React, { Component } from "react";
import dataBase from "../../store/ppData.js";
import ListOfWords from "../ListOfWords";
import FreeText from "../FreeText";
import OnePraseFromRadio from "../OnePraseFromRadio";
import SonAppetitList from "../SonAppetitList";
import KritikaList from "../KritikaList";

export default class PpList extends Component {
  render() {
    let bredShow = () => {
      if (this.props.psystatus.bredOtkl.isChecked) {
        return;
      } else {
        return (
          <span>
            <ListOfWords
              name="bred"
              dataObj={dataBase}
              psystatus={this.props.psystatus}
            />
          </span>
        );
      }
    };

    let gallShow = () => {
      if (this.props.psystatus.gallOtkl.isChecked) {
        return;
      } else {
        return (
          <span>
            <ListOfWords
              name="gall"
              dataObj={dataBase}
              psystatus={this.props.psystatus}
            />
          </span>
        );
      }
    };

    let opasnyeShow = () => {
      if (this.props.psystatus.opasnyeOtkl.isChecked) {
        return;
      } else {
        return (
          <span>
            <OnePraseFromRadio
              name="opasnye"
              dataObj={dataBase}
              psystatus={this.props.psystatus}
            />

            <OnePraseFromRadio
              name="opasnyeAgressia"
              dataObj={dataBase}
              psystatus={this.props.psystatus}
            />
          </span>
        );
      }
    };

    return (
      <span>
        <span data-id="pp" onClick={this.props.toggleTab}>
          {bredShow()}
          <FreeText text={this.props.psystatus.bredText} />

          {gallShow()}
          <FreeText text={this.props.psystatus.gallText} />

          {/*Опасные*/}
          {opasnyeShow()}

          <FreeText text={this.props.psystatus.opasnyeText} />
        </span>

        <span data-id="affekt" onClick={this.props.toggleTab}>
          <SonAppetitList psystatus={this.props.psystatus} />
        </span>

        <span data-id="pp" onClick={this.props.toggleTab}>
          <KritikaList psystatus={this.props.psystatus} />
        </span>
      </span>
    );
  }
}
