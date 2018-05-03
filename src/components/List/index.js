import React, { Component } from 'react';

export default class List extends Component {

  render() {
    const department = this.props.department;
    console.log(department); 
    const filteredList1 = this.props.department.filter((item)=>item.isChecked);
    console.log(filteredList1); 
    const filteredList2 = filteredList1.map((item, i)=>{
      if(i < filteredList1.length - 1) {
        return <span key={item.name} >{item.phrase}, </span>
      } 
        return <span key={item.name} >{item.phrase}</span>
    });
      return <span> {filteredList2}</span>; 
  }
}