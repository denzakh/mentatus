import React, { Component } from 'react';
import dataBase from "../../store/kognitData.js";
import Checkbox from "../Checkbox";
import RadioList from "../RadioList";
import Textarea from "../Textarea";
import TextareaInline from "../TextareaInline";
import OrientirovkaManager from "../OrientirovkaManager";
import cicleFn from "../../fn/cicleFn";
import "./Kognit.css";

export default class affektManager extends Component {

  constructor(props) {
    super(props);
  }
  
  render() {   

    let kognitNumber = +this.props.psystatus.kognitOsnivnoi.number;
    let otmechNameArr = cicleFn(dataBase, "otmech"); 
    let otdelNameArr = cicleFn(dataBase, "otdel");  
    let kognitFinger = this.props.psystatus.kognitFinger.isChecked;

    // если отмечена фингерагнозия, показываем поле для пальцев
    let kognitFingerOptions = () => {
      if(kognitFinger) {
        return <div className="list__options">
          <TextareaInline
            onChange={this.props.toggleText}
            name="kognitFingerN"
            label="Правильно названо пальцев "
            value={this.props.psystatus.kognitFingerN}
          />
        </div>
      }
    }
    
    return <div>
      {/*компонент ориентировки*/}
      <OrientirovkaManager
        dataBase={dataBase} 
        toggleRadio={this.props.toggleRadio} 
        toggleSymptom={this.props.toggleSymptom}
        toggleText={this.props.toggleText} 
        psystatus={this.props.psystatus}
      />

      {/*цикл "отмечается"*/}
      <div className="list__title">отмечается: </div>
      {otmechNameArr.map(item => (
        <div key={item} className="list__item list__item--no-group">
          <Checkbox 
          checked = {this.props.psystatus[item].isChecked}
          onChange = {this.props.toggleSymptom}
          name = {item}
          label = {dataBase[item].label}
        />
        </div>
      ))}

      {/*поле для пальцев*/}
      {kognitFingerOptions()}

      {/*цикл отдельных нарушений*/}
      {otdelNameArr.map(item => (
        <div key={item} className="list__item list__item--no-group">
          <Checkbox 
          checked = {this.props.psystatus[item].isChecked}
          onChange = {this.props.toggleSymptom}
          name = {item}
          label = {dataBase[item].label}
        />
        </div>
      ))}

    </div>;
  }
}