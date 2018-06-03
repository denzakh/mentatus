import React, { Component } from 'react';
import affektData from "../../store/affektData.js";
import Checkbox from "../Checkbox";
import RadioList from "../RadioList";
import Textarea from "../Textarea";

export default class affektManager extends Component {

  render() {    

    console.log(affektData.nastroyeniye.data);   

    let vSvyaziNameArr = Object.keys(affektData).filter(item => (
      affektData[item].cicle === "vSvyazi"
    ));   

    let sNameArr = Object.keys(affektData).filter(item => (
      affektData[item].cicle === "s"
    ));   

    return <div>

      <br /><br />
      c: <br />
      <RadioList name="nastroyeniye" dataBase={affektData} />
      
      <br /><br />
      c: <br />
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

      <br /> <br />
      С проявлениями: <br />
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


    </div>;
  }
}