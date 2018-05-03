import React, { Component } from 'react';
import Checkbox from "../Checkbox";

export default class Manager extends Component {

  render() {
    const department = this.props.department; 
    const filteredCheckboxList = department.map((item, i)=>{
      return <div key={item.name}>
        <Checkbox onChange={this.props.onChange} checked={item.isChecked}  label={item.label} psindex={i} department={department} /> 
      </div>;
    });
    return <div>{filteredCheckboxList}</div>; 
  }
}