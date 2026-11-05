import React, { Component } from "react";
import { connect } from "react-redux";
import type { Dispatch } from "redux";
import { setRadio } from "../../actions/radioAction";
import { radioOptionsOf, radioSelectedOf } from "../../lib/redux";
import RadioOptions from "../RadioOptions";
import type { RadioOption, Schema } from "../../types/schema";
import type { StatusState } from "../../types/status";
import "./RadioListInline.css";

/*
RadioListInline
группа радиокнопок в одну строку, привязанная к полю стора

принимает:
name - имя поля в сторе
dataBase - объект БД, в котором лежит группа (label + data)

Разметку рисует общий `RadioOptions` (variant="inline").
*/

interface OwnProps {
  name: string;
  dataBase?: Schema;
}

interface StateProps {
  options: RadioOption[];
  label?: string;
  selected?: number;
}

interface DispatchProps {
  setRadio: (name: string, value: number) => void;
}

type Props = OwnProps & StateProps & DispatchProps;

class RadioListInline extends Component<Props> {
  handleChange = (value: number) => {
    this.props.setRadio(this.props.name, value);
  };

  render() {
    return (
      <RadioOptions
        name={this.props.name}
        options={this.props.options}
        label={this.props.label}
        selected={this.props.selected}
        variant="inline"
        onChange={this.handleChange}
      />
    );
  }
}

function mapStateToProps(state: StatusState, ownProps: OwnProps): StateProps {
  const group = ownProps.dataBase && ownProps.dataBase[ownProps.name];

  return {
    options: radioOptionsOf(state, ownProps.name, ownProps.dataBase),
    label: group ? group.label : "",
    selected: radioSelectedOf(state, ownProps.name)
  };
}

function mapDispatchToProps(dispatch: Dispatch): DispatchProps {
  return {
    setRadio: (name, value) => dispatch(setRadio(name, value))
  };
}

export default connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps
)(RadioListInline);
