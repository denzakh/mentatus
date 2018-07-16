import React, { Component } from 'react';
import dataBase from "../../store/kognitData.js";
import Checkbox from "../Checkbox";
import RadioList from "../RadioList";
import Textarea from "../Textarea";
import cicleFn from "../../fn/cicleFn";

export default class affektManager extends Component {

  constructor(props) {
    super(props);
    this.state = {sonOption: false};
  }
  
  render() {   

    let nastroyeniyeNumber = +this.props.psystatus.nastroyeniye.number;
    let vSvyaziNameArr = cicleFn(dataBase, "vSvyazi");   
    let sNameArr = cicleFn(dataBase, "s"); 
    let nastroyenieSeparateNameArr = cicleFn(dataBase, "nastroyenieSeparate"); 

    let trevogaNumber = +this.props.psystatus.trevoga.number; 
    let trevogaSeparateNameArr = cicleFn(dataBase, "trevogaSeparate");

    let sonArr = cicleFn(dataBase, "son"); 
    let sonSeparateArr = cicleFn(dataBase, "sonSeparate"); 

    let appetitNumber = +this.props.psystatus.appetit.number;  

    // 
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
          
        </div>
      }
    }

    let trevogaOptions = () => {
      if(!(trevogaNumber === 0)) {
        return <div>
          <br />
          <div className="list__options">
            {trevogaSeparateNameArr.map(item => (
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
          <Textarea
            onChange={this.props.toggleText}
            name="trevogaText"
            label="Описание тревоги"
            value={this.props.psystatus.trevogaText}
          />
                
        </div>
      }
    }

    let appetitOptions = () => {
      if(!(appetitNumber === 0)) {
        return <div className="list__options">
          <TextareaInline
            onChange={this.props.toggleText}
            name="appetitPohudel"
            label="Похудел на (кг)"
            value={this.props.psystatus.pohudelText}
          />
          <Textarea
            onChange={this.props.toggleText}
            name="appetitText"
            label="Описание аппетита"
            value={this.props.psystatus.appetitText}
          />
        </div>
      }
    }

    return <div>
      <div className="list__title">Настроение:</div>
      <RadioList 
        name="nastroyeniye" 
        dataBase={dataBase} 
        onChange={this.props.toggleRadio} 
        psystatus={this.props.psystatus}
      />
      
      {nastroyeniyeOptions()}  

      <Textarea
        onChange={this.props.toggleText}
        name="nastroyeniyeText"
        label="Описание настроения"
        value={this.props.psystatus.nastroyeniyeText}
      />      

      <div className="list__title">Тревога: </div>
      <RadioList 
        name="trevoga" 
        dataBase={dataBase} 
        onChange={this.props.toggleRadio} 
        psystatus={this.props.psystatus}
      />

      {trevogaOptions()}  

      <div className="list__title">Сон: </div>
      {sonArr.map(item => (
        <div key={item} className="list__item">
          <Checkbox 
            checked = {this.props.psystatus[item].isChecked}
            onChange = {this.props.toggleSymptom}
            name = {item}
            label = {dataBase[item].label}
          />
        </div>
      ))} 

      <div className="list__box">
        {sonSeparateArr.map(item => (
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

      <Textarea
        onChange={this.props.toggleText}
        name="sonText"
        label="Описание сна"
        value={this.props.psystatus.sonText}
      />

      <div className="list__title">Аппетит:</div>
      <RadioList 
        name="appetit" 
        dataBase={dataBase} 
        onChange={this.props.toggleRadio} 
        psystatus={this.props.psystatus}
      />

      {appetitOptions()}  
    
    </div>;
  }
}