import React, { Component } from "react";
import { connect } from "react-redux";
import type { Dispatch } from "redux";
import { setSymptom } from "../../actions/symptomAction";
import { fieldOf } from "../../lib/redux";
import CheckboxView from "../Checkbox/CheckboxView";
import type { StatusState } from "../../types/status";
import "../Checkbox/Checkbox.css";

/*
CheckboxPol
переключатель пола пациента, привязанный к полю стора

принимает:
name - имя поля в сторе (по умолчанию pol)

Разметку рисует общий `CheckboxView` (variant="pol"), подпись пола
выводится там же.
*/

interface OwnProps {
  name?: string;
}

interface StateProps {
  name: string;
  isMale: boolean;
}

interface DispatchProps {
  setSymptom: (name: string) => void;
}

type Props = StateProps & DispatchProps;

class CheckboxPol extends Component<Props> {
  handleChange = () => {
    this.props.setSymptom(this.props.name);
  };

  render() {
    return (
      <CheckboxView
        name={this.props.name}
        checked={this.props.isMale}
        variant="pol"
        onChange={this.handleChange}
      />
    );
  }
}

function mapStateToProps(state: StatusState, ownProps: OwnProps): StateProps {
  const name = ownProps.name || "pol";
  const field = fieldOf(state, name);

  return {
    name: name,
    isMale: !!(field && field.isChecked)
  };
}

function mapDispatchToProps(dispatch: Dispatch): DispatchProps {
  return {
    setSymptom: name => dispatch(setSymptom(name))
  };
}

export default connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps
)(CheckboxPol);
