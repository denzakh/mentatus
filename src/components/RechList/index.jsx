import React, { Component } from "react";
import dataBase from "../../store/rechData.js";
import ListOfWords from "../ListOfWords";
import ListOfSentences from "../ListOfSentences";
import FreeText from "../FreeText";
import OnePraseFromRadio from "../OnePraseFromRadio";

export default class RechList extends Component {
  render() {
    let odnosloj = () => {
      if (this.props.psystatus.rechOdnosloj.isChecked) {
        return <span>, {dataBase["rechOdnosloj"].phrase}</span>;
      }
    };

    let otvet = () => {
      if (this.props.psystatus.rechNeotvechaet.isChecked) {
        return (
          <span>
            <span>. </span>
            <span>
              {dataBase["rechNeotvechaet"].phrase}
              <span>. </span>
            </span>
          </span>
        );
      } else {
        return (
          <span>
            <span>, </span>
            <OnePraseFromRadio
              name="rechSuschestvo"
              dataObj={dataBase}
              psystatus={this.props.psystatus}
            />
            {odnosloj()}
            <span>. </span>
          </span>
        );
      }
    };

    let mainShow = () => {
      if (
        this.props.psystatus.rechOtkl.isChecked ||
        this.props.psystatus.kontakt.number === 2 ||
        this.props.psystatus.soznanie.number === 7
      ) {
        if (this.props.psystatus.rechNeotvechaet.isChecked) {
          return (
            <span>
              {dataBase["rechNeotvechaet"].phrase}
              <span>. </span>
            </span>
          );
        }
      } else {
        return (
          <span>
            <OnePraseFromRadio
              name="myshleniePosled"
              dataObj={dataBase}
              psystatus={this.props.psystatus}
            />

            <OnePraseFromRadio
              name="myshlenieTemp"
              dataObj={dataBase}
              psystatus={this.props.psystatus}
            />

            <ListOfWords
              name="myshlenie"
              dataObj={dataBase}
              psystatus={this.props.psystatus}
              isAnd={true}
            />
            <span>.</span>

            <FreeText text={this.props.psystatus.myshlenieText} />

            {/*речь*/}

            <ListOfWords
              name="rechOsob"
              dataObj={dataBase}
              psystatus={this.props.psystatus}
              isAnd={false}
            />

            {otvet()}

            <ListOfWords
              name="rechOtmech"
              dataObj={dataBase}
              psystatus={this.props.psystatus}
              isAnd={false}
            />
          </span>
        );
      }
    };

    return (
      <span data-id="rech" onClick={this.props.toggleTab}>
        {mainShow()}

        <ListOfSentences
          name="rechGrub"
          dataObj={dataBase}
          psystatus={this.props.psystatus}
        />

        <FreeText text={this.props.psystatus.rechText} />
      </span>
    );
  }
}
