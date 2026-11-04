import React, { Component } from "react";
import { connect } from "react-redux";
import { setSymptom } from "../../actions/symptomAction";
import { fieldOf } from "../../lib/redux";
import "../Checkbox/Checkbox.css";

/*
CheckboxPol
переключатель пола пациента, привязанный к полю стора

принимает:
name - имя поля в сторе (по умолчанию pol)
*/

class CheckboxPol extends Component {
  handleChange = () => {
    this.props.setSymptom(this.props.name);
  };

  render() {
    const { name, isMale } = this.props;
    const id = "checkbox-pol-" + name;

    return (
      <span>
        <input
          type="checkbox"
          className="checkbox__input"
          checked={isMale}
          onChange={this.handleChange}
          name={name}
          id={id}
        />
        <label className="checkbox__pol" htmlFor={id}>
          {isMale ? "Пол: мужской  ⇄" : "Пол: женский  ⇄"}
        </label>
      </span>
    );
  }
}

function mapStateToProps(state, ownProps) {
  const name = ownProps.name || "pol";
  const field = fieldOf(state, name);

  return {
    name: name,
    isMale: !!(field && field.isChecked)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setSymptom: name => dispatch(setSymptom(name))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckboxPol);
