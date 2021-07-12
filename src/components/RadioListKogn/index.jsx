import React, { Component } from "react";
import "./RadioListKogn.css";
import getToggleKritika from "../../fn/getToggleKritika";

export default class RadioListKogn extends Component {
  render() {
    let dataBase = this.props.dataBase;
    let name = this.props.name;
    let arr = dataBase[name].data;
    let psystatus = this.props.psystatus;

    // функция снижения критики
    let toggleList = [
      this.props.toggleRadio, // 0
      getToggleKritika(
        this.props.psystatus,
        this.props.toggleRadio,
        this.props.toggleRadio,
        "2"
      ), // 1
      getToggleKritika(
        this.props.psystatus,
        this.props.toggleRadio,
        this.props.toggleRadio,
        "3"
      ), // 2
      getToggleKritika(
        this.props.psystatus,
        this.props.toggleRadio,
        this.props.toggleRadio,
        "4"
      ), // 3
      this.props.toggleRadio // 4
    ];

    return (
      <div className="radio__list">
        {arr.map(item => (
          <div key={item.id} className="radio__item">
            <input
              type="radio"
              name={name}
              id={name + item.id}
              value={item.id}
              className="radio__input"
              onChange={toggleList[item.id]}
              checked={+item.id === +psystatus[name].number}
            />
            <label className="radio__label" htmlFor={name + item.id}>
              {item.label}
            </label>
          </div>
        ))}
      </div>
    );
  }
}
