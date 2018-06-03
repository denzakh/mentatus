import React, { Component } from 'react';
import affektData from "../../store/affektData.js";
import Checkbox from "../Checkbox";
import RadioList from "../RadioList";
import Textarea from "../Textarea";

export default class affektManager extends Component {

  render() {   

    let nastroyeniyeNumber = +this.props.psystatus.nastroyeniye.number;

    let vSvyaziNameArr = Object.keys(affektData).filter(item => (
      affektData[item].cicle === "vSvyazi"
    ));   

    let sNameArr = Object.keys(affektData).filter(item => (
      affektData[item].cicle === "s"
    ));   

    let nastroyenieSeparateNameArr = Object.keys(affektData).filter(item => (
      affektData[item].cicle === "nastroyenieSeparate"
    )); 

    let nastroyeniyeOptions = () => {
      if(!(nastroyeniyeNumber === 1 || nastroyeniyeNumber === 8)) {
        return <div className="list__options">
          <br />
          <div className="list__title">в связи с: </div>
          {vSvyaziNameArr.map(item => (
            <div key={item} className="list__item list__item--no-group">
              <Checkbox 
              checked = {this.props.psystatus[item].isChecked}
              onChange = {this.props.toggleSymptom}
              name = {item}
              label = {affektData[item].label}
            />
            </div>
          ))}

          <br />
          <div className="list__title">С проявлениями: </div>
          {sNameArr.map(item => (
            <div key={item} className="list__item">
              <Checkbox 
              checked = {this.props.psystatus[item].isChecked}
              onChange = {this.props.toggleSymptom}
              name = {item}
              label = {affektData[item].label}
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
            dataBase={affektData} 
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
        dataBase={affektData} 
        onChange={this.props.toggleRadio} 
        psystatus={this.props.psystatus}
      />
      
      {nastroyeniyeOptions()}

      <br />
      <div className="list__title">Дополнит: </div>
      {nastroyenieSeparateNameArr.map(item => (
        <div key={item} className="list__item">
          <Checkbox 
          checked = {this.props.psystatus[item].isChecked}
          onChange = {this.props.toggleSymptom}
          name = {item}
          label = {affektData[item].label}
          />
        </div>
      ))}
            
    </div>;
  }
}