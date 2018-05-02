import React, { Component } from 'react';

export default class List extends Component {

  render() {
    const filteredList = this.props.psystatus.psystatus.map((item)=>{
      if(item.isChecked) {
        return <div key={item.name} >{item.phrase}</div>;
      }
    });
      return <div>{filteredList}</div>; 
  }
}