import React, { Component } from "react";
import { connect } from "react-redux";
import dataBase from "../../store/rechData.js";
import { fieldOf } from "../../lib/redux";
import FieldView from "../FieldView";

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
          <FieldView name="rechSuschestvo" dataObj={dataBase} />
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
          <FieldView name="myshleniePosled" dataObj={dataBase} />

          <FieldView name="myshlenieTemp" dataObj={dataBase} />

          <FieldView name="myshlenie" dataObj={dataBase} isAnd />
          <span>.</span>

          <FieldView name="myshlenieText" dataObj={dataBase} />

          {/*речь*/}

          <FieldView name="rechOsob" dataObj={dataBase} />

          {otvet()}

          <FieldView name="rechOtmech" dataObj={dataBase} />
        </span>
      );
    };

    return (
      <span data-id="rech" onClick={this.props.toggleTab}>
        {mainShow()}

        <FieldView name="rechGrub" dataObj={dataBase} as="sentences" />

        <FieldView name="rechText" dataObj={dataBase} />
      </span>
    );
  }
}

function mapStateToProps(state) {
  const odnosloj = fieldOf(state, "rechOdnosloj");
  const neotvechaet = fieldOf(state, "rechNeotvechaet");
  const rechOtkl = fieldOf(state, "rechOtkl");
  const kontakt = fieldOf(state, "kontakt");
  const soznanie = fieldOf(state, "soznanie");

  return {
    isOdnoslojChecked: !!(odnosloj && odnosloj.isChecked),
    isNeotvechaetChecked: !!(neotvechaet && neotvechaet.isChecked),
    isMainHidden:
      !!(rechOtkl && rechOtkl.isChecked) ||
      +((kontakt && kontakt.number) || 0) === 2 ||
      +((soznanie && soznanie.number) || 0) === 7
  };
}

export default connect(mapStateToProps)(RechList);
