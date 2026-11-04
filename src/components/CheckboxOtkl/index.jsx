import React, { Component } from "react";
import "./CheckboxOtkl.css";

export default class CheckboxOtkl extends Component {
  render() {
    const { name, onChange, psystatus, dataBase } = this.props;
    return (
      <span className="checkbox-otkl">
        <input
          type="checkbox"
          className="checkbox-otkl__input"
          checked={psystatus[name].isChecked}
          onChange={onChange}
          name={name}
          id={"checkbox-otkl-" + name}
        />
        <label
          className="checkbox-otkl__label"
          htmlFor={"checkbox-otkl-" + name}
        >
          {dataBase[name].label}
        </label>
      </span>
    );
  }
}
