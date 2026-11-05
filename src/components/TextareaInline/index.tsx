import React, { Component } from "react";
import { connect } from "react-redux";
import type { Dispatch } from "redux";
import { setText } from "../../actions/textAction";
import { textOf } from "../../lib/redux";
import TextField from "../TextField";
import type { FieldOwnProps } from "../../types/components";
import type { StatusState } from "../../types/status";
import "./TextareaInline.css";

/*
TextareaInline
короткое поле текста в одну строку, привязанное к полю стора

принимает:
name - имя поля в сторе
label - подпись

Разметку рисует общий `TextField` (variant="inline").
*/

interface StateProps {
  value: string;
}

interface DispatchProps {
  setText: (name: string, value: string) => void;
}

type Props = FieldOwnProps & StateProps & DispatchProps;

class TextareaInline extends Component<Props> {
  handleChange = (value: string) => {
    this.props.setText(this.props.name, value);
  };

  render() {
    return (
      <TextField
        name={this.props.name}
        label={this.props.label}
        value={this.props.value}
        variant="inline"
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
)(TextareaInline);
