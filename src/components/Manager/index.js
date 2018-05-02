import React, { Component } from 'react';
import Checkbox from "../Checkbox";

export default class Manager extends Component {

  render() {
    console.dir(this.props.psystatus); 
    const filteredCheckboxList = this.props.psystatus.psystatus.map((item, i)=>{
      return <div key={item.name}>
        <Checkbox onChange={this.props.onChange} checked={item.isChecked}  label={item.label} psindex={i}  /> 
      </div>;
    });
    return <div>{filteredCheckboxList}</div>; 
  }
}