import React, { Component } from 'react';
import "./CheckboxOtkl.css";

export default class Checkbox extends Component {
  
  render() {
    const {name, onChange, psystatus, dataBase} = this.props;
    return (
      <span className="checkbox-otkl">
        <input type="checkbox" className="checkbox-otkl__input"
          checked={this.props.psystatus[name].isChecked}
          onChange={this.props.onChange}
          name={this.props.name}
          id={this.props.name}
        />
        <label className="checkbox-otkl__label" htmlFor={this.props.name}>{dataBase[name].phrase}</label>
      </span>
    );
  }
}