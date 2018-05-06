import React, { Component } from 'react';

export default class List extends Component {

  render() {
    const {nameArr, dataObj, psystatus, before, after, noList} = this.props;
    const filteredNameArr = nameArr.filter((item)=>psystatus[item].isChecked);

    let filteredList = filteredNameArr.map((item, i)=>{
      if(i < filteredNameArr.length - 1) {
        return <span key={dataObj[item].name} >{dataObj[item].phrase}, </span>
      } 
        return <span key={dataObj[item].name} >{dataObj[item].phrase}</span>
    });

    console.dir(filteredList); 

    if (filteredList.length) {
      filteredList.unshift(before); 
      filteredList.push(after); 
    } else {
      filteredList = noList
    } 

    return <span>{filteredList}</span>; 
  }
}