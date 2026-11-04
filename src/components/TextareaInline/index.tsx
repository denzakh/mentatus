import React, { Component } from "react";
import { connect } from "react-redux";
import type { Dispatch } from "redux";
import { setText } from "../../actions/textAction";
import { fieldOf } from "../../lib/redux";
import type { FieldOwnProps } from "../../types/components";
import type { StatusState } from "../../types/status";
import "./TextareaInline.css";

/*
TextareaInline
короткое поле текста в одну строку, привязанное к полю стора

принимает:
name - имя поля в сторе
label - подпись
*/

interface StateProps {
  value: string;
}

interface DispatchProps {
  setText: (name: string, value: string) => void;
}

type Props = FieldOwnProps & StateProps & DispatchProps;

class TextareaInline extends Component<Props> {
  handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    this.props.setText(this.props.name, e.target.value);
  };

  render() {
    return (
      <div className="textarea-inline">
        <label>
          <div className="textarea-inline__label">{this.props.label}</div>
          <textarea
            className="textarea-inline__input"
            onChange={this.handleChange}
            name={this.props.name}
            value={this.props.value}
          />
        </label>
      </div>
    );
  }
}

function mapStateToProps(
  state: StatusState,
  ownProps: FieldOwnProps
): StateProps {
  const field = fieldOf(state, ownProps.name);

  return {
    value: (field && field.text) || ""
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
