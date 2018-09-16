import React, { Component } from 'react';
import dataBase from "../../store/sostoyanieData.js";
import dataBaseRech from "../../store/rechData.js";
import Checkbox from "../Checkbox";
import CheckboxOtkl from "../CheckboxOtkl";
import RadioList from "../RadioList";
import cicleFn from "../../fn/cicleFn";
// import "./Pp.css";

export default class SostoyanieManager extends Component {
  
  render() {   

    // показ списка
    let zatrudNameArr = cicleFn(dataBase, "zatrud"); 
    let zatrudList = () => {
      return <div>
        <div className="list__title">затруднен из-за: </div>
        {zatrudNameArr.map(item => (
          <div key={item} className="list__item">
            <Checkbox 
              checked = {this.props.psystatus[item].isChecked}
              onChange = {this.props.toggleSymptom}
              name = {item}
              label = {dataBase[item].label}
            />
          </div>
        ))}
      </div>        
    }

    // показ списка
    let vpechNameArr = cicleFn(dataBase, "vpech"); 
    let vpechList = () => {
      return <div>
        <div className="list__title">Впечатление: </div>
        {vpechNameArr.map(item => (
          <div key={item} className="list__item">
            <Checkbox 
              checked = {this.props.psystatus[item].isChecked}
              onChange = {this.props.toggleSymptom}
              name = {item}
              label = {dataBase[item].label}
            />
          </div>
        ))}
      </div>        
    }

    // речь
    let rechGrubArr = cicleFn(dataBaseRech, "rechGrub"); 
    let rechGrubList = () => {
      return <div className="list__wrap">
        <div className="list__title">
          <span className="list__title-lable">Речь:</span>
          <CheckboxOtkl 
            name = "rechOtkl"
            onChange = {this.props.toggleSymptom}
            psystatus = {this.props.psystatus}
            dataBase = {dataBaseRech}
          />
          <CheckboxOtkl 
            name = "rechNeotvechaet"
            onChange = {this.props.toggleSymptom}
            psystatus = {this.props.psystatus}
            dataBase = {dataBaseRech}
          />
        </div>
        {rechGrubArr.map(item => (
          <div key={item} className="list__item">
            <Checkbox 
            checked = {this.props.psystatus[item].isChecked}
            onChange = {this.props.toggleSymptom}
            name = {item}
            label = {dataBaseRech[item].label}
            />
          </div>
        ))}
      </div>
    } 
    
    return <div>
      <div className="manager">
        <div className="manager__col manager__col--1">
          
          <div className="list__title">Состояние сознания:</div>
          <RadioList 
            name="soznanie" 
            dataBase={dataBase} 
            onChange={this.props.toggleRadio} 
            psystatus={this.props.psystatus}
          />

          {rechGrubList()}      

          <div className="list__title">Контакт:</div>
          <RadioList 
            name="kontakt" 
            dataBase={dataBase} 
            onChange={this.props.toggleRadio} 
            psystatus={this.props.psystatus}
          />

          {zatrudList()}

        </div>
        <div className="manager__col manager__col--2">

          {vpechList()}   

        </div>
      </div>
 
    </div>;
  }
}