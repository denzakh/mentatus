import React, { Component } from "react";
import { connect } from "react-redux";
import { setSymptom } from "../../actions/symptomAction";
import { setRadio } from "../../actions/radioAction";
import { isKritikaEmpty } from "../../lib/rules/kritika";
import { fieldOf } from "../../lib/redux";
import "./Checkbox.css";

/*
Checkbox
чекбокс, привязанный к полю стора

принимает:
name - имя поля в сторе
dataBase - объект БД для подписи (не нужен, если задан label)
label - своя подпись
autoKritika - значение критики, которое проставляется при выборе поля
*/

class Checkbox extends Component {
  handleChange = () => {
    if (this.props.autoKritika !== undefined && this.props.isKritikaEmpty) {
      this.props.setRadio("kritika", this.props.autoKritika);
    }

    this.props.setSymptom(this.props.name);
  };

  render() {
    const { name, label, checked } = this.props;
    const id = "checkbox-" + name;

    return (
      <span>
        <input
          type="checkbox"
          className="checkbox__input"
          checked={checked}
          onChange={this.handleChange}
          name={name}
          id={id}
        />
        <label className="checkbox__label" htmlFor={id}>
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
    isKritikaEmpty: isKritikaEmpty(fieldOf(state, "kritika")),
    label:
      ownProps.label ||
      (dataBase && dataBase[ownProps.name] ? dataBase[ownProps.name].label : "")
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setSymptom: name => dispatch(setSymptom(name)),
    setRadio: (name, value) => dispatch(setRadio(name, value))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkbox);
