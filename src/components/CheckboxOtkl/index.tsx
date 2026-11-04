import React, { Component } from "react";
import { connect } from "react-redux";
import type { Dispatch } from "redux";
import { setSymptom } from "../../actions/symptomAction";
import { fieldOf } from "../../lib/redux";
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
    const { name, label, checked } = this.props;
    const id = "checkbox-otkl-" + name;

    return (
      <span className="checkbox-otkl">
        <input
          type="checkbox"
          className="checkbox-otkl__input"
          checked={checked}
          onChange={this.handleChange}
          name={name}
          id={id}
        />
        <label className="checkbox-otkl__label" htmlFor={id}>
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
