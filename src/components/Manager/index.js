import React, { Component } from 'react';
import Checkbox from "../Checkbox";

export default class Manager extends Component {

  render() {
    // const checkboxList = this.props.list;
    const filteredCheckboxList = 1;
    // filteredCheckboxList = checkboxList.map((item, i)=>{
    //   return <div key={item.name}>
    //     <Checkbox onChange={this.props.onChange} checked={item.isChecked}  label={item.label} name={item} section={section} /> 
    //   </div>;
    // });
    return <div>{filteredCheckboxList}</div>; 
  }
}