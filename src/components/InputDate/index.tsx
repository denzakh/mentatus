import React, { Component } from "react";
import { connect } from "react-redux";
import type { Dispatch } from "redux";
import { setText } from "../../actions/textAction";
import { fieldOf } from "../../lib/redux";
import type { FieldOwnProps } from "../../types/components";
import type { StatusState } from "../../types/status";
import "./InputDate.css";

/*
InputDate
поле даты, привязанное к полю стора

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

class InputDate extends Component<Props> {
  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.props.setText(this.props.name, e.target.value);
  };

  render() {
    return (
      <div className="date">
        <label>
          <span className="date__label">{this.props.label}</span>
          <input
            type="date"
            className="date__input"
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
)(InputDate);
