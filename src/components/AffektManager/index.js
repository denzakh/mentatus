import React, { Component } from 'react';
import dataBase from "../../store/affektData.js";
import Checkbox from "../Checkbox";
import RadioList from "../RadioList";
import Textarea from "../Textarea";
import cicleFn from "../../fn/cicleFn";

export default class affektManager extends Component {

  render() {   

    let nastroyeniyeNumber = +this.props.psystatus.nastroyeniye.number;
    let vSvyaziNameArr = cicleFn(dataBase, "vSvyazi");   
    let sNameArr = cicleFn(dataBase, "s");   
    let nastroyenieSeparateNameArr = cicleFn(dataBase, "nastroyenieSeparate");   


    let nastroyeniyeOptions = () => {
      if(!(nastroyeniyeNumber === 0 || nastroyeniyeNumber === 7)) {
        return <div className="list__options">
          <div className="list__title">в связи с: </div>
          {vSvyaziNameArr.map(item => (
            <div key={item} className="list__item list__item--no-group">
              <Checkbox 
              checked = {this.props.psystatus[item].isChecked}
              onChange = {this.props.toggleSymptom}
              name = {item}
              label = {dataBase[item].label}
            />
            </div>
          ))}

          <div className="list__title">С проявлениями: </div>
          {sNameArr.map(item => (
            <div key={item} className="list__item">
              <Checkbox 
              checked = {this.props.psystatus[item].isChecked}
              onChange = {this.props.toggleSymptom}
              name = {item}
              label = {dataBase[item].label}
              />
            </div>
          ))}

          {nastroyeniyeKolebaniaPodrobno()}          
          
        </div>
      }
    }

    let nastroyeniyeKolebaniaPodrobno = () => {
      if(this.props.psystatus.nastroyeniyeKolebania.isChecked) {
        return <div className="list__second">
          <RadioList 
            name="nastroyeniyeKolebaniaPodrobno" 
            dataBase={dataBase} 
            onChange={this.props.toggleRadio} 
            psystatus={this.props.psystatus}
          />
          <br />
        </div>
      }
    }

    return <div>
      <div className="list__title">Настроение: </div>
      <RadioList 
        name="nastroyeniye" 
        dataBase={dataBase} 
        onChange={this.props.toggleRadio} 
        psystatus={this.props.psystatus}
      />
      
      {nastroyeniyeOptions()}

      <div className="list__title">Дополнительно: </div>
      {nastroyenieSeparateNameArr.map(item => (
        <div key={item} className="list__item">
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