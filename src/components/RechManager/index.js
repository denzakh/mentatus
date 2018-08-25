import React, { Component } from 'react';
import dataBase from "../../store/rechData.js";
import Checkbox from "../Checkbox";
import CheckboxOtkl from "../CheckboxOtkl";
import RadioList from "../RadioList";
import RadioListInline from "../RadioListInline";
import Textarea from "../Textarea";
import TextareaInline from "../TextareaInline";
import cicleFn from "../../fn/cicleFn";
import "./Rech.css";

export default class RechManager extends Component {

  constructor(props) {
    super(props);
  }
  
  render() {   

    // показ списка бред
    let myshlenieArr = cicleFn(dataBase, "myshlenie"); 

    let myshlenieList = () => {
      return <div className="list__options">
        <div className="list__title"></div>
        {myshlenieArr.map(item => (
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

    let rechOsobArr = cicleFn(dataBase, "rechOsob"); 
    let rechOsobList = () => {
      return <div className="list__options">
        <div className="list__title"></div>
        {rechOsobArr.map(item => (
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

    let rechOtmechArr = cicleFn(dataBase, "rechOtmech"); 
    let rechOtmechList = () => {
      return <div className="list__options">
        <div className="list__title"></div>
        {rechOtmechArr.map(item => (
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

    
    return <div>

      <div className="list__title">Мышление:</div>
      <RadioList 
        name="myshleniePosled" 
        dataBase={dataBase} 
        onChange={this.props.toggleRadio} 
        psystatus={this.props.psystatus}
      />
      <div className="list__title">по темпу:</div>
      <RadioList 
        name="myshlenieTemp" 
        dataBase={dataBase} 
        onChange={this.props.toggleRadio} 
        psystatus={this.props.psystatus}
      />

      {myshlenieList()}  

      <Textarea
        onChange={this.props.toggleText}
        name="myshlenieText"
        label="Описание мышления"
        value={this.props.psystatus.myshlenieText}
      />  

      <div className="list__title">Речь по темпу:</div>
      <RadioList 
        name="rechTemp" 
        dataBase={dataBase} 
        onChange={this.props.toggleRadio} 
        psystatus={this.props.psystatus}
      />

      {rechOsobList()}  

      <div className="list__title">Ответы:</div>
      <RadioList 
        name="rechSuschestvo" 
        dataBase={dataBase} 
        onChange={this.props.toggleRadio} 
        psystatus={this.props.psystatus}
      />

      + <Checkbox 
        checked = {this.props.psystatus["rechOdnosloj"].isChecked}
        onChange = {this.props.toggleSymptom}
        name = {"rechOdnosloj"}
        label = {dataBase["rechOdnosloj"].label}
      />  

      {rechOtmechList()}       



    </div>;
  }
}