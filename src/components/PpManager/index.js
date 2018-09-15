import React, { Component } from 'react';
import dataBase from "../../store/ppData.js";
import Checkbox from "../Checkbox";
import CheckboxOtkl from "../CheckboxOtkl";
import RadioList from "../RadioList";
import RadioListInline from "../RadioListInline";
import Textarea from "../Textarea";
import TextareaInline from "../TextareaInline";
import cicleFn from "../../fn/cicleFn";
import "./Pp.css";
import KritikaManager from "../KritikaManager";

export default class PpManager extends Component {

  constructor(props) {
    super(props);
  }
  
  render() {   

    // показ списка бред
    let bredNameArr = cicleFn(dataBase, "bred"); 

    let bredList = bredNameArr.map(item => (
      <div key={item} className="list__item">
        <Checkbox 
        checked = {this.props.psystatus[item].isChecked}
        onChange = {this.props.toggleSymptom}
        name = {item}
        label = {dataBase[item].label}
      />
      </div>
    ));

    let bredListShow = () => {
      if(this.props.psystatus["bredOtkl"].isChecked) {
        return "";
      } else {
        return bredList;
      }
    }

    // показ списка галлюцинации
    let gallNameArr = cicleFn(dataBase, "gall"); 

    let gallList = gallNameArr.map(item => (
      <div key={item} className="list__item">
        <Checkbox 
        checked = {this.props.psystatus[item].isChecked}
        onChange = {this.props.toggleSymptom}
        name = {item}
        label = {dataBase[item].label}
      />
      </div>
    ));

    let gallListShow = () => {
      if(this.props.psystatus["gallOtkl"].isChecked) {
        return "";
      } else {
        return gallList;
      }
    }
    
    return <div>

      {/*цикл "bred"*/}
      <div className="list__title">
        <span className="list__title-lable">Бред:</span>
        <CheckboxOtkl 
          name = "bredOtkl"
          onChange = {this.props.toggleSymptom}
          psystatus = {this.props.psystatus}
          dataBase = {dataBase}
        />
      </div>
      {bredListShow()}

      <Textarea
        onChange={this.props.toggleText}
        name="bredText"
        label="Описание бреда"
        value={this.props.psystatus.bredText}
      />
   
      {/*цикл "gall"*/}
      <div className="list__title">        
        <span className="list__title-lable">Галлюцинации:</span>
        <CheckboxOtkl 
          name = "gallOtkl"
          onChange = {this.props.toggleSymptom}
          psystatus = {this.props.psystatus}
          dataBase = {dataBase}
        />
      </div>
      {gallListShow()}

      <Textarea
        onChange={this.props.toggleText}
        name="gallText"
        label="Описание галлюцинаций"
        value={this.props.psystatus.gallText}
      />

      <KritikaManager
        toggleRadio={this.props.toggleRadio} 
        toggleText={this.props.toggleText}
        psystatus={this.props.psystatus}
      />  

      <div className="list__title">
        <span className="list__title-lable">Опасные тенденции:</span>
        <CheckboxOtkl 
          name = "opasnyeOtkl"
          onChange = {this.props.toggleSymptom}
          psystatus = {this.props.psystatus}
          dataBase = {dataBase}
        />
      </div>
      <RadioList 
        name="opasnye" 
        dataBase={dataBase} 
        onChange={this.props.toggleRadio} 
        psystatus={this.props.psystatus}
      />

      <div className="list__title">Агрессия:</div>
      <RadioList 
        name="opasnyeAgressia" 
        dataBase={dataBase} 
        onChange={this.props.toggleRadio} 
        psystatus={this.props.psystatus}
      />

      <Textarea
        onChange={this.props.toggleText}
        name="opasnyeText"
        label="Описание опасных тенденций"
        value={this.props.psystatus.gallText}
      />

    </div>;
  }
}