import React, { Component } from 'react';
import affektData from "../../store/affektData.js";
import Checkbox from "../Checkbox";
import Textarea from "../Textarea";

export default class affektManager extends Component {

  render() {    

    let vSvyaziNameArr = Object.keys(affektData).filter(item => (
      affektData[item].cicle === "vSvyazi"
    ));   

    let sNameArr = Object.keys(affektData).filter(item => (
      affektData[item].cicle === "s"
    ));   

    return <div>
      В связи с: <br />
      {vSvyaziNameArr.map(item => (
        <div key={item} className="list_item">
          <Checkbox 
          checked = {this.props.psystatus[item].isChecked}
          onChange = {this.props.toggleSymptom}
          name = {item}
          label = {affektData[item].label}
          />
        </div>
      ))}

      <br /> <br />
      С проявлениями: <br />
      {sNameArr.map(item => (
        <div key={item} className="list_item">
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