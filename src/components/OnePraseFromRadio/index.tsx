import React, { Component } from "react";
import { connect } from "react-redux";
import { buildRadioPhrase } from "../../lib/text";
import { areStatePropsEqual, fieldOf } from "../../lib/redux";
import type { FieldViewOwnProps } from "../../types/components";
import type { StatusState } from "../../types/status";

/*
OnePraseFromRadio
компонент представления

принимает:
name - имя радиогруппы
dataObj - объект БД для этой категории (например, данные по настроению)

из стора берёт: номер выбранного пункта группы и пол пациента
возвращает: название радиогруппы + значение выбранного пункта
*/

interface StateProps {
  phrase: string;
}

type Props = FieldViewOwnProps & StateProps;

class OnePraseFromRadio extends Component<Props> {
  render() {
    return <span>{this.props.phrase}</span>;
  }
}

function mapStateToProps(
  state: StatusState,
  ownProps: FieldViewOwnProps
): StateProps {
  const field = fieldOf(state, ownProps.name);
  const pol = fieldOf(state, "pol");

  return {
    phrase: buildRadioPhrase(
      ownProps.dataObj && ownProps.dataObj[ownProps.name],
      field ? field.number : 0,
      !!(pol && pol.isChecked)
    )
  };
}

export default connect<StateProps, unknown, FieldViewOwnProps>(
  mapStateToProps,
  null,
  null,
  { areStatePropsEqual }
)(OnePraseFromRadio);
