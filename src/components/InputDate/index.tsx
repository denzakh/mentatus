import React, { Component } from "react";
import { connect } from "react-redux";
import type { Dispatch } from "redux";
import { setText } from "../../actions/textAction";
import { textOf } from "../../lib/redux";
import TextField from "../TextField";
import type { FieldOwnProps } from "../../types/components";
import type { StatusState } from "../../types/status";
import "./InputDate.css";

/*
InputDate
поле даты, привязанное к полю стора

принимает:
name - имя поля в сторе
label - подпись
style - не используется (в отличие от Textarea), как и раньше

Разметку рисует общий `TextField` (variant="date").
*/

interface StateProps {
  value: string;
}

interface DispatchProps {
  setText: (name: string, value: string) => void;
}

type Props = FieldOwnProps & StateProps & DispatchProps;

class InputDate extends Component<Props> {
  handleChange = (value: string) => {
    this.props.setText(this.props.name, value);
  };

  render() {
    return (
      <TextField
        name={this.props.name}
        label={this.props.label}
        value={this.props.value}
        variant="date"
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
)(InputDate);
