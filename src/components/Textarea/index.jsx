import React, { Component } from "react";
import { connect } from "react-redux";
import { setText } from "../../actions/textAction";
import { fieldOf } from "../../lib/redux";
import "./Textarea.css";

/*
Textarea
поле свободного текста, привязанное к полю стора

принимает:
name - имя поля в сторе
label - подпись
style - свои стили поля
*/

class Textarea extends Component {
  handleChange = e => {
    this.props.setText(this.props.name, e.target.value);
  };

  render() {
    return (
      <div className="textarea">
        <div className="textarea__label">{this.props.label}</div>
        <textarea
          className="textarea__input"
          onChange={this.handleChange}
          name={this.props.name}
          style={this.props.style}
          value={this.props.value}
        />
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

export default connect(mapStateToProps, mapDispatchToProps)(Textarea);
