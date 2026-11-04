import React, { Component } from "react";
import { connect } from "react-redux";
import dataBase from "../../store/rechData.js";
import ListOfWords from "../ListOfWords";
import ListOfSentences from "../ListOfSentences";
import FreeText from "../FreeText";
import OnePraseFromRadio from "../OnePraseFromRadio";

class RechList extends Component {
  render() {
    const {
      isOdnoslojChecked,
      isNeotvechaetChecked,
      isMainHidden
    } = this.props;

    // односложные ответы
    const odnosloj = () =>
      isOdnoslojChecked ? (
        <span>, {dataBase["rechOdnosloj"].phrase}</span>
      ) : null;

    // ответы: либо «не отвечает», либо выбранный вариант
    const otvet = () => {
      if (isNeotvechaetChecked) {
        return (
          <span>
            <span> </span>
            <span>
              {dataBase["rechNeotvechaet"].phrase}
              <span>. </span>
            </span>
          </span>
        );
      }

      return (
        <span>
          <span> </span>
          <OnePraseFromRadio name="rechSuschestvo" dataObj={dataBase} />
          {odnosloj()}
          <span>. </span>
        </span>
      );
    };

    // основная часть выводится, если речь сохранна и контакт доступен
    const mainShow = () => {
      if (isMainHidden) {
        if (isNeotvechaetChecked) {
          return (
            <span>
              {dataBase["rechNeotvechaet"].phrase}
              <span>. </span>
            </span>
          );
        }

        return null;
      }

      return (
        <span>
          <OnePraseFromRadio name="myshleniePosled" dataObj={dataBase} />

          <OnePraseFromRadio name="myshlenieTemp" dataObj={dataBase} />

          <ListOfWords name="myshlenie" dataObj={dataBase} isAnd={true} />
          <span>.</span>

          <FreeText name="myshlenieText" />

          {/*речь*/}

          <ListOfWords name="rechOsob" dataObj={dataBase} isAnd={false} />

          {otvet()}

          <ListOfWords name="rechOtmech" dataObj={dataBase} isAnd={false} />
        </span>
      );
    };

    return (
      <span data-id="rech" onClick={this.props.toggleTab}>
        {mainShow()}

        <ListOfSentences name="rechGrub" dataObj={dataBase} />

        <FreeText name="rechText" />
      </span>
    );
  }
}

function mapStateToProps(state) {
  const psystatus = state.psystatus;

  return {
    isOdnoslojChecked: psystatus.rechOdnosloj.isChecked,
    isNeotvechaetChecked: psystatus.rechNeotvechaet.isChecked,
    isMainHidden:
      psystatus.rechOtkl.isChecked ||
      +psystatus.kontakt.number === 2 ||
      +psystatus.soznanie.number === 7
  };
}

export default connect(mapStateToProps)(RechList);
