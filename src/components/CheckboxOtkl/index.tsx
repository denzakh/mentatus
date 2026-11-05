import React, { Component } from "react";
import { connect } from "react-redux";
import type { Dispatch } from "redux";
import { setSymptom } from "../../actions/symptomAction";
import { fieldOf } from "../../lib/redux";
import CheckboxView from "../Checkbox/CheckboxView";
import type { FieldOwnProps } from "../../types/components";
import type { StatusState } from "../../types/status";
import "./CheckboxOtkl.css";

/*
CheckboxOtkl
чекбокс «пункт отклонён / не оценивался», привязанный к полю стора

принимает:
name - имя поля в сторе
dataBase - объект БД для подписи
label - своя подпись

Разметку рисует общий `CheckboxView` (variant="otkl").
*/

interface StateProps {
  checked: boolean;
  label?: string;
}

interface DispatchProps {
  setSymptom: (name: string) => void;
}

type Props = FieldOwnProps & StateProps & DispatchProps;

class CheckboxOtkl extends Component<Props> {
  handleChange = () => {
    this.props.setSymptom(this.props.name);
  };

  render() {
    return (
      <CheckboxView
        name={this.props.name}
        label={this.props.label}
        checked={this.props.checked}
        variant="otkl"
        onChange={this.handleChange}
      />
    );
  }
}

function mapStateToProps(
  state: StatusState,
  ownProps: FieldOwnProps
): StateProps {
  const field = fieldOf(state, ownProps.name);
  const dataBase = ownProps.dataBase;

  return {
    checked: !!(field && field.isChecked),
    label:
      ownProps.label ||
      (dataBase && dataBase[ownProps.name] ? dataBase[ownProps.name].label : "")
  };
}

function mapDispatchToProps(dispatch: Dispatch): DispatchProps {
  return {
    setSymptom: name => dispatch(setSymptom(name))
  };
}

export default connect<StateProps, DispatchProps, FieldOwnProps>(
  mapStateToProps,
  mapDispatchToProps
)(CheckboxOtkl);
