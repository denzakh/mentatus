import React, { Component } from "react";
import { connect } from "react-redux";
import { buildRadioPhrase } from "../../lib/text";
import { areStatePropsEqual, fieldOf } from "../../lib/redux";

/*
OnePraseFromRadio
компонент представления

принимает:
name - имя радиогруппы
dataObj - объект БД для этой категории (например, данные по настроению)

из стора берёт: номер выбранного пункта группы и пол пациента
возвращает: название радиогруппы + значение выбранного пункта
*/

class OnePraseFromRadio extends Component {
  render() {
    return <span>{this.props.phrase}</span>;
  }
}

function mapStateToProps(state, ownProps) {
  const field = fieldOf(state, ownProps.name);
  const pol = fieldOf(state, "pol");

  return {
    phrase: buildRadioPhrase(
      ownProps.dataObj[ownProps.name],
      field ? field.number : 0,
      !!(pol && pol.isChecked)
    )
  };
}

export default connect(mapStateToProps, null, null, { areStatePropsEqual })(
  OnePraseFromRadio
);
