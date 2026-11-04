import React, { Component } from "react";
import { connect } from "react-redux";
import { setText } from "../../actions/textAction";
import "./TextareaInline.css";

/*
TextareaInline
короткое поле текста в одну строку, привязанное к полю стора

принимает:
name - имя поля в сторе
label - подпись
*/

class TextareaInline extends Component {
  handleChange = e => {
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

function mapStateToProps(state, ownProps) {
  const field = state.psystatus[ownProps.name];

  return {
    value: (field && field.text) || ""
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setText: (name, value) => dispatch(setText(name, value))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TextareaInline);
