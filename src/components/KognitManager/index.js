import React, { Component } from 'react';
import dataBase from "../../store/kognitData.js";
import Checkbox from "../Checkbox";
import RadioList from "../RadioList";
import RadioListInline from "../RadioListInline";
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
    
    return <div>
      {/*компонент ориентировки*/}
      <OrientirovkaManager
        dataBase={dataBase} 
        toggleRadio={this.props.toggleRadio} 
        toggleSymptom={this.props.toggleSymptom}
        toggleText={this.props.toggleText} 
        psystatus={this.props.psystatus}
      />

      <div className="list__title">Интеллектуально-мнестические функции:</div>
      <RadioList 
        name="kognitOsnivnoi" 
        dataBase={dataBase} 
        onChange={this.props.toggleRadio} 
        psystatus={this.props.psystatus}
      />

      {/*цикл "отмечается"*/}
      <div className="list__title">отмечается: </div>
      {otmechNameArr.map(item => (
        <div key={item} className="list__item">
          <Checkbox 
          checked = {this.props.psystatus[item].isChecked}
          onChange = {this.props.toggleSymptom}
          name = {item}
          label = {dataBase[item].label}
        />
        </div>
      ))}

      {/*цикл отдельных нарушений*/}
      <div className="list__title">отдельно: </div>
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

      {/*поле для пальцев*/}
      <div className="list__box">
        <RadioListInline
          name="kognitFingerN" 
          dataBase={dataBase} 
          onChange={this.props.toggleRadio} 
          psystatus={this.props.psystatus}
        />
      </div>      

    </div>;
  }
}