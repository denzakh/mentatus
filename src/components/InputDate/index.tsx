import React, { Component } from "react";
import { connect } from "react-redux";
import { setText } from "../../actions/textAction";
import { fieldOf } from "../../lib/redux";
import "./InputDate.css";

/*
InputDate
поле даты, привязанное к полю стора

принимает:
name - имя поля в сторе
label - подпись
*/

class InputDate extends Component {
  handleChange = e => {
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

function mapStateToProps(state, ownProps) {
  const field = fieldOf(state, ownProps.name);

  return {
    value: (field && field.text) || ""
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setText: (name, value) => dispatch(setText(name, value))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(InputDate);
