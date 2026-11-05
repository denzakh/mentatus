import React, { Component } from "react";
import { connect } from "react-redux";
import type { Dispatch } from "redux";
import { setText } from "../../actions/textAction";
import { textOf } from "../../lib/redux";
import TextField from "../TextField";
import type { FieldOwnProps } from "../../types/components";
import type { StatusState } from "../../types/status";
import "./Textarea.css";

/*
Textarea
поле свободного текста, привязанное к полю стора

принимает:
name - имя поля в сторе
label - подпись
style - свои стили поля

Разметку рисует общий `TextField` (variant="textarea").
*/

interface StateProps {
  value: string;
}

interface DispatchProps {
  setText: (name: string, value: string) => void;
}

type Props = FieldOwnProps & StateProps & DispatchProps;

class Textarea extends Component<Props> {
  handleChange = (value: string) => {
    this.props.setText(this.props.name, value);
  };

  render() {
    return (
      <TextField
        name={this.props.name}
        label={this.props.label}
        value={this.props.value}
        style={this.props.style}
        onChange={this.handleChange}
      />
    );
  }
}

function mapStateToProps(
  state: StatusState,
  ownProps: FieldOwnProps
): StateProps {
  return {
    value: textOf(state, ownProps.name)
  };
}

function mapDispatchToProps(dispatch: Dispatch): DispatchProps {
  return {
    setText: (name, value) => dispatch(setText(name, value))
  };
}

export default connect<StateProps, DispatchProps, FieldOwnProps>(
  mapStateToProps,
  mapDispatchToProps
)(Textarea);
