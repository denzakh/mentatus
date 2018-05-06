import React, { Component } from 'react';
import anamnezData from "../../store/anamnezData.js";
import Checkbox from "../Checkbox";
import Textarea from "../Textarea";

export default class anamnezManager extends Component {

  render() {    

    let anamnezNameArr = Object.keys(anamnezData).filter(item => (
      anamnezData[item].cicle === "anamnezCicle"
    ));   

    return <div>
      В анамнезе: <br />
      {anamnezNameArr.map(item => (
        <div key={item}>
          <Checkbox 
          checked = {this.props.psystatus[item].isChecked}
          onChange = {this.props.toggleSymptom}
          name = {item}
          label = {anamnezData[item].label}
          />
        </div>
      ))}

      <Textarea
        onChange={this.props.toggleText}
        name="anamnezText"
        value={this.props.psystatus.anamnezText.text}
      />  
    </div>;
  }
}