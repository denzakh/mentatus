import React, { Component } from "react";
import { connect } from "react-redux";
import { setSymptom } from "../../actions/symptomAction";
import { fieldOf } from "../../lib/redux";
import "./CheckboxOtkl.css";

/*
CheckboxOtkl
чекбокс «пункт отклонён / не оценивался», привязанный к полю стора

принимает:
name - имя поля в сторе
dataBase - объект БД для подписи
label - своя подпись
*/

class CheckboxOtkl extends Component {
  handleChange = () => {
    this.props.setSymptom(this.props.name);
  };

  render() {
    const { name, label, checked } = this.props;
    const id = "checkbox-otkl-" + name;

    return (
      <span className="checkbox-otkl">
        <input
          type="checkbox"
          className="checkbox-otkl__input"
          checked={checked}
          onChange={this.handleChange}
          name={name}
          id={id}
        />
        <label className="checkbox-otkl__label" htmlFor={id}>
          {label}
        </label>
      </span>
    );
  }
}

function mapStateToProps(state, ownProps) {
  const field = fieldOf(state, ownProps.name);
  const dataBase = ownProps.dataBase;

  return {
    checked: !!(field && field.isChecked),
    label:
      ownProps.label ||
      (dataBase && dataBase[ownProps.name] ? dataBase[ownProps.name].label : "")
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setSymptom: name => dispatch(setSymptom(name))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckboxOtkl);
