import React, { Component } from "react";
import { connect } from "react-redux";
import type { Dispatch } from "redux";
import { setRadio } from "../../actions/radioAction";
import { radioOptionsOf, radioSelectedOf } from "../../lib/redux";
import RadioOptions from "../RadioOptions";
import type { RadioOption, Schema } from "../../types/schema";
import type { StatusState } from "../../types/status";
import "./RadioList.css";

/*
RadioList
группа радиокнопок, привязанная к полю стора

принимает:
name - имя поля в сторе
dataBase - объект БД, в котором лежит группа (label + data)

Разметку рисует общий `RadioOptions`; здесь только чтение стора и диспатч.
*/

interface OwnProps {
  name: string;
  dataBase?: Schema;
}

interface StateProps {
  options: RadioOption[];
  selected?: number;
}

interface DispatchProps {
  setRadio: (name: string, value: number) => void;
}

type Props = OwnProps & StateProps & DispatchProps;

class RadioList extends Component<Props> {
  handleChange = (value: number) => {
    this.props.setRadio(this.props.name, value);
  };

  render() {
    return (
      <RadioOptions
        name={this.props.name}
        options={this.props.options}
        selected={this.props.selected}
        onChange={this.handleChange}
      />
    );
  }
}

function mapStateToProps(state: StatusState, ownProps: OwnProps): StateProps {
  return {
    options: radioOptionsOf(state, ownProps.name, ownProps.dataBase),
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
)(RadioList);
