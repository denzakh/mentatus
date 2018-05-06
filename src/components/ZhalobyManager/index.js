import React, { Component } from 'react';
import zhalobyData from "../../store/zhalobyData.js";
import Checkbox from "../Checkbox";
import Textarea from "../Textarea";

export default class ZhalobyManager extends Component {

  render() {    

    let zhalobyNameArr = Object.keys(zhalobyData).filter(item => (
      zhalobyData[item].cicle === "zhalobyCicle"
    ));   



    return <div>
      Жалобы на: <br />
      {zhalobyNameArr.map(item => (
        <div key={item} className="list_item">
          <Checkbox 
          checked = {this.props.psystatus[item].isChecked}
          onChange = {this.props.toggleSymptom}
          name = {item}
          label = {zhalobyData[item].label}
          />
        </div>
      ))}

      <Textarea
        onChange={this.props.toggleText}
        name="zhalobyText"
        label="Описание жалоб"
        value={this.props.psystatus.zhalobyText.text}
      />  
    </div>;
  }
}