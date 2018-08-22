import React, { Component } from 'react';
import dataBase from "../../store/ppData.js";
import Checkbox from "../Checkbox";
import RadioList from "../RadioList";
import RadioListInline from "../RadioListInline";
import Textarea from "../Textarea";
import TextareaInline from "../TextareaInline";
import cicleFn from "../../fn/cicleFn";
import "./Pp.css";

export default class affektManager extends Component {

  constructor(props) {
    super(props);
  }
  
  render() {   

    let bredNameArr = cicleFn(dataBase, "bred"); 
    
    return <div>

      {/*цикл "bred"*/}
      <div className="list__title">Бред:</div>
      {bredNameArr.map(item => (
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