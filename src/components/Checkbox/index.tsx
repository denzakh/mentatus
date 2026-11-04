import React, { Component } from "react";
import { connect } from "react-redux";
import type { Dispatch } from "redux";
import { setSymptom } from "../../actions/symptomAction";
import { setRadio } from "../../actions/radioAction";
import { isKritikaEmpty } from "../../lib/rules/kritika";
import { fieldOf } from "../../lib/redux";
import type { FieldOwnProps } from "../../types/components";
import type { StatusState } from "../../types/status";
import "./Checkbox.css";

/*
Checkbox
чекбокс, привязанный к полю стора

принимает:
name - имя поля в сторе
dataBase - объект БД для подписи (не нужен, если задан label)
label - своя подпись
autoKritika - значение критики, которое проставляется при выборе поля
*/

interface StateProps {
  checked: boolean;
  isKritikaEmpty: boolean;
  label?: string;
}

interface DispatchProps {
  setSymptom: (name: string) => void;
  setRadio: (name: string, value: number) => void;
}

type Props = FieldOwnProps & StateProps & DispatchProps;

class Checkbox extends Component<Props> {
  handleChange = () => {
    if (this.props.autoKritika !== undefined && this.props.isKritikaEmpty) {
      this.props.setRadio("kritika", this.props.autoKritika);
    }

    this.props.setSymptom(this.props.name);
  };

  render() {
    const { name, label, checked } = this.props;
    const id = "checkbox-" + name;

    return (
      <span>
        <input
          type="checkbox"
          className="checkbox__input"
          checked={checked}
          onChange={this.handleChange}
          name={name}
          id={id}
        />
        <label className="checkbox__label" htmlFor={id}>
          {label}
        </label>
      </span>
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
    isKritikaEmpty: isKritikaEmpty(fieldOf(state, "kritika")),
    label:
      ownProps.label ||
      (dataBase && dataBase[ownProps.name] ? dataBase[ownProps.name].label : "")
  };
}

function mapDispatchToProps(dispatch: Dispatch): DispatchProps {
  return {
    setSymptom: name => dispatch(setSymptom(name)),
    setRadio: (name, value) => dispatch(setRadio(name, value))
  };
}

export default connect<StateProps, DispatchProps, FieldOwnProps>(
  mapStateToProps,
  mapDispatchToProps
)(Checkbox);
